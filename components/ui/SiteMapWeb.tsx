"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Site-map overlay: a live bubble web where every bubble is a tab into a
 * section of the page. Bubbles float, repel each other, and can be dragged —
 * the springs stretch and the whole web shifts in response.
 *
 * Positions are driven by a small hand-rolled physics loop that writes
 * straight to the DOM (transform / line coords) instead of through React
 * state, so a 60fps simulation costs zero re-renders.
 */

type SiteNode = { href: string; label: string; index: string };

const NODES: SiteNode[] = [
  { href: "#about", label: "About", index: "01" },
  { href: "#projects", label: "Projects", index: "02" },
  { href: "#experience", label: "Experience", index: "03" },
  { href: "#education", label: "Education", index: "04" },
  { href: "#leadership", label: "Leadership", index: "05" },
  { href: "#skills", label: "Skills", index: "06" },
  { href: "#contact", label: "Contact", index: "07" },
];

/** Ring plus chords — reads as a web rather than a necklace. */
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 0],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 6],
];

/** Chords sit across the ring, so they rest longer than neighbour links. */
const isChord = (a: number, b: number) => {
  const gap = Math.abs(a - b);
  return Math.min(gap, NODES.length - gap) > 1;
};

type Body = { x: number; y: number; vx: number; vy: number; phase: number };

type Drag = {
  index: number;
  pointerId: number;
  offsetX: number;
  offsetY: number;
  moved: number;
  lastX: number;
  lastY: number;
};

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SiteMapWeb({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>{open && <SiteMapDialog onClose={onClose} />}</AnimatePresence>
  );
}

function SiteMapDialog({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bubbleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  const bodies = useRef<Body[]>([]);
  const layout = useRef({ w: 0, h: 0, r: 34, rest: 120 });
  const drag = useRef<Drag | null>(null);
  const reduced = useRef(false);

  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  // Mirrored into a ref so highlight changes don't tear down the rAF loop.
  // Synced in an effect, not during render — a render that React discards must
  // not leave the ref holding a value that was never committed.
  const activeRef = useRef<number | null>(null);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const navigate = useCallback(
    (href: string) => {
      onClose();
      // Let the overlay finish leaving (and the scroll lock lift) before moving.
      window.setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({
          behavior: reduced.current ? "auto" : "smooth",
        });
      }, 240);
    },
    [onClose]
  );

  // ── Escape, scroll lock, focus handling ────────────────────────────────
  useEffect(() => {
    reduced.current = prefersReducedMotion();

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // globals.css puts `overflow-y: scroll` on <html>, which makes <html> the
    // scroll container — locking <body> would do nothing. Pad for the gutter we
    // remove so the page behind the backdrop doesn't jump.
    const docEl = document.documentElement;
    const prevOverflow = docEl.style.overflow;
    const prevPaddingRight = docEl.style.paddingRight;
    const scrollbar = window.innerWidth - docEl.clientWidth;
    docEl.style.overflow = "hidden";
    if (scrollbar > 0) docEl.style.paddingRight = `${scrollbar}px`;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep focus inside the dialog.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      docEl.style.overflow = prevOverflow;
      docEl.style.paddingRight = prevPaddingRight;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  // ── Sizing: rebuild the layout whenever the stage box changes ──────────
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const applySize = (w: number, h: number) => {
      if (w < 40 || h < 40) return;

      const previous = layout.current;
      const min = Math.min(w, h);
      const r = Math.max(28, Math.min(46, min * 0.11));
      const rest = Math.max(88, Math.min(168, min * 0.3));
      layout.current = { w, h, r, rest };

      if (bodies.current.length === 0) {
        // First layout: drop the nodes onto a ring around the centre.
        const radius = Math.min(rest / (2 * Math.sin(Math.PI / NODES.length)), min / 2 - r - 8);
        bodies.current = NODES.map((_, i) => {
          const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          return {
            x: w / 2 + Math.cos(angle) * radius,
            y: h / 2 + Math.sin(angle) * radius,
            vx: 0,
            vy: 0,
            phase: i * 1.37,
          };
        });
        setReady(true);
        return;
      }

      // Later resizes: scale the existing arrangement into the new box.
      const sx = previous.w > 0 ? w / previous.w : 1;
      const sy = previous.h > 0 ? h / previous.h : 1;
      bodies.current.forEach((body) => {
        body.x *= sx;
        body.y *= sy;
      });
    };

    const rect = stage.getBoundingClientRect();
    applySize(rect.width, rect.height);

    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (box) applySize(box.width, box.height);
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // ── Simulation ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    let frame = 0;
    let tick = 0;

    const step = () => {
      const { w, h, r, rest } = layout.current;
      const list = bodies.current;
      const dragging = drag.current?.index ?? -1;
      tick += 1;

      if (w > 0 && list.length === NODES.length) {
        // Springs along every strand.
        for (const [a, b] of EDGES) {
          const target = rest * (isChord(a, b) ? 1.55 : 1);
          const na = list[a];
          const nb = list[b];
          const dx = nb.x - na.x;
          const dy = nb.y - na.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const force = ((dist - target) / dist) * 0.0045;

          if (a !== dragging) {
            na.vx += dx * force;
            na.vy += dy * force;
          }
          if (b !== dragging) {
            nb.vx -= dx * force;
            nb.vy -= dy * force;
          }
        }

        // Mutual repulsion so bubbles keep their personal space.
        for (let i = 0; i < list.length; i += 1) {
          for (let j = i + 1; j < list.length; j += 1) {
            const na = list[i];
            const nb = list[j];
            const dx = nb.x - na.x;
            const dy = nb.y - na.y;
            const dist = Math.hypot(dx, dy) || 0.001;
            const push = Math.min(2200 / (dist * dist), 0.9) / dist;

            if (i !== dragging) {
              na.vx -= dx * push;
              na.vy -= dy * push;
            }
            if (j !== dragging) {
              nb.vx += dx * push;
              nb.vy += dy * push;
            }
          }
        }

        for (let i = 0; i < list.length; i += 1) {
          const body = list[i];
          if (i === dragging) continue;

          // Weak pull to centre + a slow idle drift so the web is never static.
          body.vx += (w / 2 - body.x) * 0.0016;
          body.vy += (h / 2 - body.y) * 0.0016;

          if (!reduced.current) {
            body.vx += Math.sin(tick * 0.011 + body.phase) * 0.019;
            body.vy += Math.cos(tick * 0.009 + body.phase * 1.7) * 0.019;
          }

          body.vx *= 0.92;
          body.vy *= 0.92;
          body.x += body.vx;
          body.y += body.vy;
        }

        // Hard separation — guarantees bubbles never overlap.
        const pad = 6;
        for (let pass = 0; pass < 2; pass += 1) {
          for (let i = 0; i < list.length; i += 1) {
            for (let j = i + 1; j < list.length; j += 1) {
              const na = list[i];
              const nb = list[j];
              const dx = nb.x - na.x;
              const dy = nb.y - na.y;
              const dist = Math.hypot(dx, dy) || 0.001;
              const minDist = r * 2 + pad;
              if (dist >= minDist) continue;

              const shift = (minDist - dist) / dist / 2;
              if (i !== dragging) {
                na.x -= dx * shift;
                na.y -= dy * shift;
              }
              if (j !== dragging) {
                nb.x += dx * shift;
                nb.y += dy * shift;
              }
            }
          }
        }

        // Keep everything inside the stage.
        for (let i = 0; i < list.length; i += 1) {
          const body = list[i];
          const minX = r + 4;
          const maxX = w - r - 4;
          const minY = r + 4;
          const maxY = h - r - 4;

          if (body.x < minX) {
            body.x = minX;
            body.vx = Math.abs(body.vx) * 0.4;
          } else if (body.x > maxX) {
            body.x = maxX;
            body.vx = -Math.abs(body.vx) * 0.4;
          }
          if (body.y < minY) {
            body.y = minY;
            body.vy = Math.abs(body.vy) * 0.4;
          } else if (body.y > maxY) {
            body.y = maxY;
            body.vy = -Math.abs(body.vy) * 0.4;
          }
        }

        // Paint.
        for (let i = 0; i < list.length; i += 1) {
          const el = bubbleRefs.current[i];
          if (!el) continue;
          const body = list[i];
          el.style.width = `${r * 2}px`;
          el.style.height = `${r * 2}px`;
          // Longest label is 10 characters; keep it inside the circle at any size.
          el.style.fontSize = `${Math.max(7.5, Math.min(12, (r * 2 - 12) / 6.2))}px`;
          el.style.transform = `translate3d(${body.x - r}px, ${body.y - r}px, 0)`;
          el.style.visibility = "visible";
        }

        EDGES.forEach(([a, b], i) => {
          const line = lineRefs.current[i];
          if (!line) return;
          const na = list[a];
          const nb = list[b];
          const target = rest * (isChord(a, b) ? 1.55 : 1);
          const dist = Math.hypot(nb.x - na.x, nb.y - na.y);
          // Strands brighten as they stretch, so dragging reads as tension.
          const strain = Math.min(Math.abs(dist - target) / target, 1);
          const touched = activeRef.current !== null && (a === activeRef.current || b === activeRef.current);

          line.setAttribute("x1", String(na.x));
          line.setAttribute("y1", String(na.y));
          line.setAttribute("x2", String(nb.x));
          line.setAttribute("y2", String(nb.y));
          line.style.opacity = String(touched ? 0.95 : 0.24 + strain * 0.5);
          line.style.strokeWidth = touched ? "1.8" : "1";
        });
      }

      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [ready]);

  // ── Drag handling (pointer events cover mouse, touch and pen) ──────────
  const onPointerDown = (index: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
    const stage = stageRef.current;
    const body = bodies.current[index];
    if (!stage || !body) return;

    const rect = stage.getBoundingClientRect();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    drag.current = {
      index,
      pointerId: event.pointerId,
      offsetX: body.x - (event.clientX - rect.left),
      offsetY: body.y - (event.clientY - rect.top),
      moved: 0,
      lastX: event.clientX,
      lastY: event.clientY,
    };
    setActive(index);
  };

  const onPointerMove = (index: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    const stage = stageRef.current;
    if (!state || state.index !== index || state.pointerId !== event.pointerId || !stage) return;

    const rect = stage.getBoundingClientRect();
    const body = bodies.current[index];
    const nextX = event.clientX - rect.left + state.offsetX;
    const nextY = event.clientY - rect.top + state.offsetY;

    state.moved += Math.abs(event.clientX - state.lastX) + Math.abs(event.clientY - state.lastY);
    state.lastX = event.clientX;
    state.lastY = event.clientY;

    // Carry the drag velocity so the bubble keeps gliding when released.
    body.vx = nextX - body.x;
    body.vy = nextY - body.y;
    body.x = nextX;
    body.y = nextY;
  };

  const endDrag = (index: number, node: SiteNode) => (event: React.PointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state || state.index !== index || state.pointerId !== event.pointerId) return;

    drag.current = null;
    setActive(null);
    // A tap is a drag that never really moved.
    if (state.moved < 9) navigate(node.href);
  };

  const cancelDrag = () => {
    drag.current = null;
    setActive(null);
  };

  const overlayMotion = prefersReducedMotion()
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.12 } }
    : {
        initial: { opacity: 0, scale: 0.9, y: 18 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.94, y: 10 },
        transition: { type: "spring" as const, stiffness: 260, damping: 26, mass: 0.8 },
      };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-[#01070d]/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sitemap-title"
        className="relative flex h-[min(84svh,640px)] max-h-full w-full max-w-[860px] flex-col overflow-hidden rounded-2xl border border-[rgba(13,214,200,0.28)] bg-[#03101b]/95 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:rounded-3xl"
        {...overlayMotion}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(13,214,200,0.14),transparent_45%),radial-gradient(circle_at_82%_88%,rgba(69,190,255,0.12),transparent_48%)]" />

        <header className="relative flex items-start justify-between gap-3 border-b border-white/[0.07] px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2
              id="sitemap-title"
              className="font-serif text-base font-semibold text-snow sm:text-xl"
            >
              Site Map
            </h2>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-teal/65 sm:text-[11px] sm:tracking-[0.2em]">
              Drag a bubble · tap to jump
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close site map"
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70 transition hover:border-[rgba(13,214,200,0.5)] hover:text-[#8ff7ee] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8ff7ee]/70"
          >
            <X size={16} />
          </button>
        </header>

        <div ref={stageRef} className="relative flex-1 touch-none overflow-hidden">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {EDGES.map(([a, b], i) => (
              <line
                key={`${a}-${b}`}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                stroke="#8ff7ee"
                strokeLinecap="round"
                style={{ opacity: 0.3 }}
              />
            ))}
          </svg>

          {NODES.map((node, i) => (
            <button
              key={node.href}
              type="button"
              ref={(el) => {
                bubbleRefs.current[i] = el;
              }}
              onPointerDown={onPointerDown(i)}
              onPointerMove={onPointerMove(i)}
              onPointerUp={endDrag(i, node)}
              onPointerCancel={cancelDrag}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((current) => (current === i ? null : current))}
              /* Keyboard activation only — pointer taps are resolved in endDrag. */
              onClick={(event) => {
                if (event.detail === 0) navigate(node.href);
              }}
              aria-label={`Go to ${node.label} section`}
              className={`absolute left-0 top-0 flex touch-none select-none flex-col items-center justify-center rounded-full border text-center backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8ff7ee]/80 ${
                active === i
                  ? "cursor-grabbing border-[#8ff7ee] bg-[rgba(13,214,200,0.25)] shadow-[0_0_34px_rgba(13,214,200,0.6)]"
                  : "cursor-grab border-[rgba(13,214,200,0.45)] bg-[rgba(4,20,30,0.85)] shadow-[0_0_20px_rgba(13,214,200,0.22)] hover:border-[#8ff7ee] hover:bg-[rgba(13,214,200,0.16)]"
              }`}
              style={{ visibility: "hidden" }}
            >
              <span className="pointer-events-none text-[0.8em] font-semibold leading-none tracking-[0.12em] text-[#8ff7ee]/70">
                {node.index}
              </span>
              <span className="pointer-events-none mt-[0.35em] max-w-full overflow-hidden whitespace-nowrap px-1 text-[1em] font-semibold uppercase leading-none tracking-[0.02em] text-snow">
                {node.label}
              </span>
            </button>
          ))}
        </div>

        <footer className="relative hidden border-t border-white/[0.07] px-4 py-2.5 text-center text-[10px] text-muted/70 sm:block sm:px-6 sm:text-[11px]">
          Every bubble is a section — drag to stretch the web, tap to travel.
        </footer>
      </motion.div>
    </motion.div>
  );
}
