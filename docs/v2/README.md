# Portfolio V2 local review

The playable world lives at `/v2` on local branch `v2`. The classic portfolio remains at `/`, with a persistent Skip link from the game. No branch has been pushed or deployed.

## Run

From the repository root:

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000/v2` on the same machine. To test the production build, run `npm run build` and `npm run start -- -p 3001`, then open `http://localhost:3001/v2`. A phone on the same network may be able to use the host's LAN address, subject to the local firewall and network routing; this has not been verified. There is no private remotely reachable preview URL because this environment cannot deploy the local branch without a push.

## What is here

- A continuous ring road around a 3D lagoon, three bridge crossings, rocky island sectors, a southern welcome plaza, mountains, trees, props, and six authored Blender landmarks. The overview camera draws from the supplied concept images while the layout and models are original.
- A fixed 60 Hz arcade bike simulation with acceleration, coast, brake, reverse, directional steering, terrain adherence, landmark/prop/tree collision, lake and channel containment, checkpoints, respawn, and fast travel. The camera follows and shortens its arm when a landmark blocks the view.
- Keyboard: W/Up throttle, S/Down reverse, A/Left and D/Right steer, Space brake, E/Enter interact, M map, R respawn, Escape close. Touch controls use separate captured pointers for throttle and steering; releasing one does not release the other.
- Map browsing reaches all six destinations without driving. Semantic, focus managed panels render directly from `data/portfolio.ts`, including honest notes, badges, contribution credit, prototype labels, and resume/contact links. The commented NeuralSeek entry is not surfaced.
- WebGL fallback, loading indicator, opt-in synthetic engine tone, Auto/Low/High quality, pause on hidden tab or blocking panel, reduced motion styling, and mobile safe area spacing.

## Code map

- `lib/v2/physics.ts`, `input.ts`, and `world-config.ts`: deterministic simulation, input ownership, collision positions, map geometry.
- `lib/v2/content.ts`: sole adapter for existing factual portfolio data.
- `components/v2/WorldScene.tsx`: R3F scene and camera.
- `components/v2/PortfolioGame.tsx`: UI and controls.
- `assets/v2/blender/` and `public/v2/models/`: editable Blender source and runtime GLBs. See [asset ledger](./assets.md).

## Checks and measurements

On October 12, 2026, `npm run build` and `npm run test:v2` passed (six movement/input tests). A local production server returned HTTP 200 for `/`, `/v2`, all nine GLBs, and the resume PDF. `/v2` server HTML includes the Skip link before client JavaScript runs. The nine GLBs total **1,250,776 bytes**. The `/v2` HTML was **11,158 bytes**, and directly referenced initial JavaScript was **670,525 bytes** by HTTP Content-Length. These are transfer inventories, not a full browser waterfall; dynamically loaded Three/R3F chunks and CSS are not included in that JavaScript number.

The connected browser inventory exposed no usable browser tab. Therefore **desktop rendering, phone portrait/landscape rendering, actual multi-touch, FPS, first interactive frame time, link clicks, and visual V1 smoke behavior are not verified**. The 5/8 second and 8 MB compressed scene goals cannot be claimed from these measurements. Blender viewport inspection confirmed the motorcycle and Project landmark exports, but is not a gameplay screenshot.

### Manual review script

1. At 1440×900, load `/v2`; verify the full island overview and the Skip link during loading. Start riding, accelerate and steer around the ring, brake, reverse, collide with a landmark, recover with R, and visit each district physically.
2. Press M. Use Browse for all six districts, inspect project grouping and links, open the resume, and test keyboard Tab, Shift+Tab, Escape, and panel scrolling. Use Fast travel to each place and verify the camera settles without clipping.
3. Reload at 390×844 portrait and a landscape phone size. Hold GO and a steering button simultaneously, release each pointer independently, cancel a touch, switch tabs while holding GO, and confirm there is no stuck acceleration. Check safe areas, panel close, and the persistent Skip link.
4. Compare Auto/Low/High frame pacing and shadow detail, toggle sound, enable reduced motion, and test WebGL unavailable/lost behavior. Open `/` and verify its classic navigation and links.

The current models are intentionally stylized low polygon geometry. They interpret the concept images' grayscale island, bridges, and recognizable districts rather than attempting photoreal fidelity. Real device review remains necessary before any merge.
