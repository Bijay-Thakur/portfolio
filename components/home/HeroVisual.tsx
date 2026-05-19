"use client";

import { motion } from "framer-motion";

function CodeCard() {
  return (
    <div className="bg-slate-900 rounded-xl p-4 shadow-xl w-56 text-xs font-mono">
      <div className="flex gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      <div className="space-y-1.5">
        <div className="text-violet-400">{"def"} <span className="text-blue-300">run_agent</span><span className="text-white">(query):</span></div>
        <div className="pl-4 text-green-300">{"  "}retriever<span className="text-white"> = </span>VectorDB<span className="text-slate-400">()</span></div>
        <div className="pl-4 text-green-300">{"  "}chain<span className="text-white"> = </span>LLMChain<span className="text-slate-400">(</span></div>
        <div className="pl-8 text-yellow-300">llm<span className="text-slate-400">=</span>gpt4<span className="text-slate-400">,</span></div>
        <div className="pl-8 text-slate-400">{"..."}</div>
        <div className="pl-4 text-white"><span className="text-violet-400">return</span> chain.run(query)</div>
      </div>
    </div>
  );
}

function AgentCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100 w-52">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">AI Agent Flow</p>
      <div className="flex flex-col items-center gap-1.5">
        {[
          { label: "User Query", color: "bg-blue-100 text-blue-700" },
          { label: "Retriever", color: "bg-violet-100 text-violet-700" },
          { label: "LLM Reasoning", color: "bg-indigo-100 text-indigo-700" },
          { label: "Response", color: "bg-green-100 text-green-700" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`text-xs font-medium px-3 py-1 rounded-lg ${item.color}`}>
              {item.label}
            </div>
            {i < 3 && <div className="w-px h-2 bg-slate-200" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsCard() {
  const bars = [
    { label: "Accuracy", pct: 88, color: "bg-blue-500" },
    { label: "Precision", pct: 92, color: "bg-violet-500" },
    { label: "F1 Score", pct: 85, color: "bg-indigo-400" },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100 w-52">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Model Performance
      </p>
      <div className="space-y-2.5">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-600">{bar.label}</span>
              <span className="text-xs font-semibold text-slate-700">{bar.pct}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${bar.color}`}
                style={{ width: `${bar.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[420px] flex items-center justify-center select-none">
      {/* Background blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 opacity-60 blur-3xl" />
      </div>

      {/* Code card — top left */}
      <motion.div
        className="absolute left-0 top-4"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <CodeCard />
      </motion.div>

      {/* Agent card — right */}
      <motion.div
        className="absolute right-0 top-12"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <AgentCard />
      </motion.div>

      {/* Metrics card — bottom center */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
      >
        <MetricsCard />
      </motion.div>
    </div>
  );
}
