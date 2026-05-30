export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  priority: "headline" | "supporting" | "early";
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
    title: "SEC 10-K RAG — Source-Grounded Annual Report Q&A",
    shortTitle: "SEC 10-K RAG",
    category: "RAG Systems / Retrieval Evaluation",
    priority: "headline",
    featuredRank: 1,
    summary:
      "Source-grounded RAG over Apple's 2025 10-K with manual and LlamaIndex pipelines, citation-backed answers, hybrid retrieval, reranking, and evaluation on a 50-question gold set.",
    tech: ["Python", "RAG", "LlamaIndex", "ChromaDB", "OpenAI", "BM25", "RAGAS", "Streamlit"],
    metrics: [
      "Hybrid Recall@5: 0.86 (50 gold questions)",
      "Reranker Recall@1: 0.74 (+8 pts vs semantic alone)",
      "RAGAS Faithfulness: 0.99",
      "LlamaIndex Relevancy: 0.95",
      "~3s end-to-end query latency",
    ],
    impactLine:
      "Achieved 0.86 Recall@5 and 0.99 RAGAS Faithfulness on SEC filing Q&A (README evaluation set).",
    honestStatus:
      "Flagship project with README-backed eval tables, dual pipeline comparison, and Streamlit UI. Not deployed for real analysts.",
    repoUrl: "https://github.com/Bijay-Thakur/rag-sec-10k",
    caseStudy: {
      context:
        "Analysts need to search long 10-K filings quickly while keeping answers grounded in source passages.",
      architecture: [
        "SEC HTML ingestion with Part/Item segmentation",
        "Semantic, recursive, and fixed-size chunking strategies",
        "ChromaDB (2,812 vectors) with text-embedding-3-small",
        "Dense retrieval, BM25, hybrid RRF, cross-encoder reranking",
        "Citation-grounded generation with gpt-4o-mini",
        "Manual v1 and LlamaIndex v2 implementations",
        "Streamlit UI with version picker",
      ],
      results: [
        "Hybrid Recall@5: 0.86 on 50 hand-curated gold questions",
        "Hybrid + rerank Recall@1: 0.74",
        "RAGAS Faithfulness: 0.99",
        "LlamaIndex Relevancy: 0.95",
        "~3s end-to-end latency",
      ],
      tradeoffs: [
        "Reranking improved top-rank accuracy but added latency",
        "LlamaIndex reduced orchestration code; manual pipeline stayed more debuggable",
      ],
      lessons: [
        "RAG quality depends on ingestion, chunking, retrieval evaluation, and grounding — not just calling an LLM",
        "LLM-as-judge metrics are evaluation evidence, not absolute truth",
      ],
      doNotClaim: [
        "Deployed for real analysts or enterprise use",
        "Multi-company SEC coverage (Apple 2025 10-K only)",
        "Financial advice capability",
        "Zero hallucinations — cite high faithfulness in evaluation",
      ],
    },
  },
  {
    slug: "launchlab-ai",
    title: "LaunchLab AI — Multi-LLM Product Studio",
    shortTitle: "LaunchLab AI",
    category: "Multi-LLM Orchestration / GenAI Product",
    priority: "headline",
    featuredRank: 2,
    summary:
      "Multi-LLM product studio that turns a rough idea into research, blueprint, Claude/Cursor build prompt, campaign copy, visual prompts, evaluation, and workflow map.",
    tech: [
      "Next.js",
      "TypeScript",
      "Flask",
      "OpenAI",
      "Gemini",
      "LangGraph",
      "Tailwind",
      "Framer Motion",
    ],
    impactLine:
      "Designed a demo-safe multi-LLM workflow with live, partial-fallback, and mock-fallback modes.",
    honestStatus:
      "Demo-ready GenAI product. Real Gemini/OpenAI when keys present; per-step mock fallback. Manual v1 and LangGraph v2 side by side.",
    repoUrl: "https://github.com/Bijay-Thakur/LaunchLab-AI---Multi-LLM-Product-Studio",
    caseStudy: {
      context:
        "Early builders need structured research, MVP scope, positioning, and implementation prompts from a rough idea.",
      architecture: [
        "Next.js frontend and Flask backend (/api/generate, /api/v2/run-workflow)",
        "Gemini for research and evaluation; OpenAI for blueprint, build prompt, campaign, visuals",
        "Manual v1 orchestration and LangGraph v2 (same response shape)",
        "Fallback modes: live, partial-fallback, mock-fallback",
        "Provider warnings and graceful degradation for demos",
        "Optional Supabase for saved projects (README)",
      ],
      results: [
        "Every workflow step remains presentable without API keys",
        "Same output shape across v1 and v2 orchestration",
        "Human reviewer + specialized model roles in workflow map",
      ],
      tradeoffs: [
        "Manual pipeline is more debuggable; LangGraph v2 is more declarative (sequential graph)",
        "Per-step fallback adds response-handling complexity but improves demo reliability",
      ],
      lessons: [
        "Production GenAI needs failure handling, schema normalization, and UX fallback — not just prompts",
      ],
      doNotClaim: [
        "Real startup launch platform with market validation",
        "Production users or revenue",
        "Image generation works on every OpenAI account (README notes permission limits)",
        "Enterprise production software",
      ],
    },
  },
  {
    slug: "code-council",
    title: "Code Council — Multi-Agent GenAI Code Analysis",
    shortTitle: "Code Council",
    category: "Multi-Agent Code Review / AI Developer Tools",
    priority: "headline",
    featuredRank: 3,
    summary:
      "Multi-agent code analysis where specialized agents explain code, detect bugs, analyze complexity, debate findings, and synthesize a final review.",
    tech: ["React", "TypeScript", "Vite", "Express", "OpenAI", "Zod", "Tailwind"],
    impactLine:
      "Implemented parallel agent execution, structured debate, schema validation, and fallback-safe final verdict generation.",
    honestStatus:
      "Prompt-specialized agents (not fine-tuned). Express backend with /api/analyze confirmed in repo. API prototype — not enterprise production.",
    repoUrl:
      "https://github.com/Bijay-Thakur/Code-Council---A-Multi-Agent-GenAI-Code-Analysis-System",
    caseStudy: {
      context:
        "Single-pass code review misses nuance; different specialist roles catch different issue classes.",
      architecture: [
        "Orchestrator → parallel Explainer, Bug Hunter, Complexity agents (Promise.all)",
        "Structured debate service before supervisor synthesis",
        "Express: /api/health, /api/chat, /api/analyze",
        "Zod schema validation for agent outputs",
        "Fallback/stub behavior when API keys or parsing fail",
        "React/Vite/TypeScript dashboard with logs and trace IDs",
      ],
      results: [
        "Parallel agent analysis reduces sequential latency",
        "Schema validation makes UI resilient to malformed LLM JSON",
        "Fallback stubs prevent full failure on API errors",
      ],
      tradeoffs: [
        "Parallel execution adds orchestration complexity",
        "Debate step increases token cost but improves synthesis quality",
      ],
      lessons: [
        "Multi-agent systems need structured schemas, controlled orchestration, and debugging visibility",
      ],
      doNotClaim: [
        "Fine-tuned agents (prompt-specialized only)",
        "Production enterprise code review",
        "Verified bug-reduction metrics",
        "GitHub PR integration",
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
      "End-to-end weekly SKU demand forecasting from real grocery invoice data: PostgreSQL ingestion, SQL aggregation, lag/rolling features, baseline, LightGBM, and error analysis.",
    tech: ["Python", "PostgreSQL", "Pandas", "SQLAlchemy", "LightGBM", "scikit-learn", "Jupyter"],
    metrics: [
      "209 SKUs · ~52 weeks invoice history",
      "Train: 1,353 rows · Test: 1,254 rows · 22 features",
      "Naive baseline MAE: 0.219 · RMSE: 1.740",
      "LightGBM MAE: 0.758 · RMSE: 2.408",
      "Baseline beats LightGBM on current snapshot",
    ],
    impactLine:
      "Found that a naive baseline outperformed the first LightGBM model, then used error analysis to identify promotions and discounts as key failure drivers.",
    honestStatus:
      "Strong applied ML on real invoice data. README explicitly reports baseline > LightGBM — framed as honest ML engineering.",
    repoUrl: "https://github.com/Bijay-Thakur/demand-forecast",
    caseStudy: {
      context:
        "Forecast next-week SKU demand to support inventory planning; demand varies by promotions and intermittent sales.",
      architecture: [
        "Raw invoice CSV → PostgreSQL",
        "SQL weekly aggregation by SKU/week",
        "Lag, rolling, price/discount/promo, calendar, holiday, sports, snow features",
        "Per-SKU temporal train/test split",
        "Naive baseline and LightGBM evaluation",
        "Error analysis notebook on promotion weeks",
      ],
      results: [
        "Naive baseline outperforms LightGBM on this data snapshot (README)",
        "Promotions break baseline accuracy under discount-driven demand shifts",
        "Temporal split prevents leakage",
      ],
      tradeoffs: [
        "More history needed before LightGBM can beat a strong naive baseline",
        "Promo-specific modeling likely required for discount weeks",
      ],
      lessons: [
        "Baseline modeling is not optional; honest error analysis beats inflated model claims",
        "Stable demand patterns can favor simple baselines over complex models",
      ],
      doNotClaim: [
        "LightGBM improved forecast accuracy (it did not on current snapshot)",
        "Deployed production demand forecasting",
        "Completed inventory optimization or reorder-point system (future work in README)",
        "Calculated cost savings",
      ],
    },
  },
  {
    slug: "voxgen",
    title: "VoxGen — AI Podcast Studio",
    shortTitle: "VoxGen",
    category: "GenAI Media Workflow / Full-Stack App",
    priority: "headline",
    featuredRank: 5,
    summary:
      "GenAI podcast app: topic selection, Gemini/OpenAI script generation and refinement, ElevenLabs multi-speaker audio, and synchronized speaker playback feedback.",
    tech: ["React", "TypeScript", "Vite", "Gemini", "OpenAI", "ElevenLabs", "Web Audio API", "Tailwind"],
    impactLine:
      "Designed a full GenAI media workflow from topic selection to script generation, refinement, voice synthesis, and synchronized playback.",
    honestStatus:
      "Full-stack GenAI media demo with server-side API key protection. No verified user adoption metrics.",
    repoUrl: "https://github.com/Bijay-Thakur/AI-Podcast-Generator",
    caseStudy: {
      context:
        "Podcast creation needs ideation, scripting, voice production, and coordinated playback across speakers.",
      architecture: [
        "React/Vite frontend (Tailwind, Framer Motion, Radix UI)",
        "Server-side routes for script gen, refinement, voice synthesis, voice IDs",
        "Gemini or OpenAI for script generation and refinement",
        "ElevenLabs TTS with multi-speaker host/guest support",
        "Web Audio API for synchronized playback feedback",
        "Local/session storage for preferences",
      ],
      results: [
        "Preset or custom topics with configurable podcast length",
        "Script editing and AI refinement loop",
        "API keys handled server-side — not exposed in browser",
      ],
      tradeoffs: [
        "ElevenLabs API costs limit scale for heavy demo usage",
        "Multi-speaker audio timing requires careful client state management",
      ],
      lessons: [
        "GenAI media apps need async UX, API error handling, and secure key routing",
      ],
      doNotClaim: [
        "Commercial podcast hosting or studio publishing",
        "Real user adoption or retention metrics",
        "Persistent private audio storage unless verified in backend",
      ],
    },
  },
  {
    slug: "glitchvision",
    title: "GlitchVision — Visual Anomaly Triage for Game QA",
    shortTitle: "GlitchVision",
    category: "Computer Vision / Anomaly Detection",
    priority: "supporting",
    summary:
      "CPU-first visual anomaly triage for gameplay footage using ResNet-18 embeddings, Isolation Forest, reference kNN, hybrid scoring, segment aggregation, and Streamlit UI.",
    tech: ["Python", "PyTorch", "ResNet-18", "OpenCV", "scikit-learn", "Streamlit"],
    metrics: [
      "Reference kNN ROC-AUC: 0.993 (synthetic benchmark)",
      "PR-AUC: 0.987 · Precision@20: 1.000",
      "ResNet-18 + IsolationForest F1: 0.500",
      "CPU: 58.75s · 196MB peak · $0 API cost",
    ],
    impactLine:
      "Reached 0.993 ROC-AUC with reference kNN on a controlled synthetic glitch benchmark — benchmark evidence, not production QA accuracy.",
    honestStatus:
      "Strong ML/CV secondary project. Frozen pretrained ResNet embeddings; synthetic injected-glitch benchmark per README.",
    repoUrl:
      "https://github.com/Bijay-Thakur/GlitchVision---Visual-Anomaly-Detection-for-Game-QA",
    caseStudy: {
      context:
        "Manual gameplay QA footage review does not scale; labeled glitch datasets are scarce.",
      architecture: [
        "ResNet-18 embeddings (no fine-tuning) for frame features",
        "Isolation Forest unsupervised scoring",
        "Reference kNN against clean reference bank",
        "Hybrid scoring and temporal LogisticRegression for segments",
        "Streamlit UI for frame review",
        "pytest CI via GitHub Actions",
      ],
      results: [
        "Reference kNN ROC-AUC 0.993 on controlled synthetic benchmark (80 frames, 30 positive)",
        "Precision@20: 1.000 — triage aid, not root-cause diagnosis",
        "CPU-only profile with zero external API cost",
      ],
      tradeoffs: [
        "Isolation Forest recall 0.333 — better for exploration than precision triage",
        "Synthetic benchmark; real-world glitch variety may reduce metrics",
      ],
      lessons: [
        "Combining unsupervised and reference-based scoring improves robustness over either alone",
      ],
      doNotClaim: [
        "Production bug detector or root-cause identification",
        "Production QA accuracy",
        "ResNet trained from scratch",
      ],
    },
  },
  {
    slug: "storesense",
    title: "StoreSense — Profit Leak Assistant for Small Stores",
    shortTitle: "StoreSense",
    category: "Product MVP / Retail Analytics",
    priority: "supporting",
    summary:
      "Mobile-first retail SaaS MVP for reorder guidance, invoices, product insights, alerts, and Pro-preview market benchmarking — typed mock data and realistic UX.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Lucide"],
    impactLine:
      "Designed a hackathon-ready retail decision-support MVP with honest mock-data boundaries and clear future integration paths.",
    honestStatus:
      "README: hackathon-ready MVP with typed mock data. No production AI, live POS, Stripe, or real competitor APIs.",
    repoUrl: "https://github.com/Bijay-Thakur/StoreSense---AI-Profit-Leak-Assistant-for-Small-Stores",
    isPrototype: true,
    caseStudy: {
      context:
        "Small store owners often reorder by habit while margin leaks and vendor costs go unnoticed.",
      architecture: [
        "Next.js 16 + React 19 + TypeScript + Tailwind 4",
        "Routes: login, home, sales, products, insights, invoices, alerts, profile, benchmark",
        "CSV mock data and TypeScript fixtures",
        "Cookie-based demo auth (admin/admin) via API route + middleware",
        "Free vs Pro preview positioning",
      ],
      results: [
        "Polished mobile-first retail workflow UX without fake production claims",
        "Clear mock-data boundaries documented in README",
      ],
      tradeoffs: [
        "Mock data enables fast UX iteration but cannot demonstrate real POS value yet",
      ],
      lessons: [
        "Product MVPs can show workflow thinking while labeling integration gaps honestly",
      ],
      doNotClaim: [
        "Live POS integration",
        "Production AI or hosted LLM calls",
        "Stripe, real payments, or real competitor pricing data",
        "Supabase/Firebase (not in repo per README)",
      ],
    },
  },
  {
    slug: "chautari",
    title: "Chautari — Culturally Grounded Mental Health Awareness Space",
    shortTitle: "Chautari",
    category: "Hackathon / Full-Stack AI",
    priority: "supporting",
    summary:
      "Team hackathon app (4 people): anonymous reflection, Whisper transcription, GPT-4o-mini classification, Gemini/OpenAI resources, Supabase realtime — not therapy or medical advice.",
    tech: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Gemini", "Framer Motion"],
    impactLine:
      "Built as a team hackathon project with clear safety disclaimers; Bijay: deployment, AI integration, full-stack development.",
    honestStatus:
      "Team project. README disclaims medical advice/therapy. Bijay role: deployment, AI integration, full-stack — not solo ownership.",
    repoUrl: "https://github.com/Bijay-Thakur/Chautari",
    caseStudy: {
      context:
        "People need a gentle, anonymous reflection space with culturally familiar design — awareness, not clinical care.",
      architecture: [
        "Anonymous kite room and guided reflection (voice/text)",
        "Whisper transcription with fallback",
        "GPT-4o-mini mental-health bucket classification",
        "Gemini/OpenAI resource suggestions with fallback JSON",
        "Bilingual screening questionnaire and scenario chain",
        "Supabase realtime broadcast for anonymous chat",
      ],
      results: [
        "Culturally grounded UX with explicit non-medical disclaimers",
        "Realtime and AI features integrated for hackathon demo",
      ],
      tradeoffs: [
        "Safety disclaimers and scope limits are essential for mental-health-themed demos",
      ],
      lessons: [
        "Impact projects need accurate team credit and honest product boundaries",
      ],
      doNotClaim: [
        "Therapy, medical advice, or clinical diagnosis tool",
        "Solo ownership of the project",
        "Production healthcare deployment",
      ],
    },
  },
  {
    slug: "resumeforge",
    title: "ResumeForge — Multi-Agent Resume Tailoring Frontend",
    shortTitle: "ResumeForge",
    category: "AI Career Tool / Multi-Agent UX",
    priority: "supporting",
    summary:
      "Polished Next.js frontend for multi-agent resume tailoring: job/resume inputs, simulated 7-agent report, Monaco LaTeX editor, mock PDF preview, and export flows.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Monaco Editor"],
    impactLine:
      "Strong AI UX prototype; README confirms in-browser mocked API routes with optional FastAPI backend path.",
    honestStatus:
      "Runs fully in-browser with mocked API routes. Optional real backend (FastAPI + OpenAI) — not required for demo.",
    repoUrl: "https://github.com/Bijay-Thakur/ResumeForge",
    isPrototype: true,
    caseStudy: {
      context:
        "Resume tailoring needs job-requirement mapping, evidence alignment, LaTeX editing, and export-ready outputs.",
      architecture: [
        "Next.js App Router landing + workspace",
        "Agent Report tab with 7 agents and streaming simulation",
        "Monaco LaTeX editor and mock PDF preview",
        "Export: mock PDF, .tex, ATS text copy",
        "Optional FastAPI/uvicorn + OpenAI backend path (README)",
      ],
      results: [
        "End-to-end UX prototype without claiming production orchestration",
        "Mock routes keep frontend demoable without backend",
      ],
      tradeoffs: [
        "Mocked agents enable UX polish before backend orchestration is production-ready",
      ],
      lessons: [
        "Frontend-first AI products can validate workflow UX before expensive agent backends",
      ],
      doNotClaim: [
        "Full production multi-agent backend unless verified running",
        "Measured hiring outcomes or ATS success rates",
      ],
    },
  },
  {
    slug: "betaflow",
    title: "BetaFlow",
    shortTitle: "BetaFlow",
    category: "Early Project",
    priority: "early",
    isPrototype: true,
    summary:
      "Early Next.js + TypeScript project. README only confirms default scaffold setup — archive unless feature docs are added.",
    tech: ["Next.js", "TypeScript"],
    impactLine:
      "Current repo evidence only confirms Next.js and TypeScript setup.",
    honestStatus:
      "Minimal README. Do not claim feedback analytics, databases, AI, or production workflows.",
    repoUrl: "https://github.com/Bijay-Thakur/BetaFlow-",
    caseStudy: {
      context: "Placeholder for early product experimentation.",
      architecture: ["Next.js application with TypeScript"],
      results: [],
      tradeoffs: [],
      lessons: ["Update README with features and screenshots before featuring more prominently."],
      doNotClaim: [
        "AI ranking, PostgreSQL, analytics, users, or production features without repo evidence",
        "Product-feedback workflows beyond what README documents",
      ],
    },
  },
];

export const headlineProjects = projects.filter((p) => p.priority === "headline");
export const supportingProjects = projects.filter((p) => p.priority === "supporting");
export const earlyProjects = projects.filter((p) => p.priority === "early");

const homepageSlugs = ["rag-sec-10k", "launchlab-ai", "code-council"] as const;
export const homepageProjects = homepageSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => p !== undefined);

export const featuredProject = projects.find((p) => p.featuredRank === 1)!;
