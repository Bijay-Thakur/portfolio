export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  priority: "headline" | "supporting";
  featuredRank?: number;
  summary: string;
  tech: string[];
  metrics?: string[];
  impactLine: string;
  honestStatus: string;
  repoUrl?: string;
  demoUrl?: string;
  isPrototype?: boolean;
  caseStudy: {
    context: string;
    architecture: string[];
    results: string[];
    tradeoffs: string[];
    lessons: string[];
    doNotClaim: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "rag-sec-10k",
    title: "SEC 10-K RAG — Production Q&A over Annual Reports",
    shortTitle: "SEC 10-K RAG",
    category: "RAG / Retrieval / Evaluation",
    priority: "headline",
    featuredRank: 1,
    summary:
      "Production-style RAG system for Apple's 2025 10-K with cited answers, hybrid retrieval, reranking, RAGAS evaluation, and manual vs LlamaIndex pipeline comparison.",
    tech: ["Python", "LlamaIndex", "ChromaDB", "OpenAI", "RAGAS", "BM25", "Streamlit", "Sentence Transformers"],
    metrics: [
      "Hybrid Recall@5: 0.86 on 50 gold questions",
      "Hybrid + rerank Recall@1: 0.74",
      "RAGAS Faithfulness: 0.99",
      "LlamaIndex relevancy: 0.95",
      "Query latency: ~3s end-to-end",
    ],
    impactLine:
      "Achieved 0.86 Recall@5 and 0.99 RAGAS faithfulness on a curated financial QA evaluation set.",
    honestStatus:
      "Strongest headline project. Includes real evaluation tables, architecture, and dual-implementation comparison.",
    repoUrl: "https://github.com/Bijay-Thakur/rag-sec-10k",
    caseStudy: {
      context:
        "Analysts need to search long 10-K filings quickly while keeping answers grounded in source passages.",
      architecture: [
        "HTML/XBRL-aware ingestion with section-aware parsing",
        "Multiple chunking strategies",
        "ChromaDB vector store with OpenAI text-embedding-3-small",
        "Semantic retrieval, BM25, hybrid RRF, and cross-encoder reranking",
        "Citation-grounded generation with GPT-4o-mini",
        "Manual v1 and LlamaIndex v2 implementations",
        "Streamlit UI with version picker",
      ],
      results: [
        "Hybrid Recall@5: 0.86",
        "Hybrid + rerank Recall@1: 0.74",
        "RAGAS Faithfulness: 0.99",
        "LlamaIndex relevancy: 0.95",
        "~3s end-to-end latency",
      ],
      tradeoffs: [
        "Reranking improved top-rank accuracy but added latency",
        "LlamaIndex reduced orchestration code; manual code stayed more debuggable",
      ],
      lessons: [
        "RAG quality depends more on ingestion, chunking, retrieval evaluation, and grounding discipline than just calling an LLM",
      ],
      doNotClaim: [
        "Works across all SEC filings (currently Apple 2025 only)",
        "Financial advice capability",
        "Zero hallucinations — say high faithfulness in evaluation",
        "Production deployment",
      ],
    },
  },
  {
    slug: "launchlab-ai",
    title: "LaunchLab AI — Multi-LLM Product Studio",
    shortTitle: "LaunchLab AI",
    category: "GenAI Product / Multi-LLM Workflow",
    priority: "headline",
    featuredRank: 2,
    summary:
      "Multi-LLM product studio that transforms rough ideas into research, MVP scope, build prompts, launch copy, visual prompts, and evaluation reports with API fallback handling.",
    tech: ["Next.js", "React", "TypeScript", "Flask", "Gemini", "OpenAI", "LangGraph", "Tailwind"],
    impactLine:
      "Built a demo-safe GenAI workflow with manual and LangGraph orchestration modes plus per-step fallback handling.",
    honestStatus:
      "Strong GenAI product demo. Real Gemini/OpenAI calls with per-step mock fallback. Side-by-side Manual v1 and LangGraph v2 orchestration.",
    repoUrl: "https://github.com/Bijay-Thakur/LaunchLab-AI---Multi-LLM-Product-Studio",
    caseStudy: {
      context:
        "Early product builders struggle to turn vague ideas into validated, buildable product plans.",
      architecture: [
        "Flask backend and Next.js frontend",
        "Gemini for research and evaluation steps",
        "OpenAI for product blueprint, build prompt, campaign copy, and visual prompts",
        "Manual function pipeline (v1) and LangGraph state graph (v2)",
        "Per-step fallback for missing API keys, malformed JSON, provider errors",
        "Backend health endpoint reporting provider availability",
        "Security-conscious server-side environment variable separation",
      ],
      results: [
        "Demo-safe: works even when API keys are absent",
        "Same response shape across both orchestration modes",
        "Workflow Map tab visualizing model roles and pipeline stages",
      ],
      tradeoffs: [
        "Manual pipeline is more debuggable; LangGraph is more declarative",
        "Per-step fallback increases resilience but adds response-handling complexity",
      ],
      lessons: [
        "Production GenAI apps need failure handling, schema normalization, provider warnings, and UX fallback — not just prompt calls",
      ],
      doNotClaim: [
        "Real market validation unless actual market data sources are used",
        "Replaces product managers",
        "Image generation always works — README notes API permission limitations",
        "Enterprise production software",
      ],
    },
  },
  {
    slug: "code-council",
    title: "Code Council — Multi-Agent GenAI Code Analysis System",
    shortTitle: "Code Council",
    category: "Multi-Agent Systems / Code Review",
    priority: "headline",
    featuredRank: 3,
    summary:
      "Multi-agent code analysis app with specialized agents for explanation, bug detection, complexity analysis, debate, and final supervisor synthesis.",
    tech: ["React", "TypeScript", "Express", "OpenAI", "Gemini", "Zod", "Vite", "Tailwind"],
    impactLine:
      "Implemented parallel agent analysis, schema validation, debate flow, and fallback handling for robust code review output.",
    honestStatus:
      "Implemented API prototype. Confirm as such — avoid enterprise production claims.",
    repoUrl:
      "https://github.com/Bijay-Thakur/Code-Council---A-Multi-Agent-GenAI-Code-Analysis-System",
    caseStudy: {
      context:
        "Single-pass code review misses nuance; different roles catch different classes of issues.",
      architecture: [
        "Orchestrator → parallel Explainer, Bug Hunter, Complexity agents",
        "Structured debate step between agents",
        "Supervisor synthesis to final verdict",
        "Express backend with /api/analyze, /api/chat, /api/health",
        "Zod schema validation for all agent outputs",
        "Fallback/stub behavior when API calls fail",
        "React/Vite/TypeScript dashboard UI",
      ],
      results: [
        "Parallel agent analysis reduces sequential latency",
        "Zod validation makes interface resilient to malformed LLM responses",
        "Fallback stubs prevent full app failure on API errors",
      ],
      tradeoffs: [
        "Parallel execution adds orchestration complexity",
        "Structured debate increases token cost but improves synthesis quality",
      ],
      lessons: [
        "Multi-agent systems need structured schemas, controlled orchestration, and debugging visibility",
      ],
      doNotClaim: [
        "Production enterprise system",
        "Guaranteed bug detection",
        "Real-world bug reduction metrics",
      ],
    },
  },
  {
    slug: "demand-forecasting",
    title: "Retail Demand Forecasting — End-to-End ML Pipeline",
    shortTitle: "Demand Forecasting",
    category: "Applied ML / Forecasting / Data Engineering",
    priority: "headline",
    featuredRank: 4,
    summary:
      "End-to-end ML pipeline using real grocery invoice data, PostgreSQL aggregation, time-series feature engineering, baseline forecasting, LightGBM, and error analysis.",
    tech: ["Python", "PostgreSQL", "Pandas", "LightGBM", "scikit-learn", "SQLAlchemy", "Jupyter", "NumPy"],
    metrics: [
      "209 SKUs, ~52 weeks of transaction history",
      "Train: 1,353 rows · Test: 1,254 rows",
      "Naive baseline MAE: 0.219, RMSE: 1.740",
      "LightGBM snapshot MAE: 0.758, RMSE: 2.408",
      "Promotions identified as key driver of forecast error",
    ],
    impactLine:
      "Found that a naive lag baseline outperformed the first LightGBM model and identified promotions as a key driver of forecast error.",
    honestStatus:
      "Strong applied ML project grounded in real invoice data. Honest about current LightGBM underperformance.",
    repoUrl: "https://github.com/Bijay-Thakur/demand-forecast",
    caseStudy: {
      context:
        "Forecast next-week SKU demand to support inventory planning and reorder decisions.",
      architecture: [
        "Raw invoice CSV ingestion into PostgreSQL",
        "SQL weekly aggregation by SKU/week",
        "Lag and rolling window features",
        "Price, discount, promotion features",
        "Calendar, holiday, sports, snow features (22 columns total)",
        "Temporal train/test split per SKU",
        "Naive baseline and LightGBM model evaluation",
        "Error analysis notebook on promotion weeks",
      ],
      results: [
        "Naive baseline currently outperforms LightGBM on this data snapshot",
        "Promotions break baseline accuracy — demand shifts under discount conditions",
        "Temporal split prevents data leakage",
      ],
      tradeoffs: [
        "More history needed to give LightGBM enough signal to outperform naive baseline",
        "Promo-specific modeling or separate promo features needed",
      ],
      lessons: [
        "ML model quality depends on having enough non-stationary signal; stable demand can favor simple baselines",
        "Error analysis is as valuable as model training",
      ],
      doNotClaim: [
        "LightGBM improved accuracy — it did not in the current snapshot",
        "Deployed production demand forecasting system",
        "Calculated cost savings",
      ],
    },
  },
  {
    slug: "voxgen",
    title: "VoxGen — AI Podcast Studio",
    shortTitle: "VoxGen",
    category: "GenAI Media / Full-Stack App",
    priority: "headline",
    featuredRank: 5,
    summary:
      "Full-stack GenAI app that generates podcast scripts, refines them with AI, and produces multi-speaker audio using ElevenLabs voice synthesis.",
    tech: ["React", "TypeScript", "Vite", "Gemini", "OpenAI", "ElevenLabs", "Express", "Web Audio API"],
    impactLine:
      "Built secure server-side API routes for script generation, refinement, voice synthesis, and audio playback workflow.",
    honestStatus:
      "Good full-stack GenAI media app. No verified business metrics, but strong product demo with security-conscious key handling.",
    repoUrl: "https://github.com/Bijay-Thakur/AI-Podcast-Generator",
    caseStudy: {
      context:
        "Creating a polished podcast requires ideation, scripting, voice production, editing, and playback workflow.",
      architecture: [
        "React/Vite frontend with Tailwind and Framer Motion",
        "Express + Vercel serverless functions for server-side API key protection",
        "Gemini or OpenAI for script generation and refinement",
        "ElevenLabs for multi-speaker voice synthesis with gender selection",
        "Web Audio API for synchronized playback",
        "Local/session storage for persistence",
      ],
      results: [
        "Multi-speaker podcast generation from a topic or custom input",
        "Script editing/refinement loop with AI assistance",
        "API keys protected server-side — not exposed in browser",
      ],
      tradeoffs: [
        "ElevenLabs API costs limit demo usage at scale",
        "Audio synchronization with speaker segments requires careful state management",
      ],
      lessons: [
        "GenAI media apps require careful state management, user feedback, API error handling, and key security",
      ],
      doNotClaim: [
        "Professional studio-quality audio without samples to prove it",
        "User adoption or retention metrics",
        "Production-scale audio processing",
      ],
    },
  },
  {
    slug: "glitchvision",
    title: "GlitchVision — Visual Anomaly Detection for Game QA",
    shortTitle: "GlitchVision",
    category: "Computer Vision / Anomaly Detection",
    priority: "supporting",
    summary:
      "CPU-first gameplay anomaly triage tool using ResNet-18 embeddings, Isolation Forest, reference kNN, hybrid scoring, and synthetic glitch benchmark evaluation.",
    tech: ["Python", "PyTorch", "OpenCV", "scikit-learn", "Streamlit", "NumPy", "pytest"],
    metrics: [
      "Reference kNN ROC-AUC: 0.993",
      "PR-AUC: 0.987",
      "Precision@20: 1.000",
      "ResNet-18 + IsolationForest F1: 0.500",
      "$0 external API cost",
    ],
    impactLine:
      "Achieved ROC-AUC 0.993 and Precision@20 1.000 with reference-kNN scoring on a synthetic injected-glitch benchmark.",
    honestStatus:
      "Very strong secondary project. Could be headline for ML-focused roles. Benchmark is synthetic — not a real production game.",
    repoUrl:
      "https://github.com/Bijay-Thakur/GlitchVision---Visual-Anomaly-Detection-for-Game-QA",
    caseStudy: {
      context: "Game QA teams spend time manually reviewing footage for visual glitches.",
      architecture: [
        "ResNet-18 embeddings (no fine-tuning) for frame-level feature extraction",
        "Isolation Forest for unsupervised anomaly scoring",
        "Reference kNN against a clean reference bank",
        "Hybrid scoring combining both methods",
        "Temporal LogisticRegression for interval-level triage",
        "Streamlit UI for frame review",
        "GitHub Actions CI with pytest",
      ],
      results: [
        "Reference kNN ROC-AUC: 0.993",
        "Precision@20: 1.000 on synthetic benchmark",
        "CPU-only: 58.75s runtime, 196MB peak memory, $0 API cost",
      ],
      tradeoffs: [
        "Isolation Forest recall is low (0.333) — better for unsupervised exploration than precision triage",
        "Benchmark is synthetic; real-world glitch variety may reduce metrics",
      ],
      lessons: [
        "Combining unsupervised and reference-based scoring improves robustness over either alone",
      ],
      doNotClaim: [
        "Production bug detector",
        "Identifies root cause of glitches — say triage aid that flags where to look",
      ],
    },
  },
  {
    slug: "betaflow",
    title: "BetaFlow — Product Workflow Prototype",
    shortTitle: "BetaFlow",
    category: "Full-Stack Prototype",
    priority: "supporting",
    isPrototype: true,
    summary:
      "A Next.js/TypeScript prototype exploring product-feedback workflows and clean web application structure.",
    tech: ["Next.js", "React", "TypeScript"],
    impactLine:
      "Early-stage prototype; needs stronger README, screenshots, and feature documentation before being heavily featured.",
    honestStatus:
      "Weak repo evidence currently. Only confirmed: Next.js 14 + React + TypeScript scaffold. Do not claim AI, database, or analytics features unless added.",
    repoUrl: "https://github.com/Bijay-Thakur/BetaFlow-",
    caseStudy: {
      context: "Exploring product-feedback workflow ideas.",
      architecture: ["Next.js 14 app", "React + TypeScript frontend"],
      results: [],
      tradeoffs: [],
      lessons: ["Early prototyping often reveals scope and documentation gaps."],
      doNotClaim: [
        "AI ranking, PostgreSQL, analytics, users, or production features unless explicitly added and documented",
      ],
    },
  },
  {
    slug: "neural-feedback",
    title: "NeuralFeedback — AI Feedback Prototype",
    shortTitle: "NeuralFeedback",
    category: "GenAI Prototype",
    priority: "supporting",
    isPrototype: true,
    summary:
      "Prototype concept for multi-perspective AI feedback generation using LLM reviewers.",
    tech: ["GenAI", "Gemini", "Feedback Analysis"],
    impactLine:
      "Prototype/hackathon concept. Show only if public repo or demo is available.",
    honestStatus:
      "No matching public GitHub repo found. Label as prototype/concept if featured.",
    caseStudy: {
      context: "Exploring multi-perspective LLM feedback generation.",
      architecture: [],
      results: [],
      tradeoffs: [],
      lessons: [],
      doNotClaim: [
        "Repository-backed implementation without a public repo",
        "Measured production outcomes",
      ],
    },
  },
];

export const headlineProjects = projects.filter((p) => p.priority === "headline");
export const supportingProjects = projects.filter((p) => p.priority === "supporting");
export const homepageProjects = projects.slice(0, 3);
export const featuredProject = projects.find((p) => p.featuredRank === 1)!;
