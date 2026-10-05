/** Stationary black and grey spheres behind every section after the hero. */
const bubbles = [
  { size: "bubble-xl", tone: "bubble-black", place: "left-[2%] top-[0.2%]" },
  { size: "bubble-sm", tone: "bubble-grey", place: "right-[3%] top-[5.4%]" },
  { size: "bubble-md", tone: "bubble-grey", place: "right-[2%] top-[12.4%]" },
  { size: "bubble-lg", tone: "bubble-black", place: "left-[2%] top-[19.4%]" },
  { size: "bubble-xs", tone: "bubble-grey", place: "right-[6%] top-[20.6%]" },
  { size: "bubble-lg", tone: "bubble-grey", place: "right-[2%] top-[36.2%]" },
  { size: "bubble-sm", tone: "bubble-black", place: "left-[2%] top-[36.4%]" },
  { size: "bubble-md", tone: "bubble-black", place: "left-[2%] top-[43.0%]" },
  { size: "bubble-lg", tone: "bubble-grey", place: "left-[2%] top-[58.0%]" },
  { size: "bubble-xs", tone: "bubble-black", place: "right-[5%] top-[59.2%]" },
  { size: "bubble-md", tone: "bubble-black", place: "right-[2%] top-[69.2%]" },
  { size: "bubble-sm", tone: "bubble-grey", place: "left-[5%] top-[69.6%]" },
  { size: "bubble-lg", tone: "bubble-black", place: "left-[2%] top-[76.8%]" },
  { size: "bubble-lg", tone: "bubble-grey", place: "right-[2%] top-[84.8%]" },
  { size: "bubble-sm", tone: "bubble-black", place: "left-[2%] top-[85.0%]" },
  { size: "bubble-md", tone: "bubble-black", place: "left-[2%] top-[92.4%]" },
  { size: "bubble-xs", tone: "bubble-grey", place: "right-[4%] top-[93.6%]" },
];

export default function SectionBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {bubbles.map((bubble) => (
        <span
          key={`${bubble.place}`}
          className={`bubble ${bubble.size} ${bubble.tone} ${bubble.place}`}
        />
      ))}
    </div>
  );
}
