/** Soft inflated spheres and capsules, floating behind the page. */
export default function FluffShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <span className="puff puff-xl -left-8 top-[14%]" />
      <span className="puff puff-sm left-[14%] top-[22%] puff-dark" />
      <span className="puff puff-md right-[7%] top-[10%]" />
      <span className="puff-pill right-[18%] top-[26%]" />
      <span className="puff puff-lg -right-6 top-[58%]" />
      <span className="puff puff-sm right-[28%] top-[64%] puff-dark" />
      <span className="puff puff-md left-[6%] bottom-[10%]" />
      <span className="puff puff-sm left-[36%] bottom-[16%] puff-dark" />
      <span className="puff-pill left-[22%] bottom-[6%]" />
    </div>
  );
}
