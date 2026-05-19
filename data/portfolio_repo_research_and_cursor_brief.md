# Bijay Thakur Portfolio Project Research + Cursor Build Brief

**Purpose:** Source-of-truth Markdown for rebuilding Bijay Thakur’s portfolio around real GitHub projects without exaggeration.

**Portfolio direction:** Simple, recruiter-focused, AI/ML + GenAI engineering portfolio. Prioritize proof of engineering depth, measurable results, and honest project status over flashy visuals.

**Last prepared:** 2026-05-19

---

## 1. Project Prioritization

### Headline Projects
These should be the main portfolio projects, in this order:

1. **RAG SEC 10-K** — strongest technical proof; production-style RAG, evals, metrics, two implementations.
2. **LaunchLab AI** — strongest GenAI product/system demo; multi-LLM workflow, fallback design, manual + LangGraph modes.
3. **Code Council** — strong multi-agent code analysis app; frontend + Express backend; good AI-agent story, but avoid overclaiming production status.
4. **Demand Forecasting & Optimization** — applied ML/data engineering project with real invoice data; strong because it is honest about baseline vs LightGBM.
5. **AI Podcast Generator / VoxGen** — polished GenAI media app; strong full-stack + API integration project, but avoid claiming business impact metrics unless later measured.

### Supporting / Secondary Projects
Use these in a smaller “Other Projects” or “More Builds” section:

- **GlitchVision** — strong visual anomaly detection project with real benchmark metrics. This could honestly compete with the headline projects, but keep it secondary only if the homepage is already crowded.
- **BetaFlow** — currently looks like a minimal Next.js project from repo evidence. Use only as a small supporting card unless you expand its README/code.
- **Chautari** — can be shown as a hackathon/social-impact full-stack GenAI project if needed.
- **StoreSense** — hackathon/small-business AI assistant; use if portfolio needs entrepreneurship/community angle.
- **ResumeForge** — private repo; useful but not enough public repo evidence unless you expose screenshots/README.

---

## 2. High-Level Recruiter Positioning

### Portfolio headline direction
> AI/ML engineer in the making, building production-minded GenAI systems, RAG pipelines, applied ML workflows, and practical software products.

### Strongest technical story
Bijay should not present himself only as a “frontend student” or “prompt engineer.” The best portfolio story is:

> I build AI systems end-to-end: retrieval, evaluation, orchestration, product UX, fallback handling, and honest measurement.

### What recruiters should notice quickly
- Has worked beyond toy apps.
- Understands evaluation and metrics.
- Can build full-stack AI applications.
- Can discuss tradeoffs: manual pipeline vs framework, baseline vs ML model, fallback vs live APIs, precision/recall tradeoffs.
- Has a portfolio that admits limitations instead of exaggerating.

---

# 3. Headline Project Details

---

## Project 1 — RAG SEC 10-K

### Repo
`Bijay-Thakur/rag-sec-10k`

### Suggested portfolio title
**SEC 10-K RAG — Production Q&A over Annual Reports**

### Recommended category
**RAG / Retrieval / Evaluation / Financial Documents**

### One-sentence portfolio summary
A production-style Retrieval-Augmented Generation system that answers questions over Apple’s 2025 10-K filing with cited, source-grounded answers, implemented both manually and with LlamaIndex.

### Honest status
This is the strongest headline project. The README includes real evaluation tables, architecture, project structure, implementation details, and explicit design decisions. It should be featured first or second.

### What the repo demonstrates
- Financial-document RAG over SEC 10-K filings.
- HTML/XBRL-aware ingestion with section-aware parsing.
- Multiple chunking strategies.
- ChromaDB vector store using OpenAI embeddings.
- Semantic retrieval, BM25, hybrid RRF retrieval, and reranking.
- Citation-grounded generation with GPT-4o-mini.
- Manual v1 implementation and LlamaIndex v2 implementation.
- Streamlit UI with version picker.
- Retrieval and generation evaluation.

### Confirmed tech stack
- Python 3.12+
- Streamlit
- ChromaDB
- OpenAI `text-embedding-3-small`
- GPT-4o-mini
- LlamaIndex
- BM25 / `rank_bm25`
- Sentence Transformers cross-encoder reranker
- RAGAS
- BeautifulSoup + lxml
- pytest

### Strong confirmed metrics
Use these because the README explicitly reports them:

- Hybrid retrieval Recall@5: **0.86** on 50 hand-curated gold questions.
- Hybrid + rerank Recall@1: **0.74**.
- RAGAS Faithfulness: **0.99**.
- LlamaIndex relevancy: **0.95**.
- End-to-end query latency: about **3 seconds**.
- Built two comparable pipelines: manual Python and LlamaIndex.
- Manual vs LlamaIndex comparison reports fewer pipeline lines in v2 with similar retrieval quality.

### Best portfolio card copy
**SEC 10-K RAG**  
Production-style RAG system for Apple’s 2025 10-K with cited answers, hybrid retrieval, reranking, RAGAS evaluation, and manual vs LlamaIndex pipeline comparison.

**Tags:** Python, RAG, LlamaIndex, ChromaDB, OpenAI, RAGAS

**Impact line:** Achieved 0.86 Recall@5 and 0.99 RAGAS faithfulness on a curated financial QA evaluation set.

### Case study sections for portfolio
1. **Problem**
   Analysts need to search long 10-K filings quickly while keeping answers grounded in source passages.
2. **Approach**
   Build an ingestion → chunking → embedding → retrieval → reranking → cited generation pipeline.
3. **Architecture**
   Compare a transparent manual implementation with a LlamaIndex implementation.
4. **Evaluation**
   Retrieval metrics on a 50-question gold set and generation metrics using RAGAS/LlamaIndex evaluators.
5. **Tradeoffs**
   Reranking improved top-rank accuracy but added latency; LlamaIndex reduced orchestration code while manual code stayed more debuggable.
6. **What I learned**
   RAG quality depends more on ingestion, chunking, retrieval evaluation, and grounding discipline than just calling an LLM.

### Do not claim
- Do not claim it works across all SEC filings unless expanded beyond Apple 2025.
- Do not claim production deployment unless hosted/deployed.
- Do not claim “zero hallucinations”; say “high faithfulness in evaluation.”
- Do not claim financial advice capability.

### Suggested visual
A clean case-study card showing:
- SEC document icon → chunking → ChromaDB → retrieval strategies → cited answer.
- Small metric chips: Recall@5 0.86, Faithfulness 0.99, ~3s latency.

### Portfolio importance
**Very high.** This should be the flagship AI engineering project.

---

## Project 2 — LaunchLab AI

### Repo
`Bijay-Thakur/LaunchLab-AI---Multi-LLM-Product-Studio`

### Suggested portfolio title
**LaunchLab AI — Multi-LLM Product Studio**

### Recommended category
**GenAI Product / Multi-LLM Workflow / AI Orchestration**

### One-sentence portfolio summary
A multi-LLM product studio that turns a messy human idea into a structured launch package including research, blueprint, build prompt, campaign copy, visual prompts, evaluation, and workflow map.

### Honest status
Strong GenAI product demo. The README describes v0.2 with real Gemini/OpenAI calls when keys are present and per-step mock fallback so the demo does not break. It also describes side-by-side Manual v1 and LangGraph v2 orchestration.

### What the repo demonstrates
- End-to-end GenAI product workflow.
- Human-orchestrated multi-model system.
- Gemini for research/evaluation.
- OpenAI for product blueprint, build prompt, campaign copy, visual prompts.
- Flask backend and Next.js frontend.
- Fallback design for missing API keys, malformed JSON, provider errors, quota failures, image generation failures.
- Manual orchestration plus LangGraph v2 workflow.
- Provider status, mode banners, warning chips, and demo-safe UX.

### Confirmed tech stack
- Frontend: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, lucide-react.
- Backend: Python 3.10+, Flask, flask-cors, python-dotenv.
- AI APIs: Gemini, OpenAI.
- Optional orchestration: LangGraph, LangChain Core.
- Optional Supabase auth/history.

### Strong features to show
- Manual v1 / LangGraph v2 toggle.
- Same response shape across workflow modes.
- Per-step fallback instead of full workflow failure.
- Visual Generator prompt cards with safe image-generation behavior.
- Workflow Map tab showing model roles and pipeline stages.
- Backend health endpoint reporting provider availability.
- Security-conscious environment variable separation.

### Best portfolio card copy
**LaunchLab AI**  
Multi-LLM product studio that transforms rough ideas into research, MVP scope, Claude/Cursor build prompts, launch copy, visual prompts, and evaluation reports with API fallback handling.

**Tags:** Next.js, Flask, Gemini, OpenAI, LangGraph, TypeScript

**Impact line:** Built a demo-safe GenAI workflow with manual and LangGraph orchestration modes plus per-step fallback handling.

### Case study sections for portfolio
1. **Problem**
   Early product builders often struggle to turn vague ideas into validated, buildable product plans.
2. **Approach**
   Use specialized LLM roles for research, architecture, prompt generation, campaign strategy, visual prompting, and evaluation.
3. **System design**
   Separate frontend, backend services, provider wrappers, and orchestration layers.
4. **Reliability design**
   If APIs fail, each step falls back independently so the demo remains usable.
5. **V1 vs V2**
   Manual function pipeline vs LangGraph state graph; same UI output, different orchestration architecture.
6. **What I learned**
   Production GenAI apps need failure handling, schema normalization, provider warnings, and UX fallback—not just prompt calls.

### Do not claim
- Do not claim real market validation unless it actually uses real market data sources.
- Do not claim it replaces product managers.
- Do not claim image generation works for all accounts; README notes OpenAI image API permission/verification limitations.
- Do not call it enterprise production software; call it a demo-ready GenAI product studio.

### Suggested visual
A pipeline graphic:
Raw Idea → Gemini Research → OpenAI Blueprint → OpenAI Build Prompt → OpenAI Campaign/Visual Prompts → Gemini Evaluation → Workflow Map.

### Portfolio importance
**Very high.** Excellent for GenAI/product-engineering story.

---

## Project 3 — Code Council

### Repo
`Bijay-Thakur/Code-Council---A-Multi-Agent-GenAI-Code-Analysis-System`

### Suggested portfolio title
**Code Council — Multi-Agent GenAI Code Analysis System**

### Recommended category
**Multi-Agent Systems / Code Review / Full-Stack GenAI**

### One-sentence portfolio summary
A multi-agent code review system where specialized agents explain code, detect bugs, analyze complexity, debate findings, and synthesize a final verdict through an Express API and React dashboard.

### Honest status
The README is ambitious and uses strong language. The repo evidence confirms a React/Vite frontend and an Express backend with `/api/analyze`, `/api/chat`, OpenAI/Gemini dependencies, Zod validation, stub fallbacks, parallel agent execution, structured debate service, and supervisor synthesis. Avoid claiming enterprise-grade production unless tests/deployment prove it.

### What the repo demonstrates
- Specialized agent design.
- Orchestrator, Explainer, Bug Hunter, Complexity Analyst, Debate, Supervisor roles.
- Parallel agent execution for explainer/bug/complexity analysis.
- Structured debate step.
- Zod schema validation for agent outputs.
- Fallback/stub behavior when API calls fail or keys are missing.
- Express backend with API routes and health endpoint.
- React/Vite/TypeScript dashboard UI.

### Confirmed tech stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Express 5
- OpenAI SDK
- Google Generative AI SDK
- Zod
- CORS, dotenv

### Best portfolio card copy
**Code Council**  
Multi-agent GenAI code analysis app with specialized agents for explanation, bug detection, complexity analysis, debate, and final supervisor synthesis.

**Tags:** React, TypeScript, Express, OpenAI, Gemini, Zod

**Impact line:** Implemented parallel agent analysis, schema validation, debate flow, and fallback handling for robust code review output.

### Strong architecture points
- Backend exposes `/api/health`, `/api/chat`, and `/api/analyze`.
- `/api/analyze` validates input, creates an orchestration plan, runs multiple agents, executes structured debate, and returns supervisor/final verdict data.
- The backend logs trace IDs and structured logs for debugging.
- Fallback responses prevent the app from breaking when API keys are absent.

### Case study sections for portfolio
1. **Problem**
   Single-pass code review misses nuance; different review roles catch different classes of issues.
2. **Approach**
   Split review into specialized AI agents and synthesize their outputs.
3. **Backend flow**
   Orchestrator → parallel agents → debate → supervisor → final verdict.
4. **Reliability**
   Zod validation and fallback outputs make the interface resilient to malformed LLM responses.
5. **UI**
   Dashboard visualizes code input, agent outputs, debate panel, verdict, and logs.
6. **What I learned**
   Multi-agent systems need structured schemas, controlled orchestration, and debugging visibility.

### Do not claim
- Do not say “production-ready enterprise system.”
- Do not say it guarantees bug detection.
- Do not claim real-world bug-reduction metrics unless measured.
- Do not say all backend features are “planned” either; the repo contains backend implementation. Say “implemented API prototype.”

### Suggested visual
A council-style diagram:
Code Input → Orchestrator → Explainer/Bug Hunter/Complexity → Debate → Supervisor Verdict.

### Portfolio importance
**High.** Strong multi-agent story, but describe it more soberly than the current README.

---

## Project 4 — Demand Forecasting & Optimization

### Repo
`Bijay-Thakur/demand-forecast`

### Suggested portfolio title
**Retail Demand Forecasting — End-to-End ML Pipeline**

### Recommended category
**Applied ML / Data Engineering / Forecasting / Retail Analytics**

### One-sentence portfolio summary
An end-to-end machine learning pipeline for weekly SKU demand forecasting using real grocery invoice data, PostgreSQL modeling, time-series features, baseline evaluation, LightGBM, and error analysis.

### Honest status
Very good applied ML portfolio project because it is grounded in real invoice data and honest about results. The README explicitly reports that the naive baseline outperformed the first LightGBM model on the current snapshot. This honesty is a strength.

### What the repo demonstrates
- Raw invoice ingestion.
- PostgreSQL as source-of-truth.
- SQL weekly aggregation by SKU/week.
- Time-series feature engineering.
- Lag and rolling window features.
- Price, discount, promotion features.
- Calendar, holiday, sports, snow features.
- Train/test split respecting temporal order.
- Naive baseline evaluation.
- LightGBM model training.
- Error analysis notebook.

### Confirmed tech stack
- Python
- Pandas
- NumPy
- PostgreSQL
- SQLAlchemy
- LightGBM
- scikit-learn
- Optuna planned
- Matplotlib
- Jupyter
- Parquet

### Confirmed dataset / model information
- Real grocery invoice records.
- README says approximately 52 weeks of transaction history.
- Processed snapshot includes 209 SKUs.
- Train set: 1,353 rows.
- Test set: 1,254 rows.
- Model features: 22 columns.
- Target: `target_next_week`.
- Naive baseline: MAE 0.219, RMSE 1.740.
- LightGBM snapshot: MAE 0.758, RMSE 2.408, worse than baseline.
- Error analysis shows promotion weeks increase forecast error.

### Best portfolio card copy
**Retail Demand Forecasting**  
End-to-end ML pipeline using real grocery invoice data, PostgreSQL aggregation, time-series feature engineering, baseline forecasting, LightGBM, and error analysis.

**Tags:** Python, PostgreSQL, Pandas, LightGBM, scikit-learn

**Impact line:** Found that a naive lag baseline outperformed the first LightGBM model and identified promotions as a key driver of forecast error.

### Case study sections for portfolio
1. **Problem**
   Forecast next-week SKU demand to support inventory planning and reorder decisions.
2. **Data pipeline**
   Raw invoices → PostgreSQL → weekly SKU aggregation → Parquet train/test data.
3. **Feature engineering**
   Lags, rolling windows, promo/discount, price, holidays, sports, snow, calendar features.
4. **Evaluation**
   Temporal train/test split per SKU; evaluate with MAE and RMSE.
5. **Honest result**
   Naive baseline currently beats LightGBM; this reveals stable demand and insufficient model lift on current data.
6. **Error analysis**
   Promotions break the baseline; demand shifts under discount/promo conditions.
7. **Next steps**
   Walk-forward validation, Optuna tuning, more history, promo-specific modeling, reorder point translation.

### Do not claim
- Do not say LightGBM improved accuracy. It did not in the README snapshot.
- Do not say deployed production demand forecasting system.
- Do not claim exact business cost savings unless calculated.
- Do not expose private invoice/customer/supplier data.

### Suggested visual
A pipeline diagram:
CSV Invoices → PostgreSQL → Weekly SKU Table → Feature Engineering → Baseline/LightGBM → Error Analysis → Reorder Ideas.

### Portfolio importance
**High.** Shows real ML maturity because it includes data work, baselines, leakage prevention, and honest analysis.

---

## Project 5 — AI Podcast Generator / VoxGen

### Repo
`Bijay-Thakur/AI-Podcast-Generator`

### Suggested portfolio title
**VoxGen — AI Podcast Studio**

### Recommended category
**GenAI Media / Full-Stack App / Text-to-Speech**

### One-sentence portfolio summary
An AI podcast studio that generates podcast scripts using Gemini or OpenAI, refines scripts with AI assistance, and converts them into multi-speaker audio using ElevenLabs text-to-speech.

### Honest status
Good full-stack GenAI media app. README describes script generation, refinement, voice synthesis, multi-speaker support, local/session storage, and server-side API key handling. There are no verified business/user metrics, so do not invent impact numbers.

### What the repo demonstrates
- AI script generation from custom or preset topics.
- Provider selection: Gemini or OpenAI.
- Script editing/refinement.
- ElevenLabs voice synthesis.
- Multi-speaker host/guest generation with voice gender selection.
- Audio playback with speaker synchronization.
- Backend/serverless API routes to protect keys.
- Vite React frontend.
- Vercel deployment setup.
- Security-conscious server-side env variables.

### Confirmed tech stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Radix UI
- Lucide React
- Sonner
- Express
- Vercel serverless functions
- Gemini API
- OpenAI API
- ElevenLabs API
- Web Audio API
- Local/session storage

### Best portfolio card copy
**VoxGen — AI Podcast Studio**  
Full-stack GenAI app that generates podcast scripts, refines them with AI, and produces multi-speaker audio using ElevenLabs voice synthesis.

**Tags:** React, TypeScript, Gemini, OpenAI, ElevenLabs, Vite

**Impact line:** Built secure server-side API routes for script generation, refinement, voice synthesis, and audio playback workflow.

### Case study sections for portfolio
1. **Problem**
   Creating a polished podcast requires ideation, scripting, voice production, editing, and playback workflow.
2. **Approach**
   Let users choose a topic, generate a script, refine it, then synthesize host/guest audio.
3. **System design**
   React frontend communicates with server-side API routes so API keys are not exposed in browser.
4. **Media workflow**
   Multi-speaker script segments are converted into voice audio and synchronized visually during playback.
5. **What I learned**
   GenAI media apps require careful state management, user feedback, API error handling, and key security.

### Do not claim
- Do not claim “professional studio-quality” unless you can show samples.
- Do not claim user adoption metrics.
- Do not claim podcasts are stored privately beyond the repo’s actual privacy behavior.
- Do not claim production-scale audio processing.

### Suggested visual
A flow card:
Topic → Script Generation → Script Editor → Voice Synthesis → Podcast Player.

### Portfolio importance
**Medium-high.** Strong product demo, but less technically deep than RAG SEC 10-K or Demand Forecasting.

---

# 4. Supporting Projects

---

## Supporting Project — GlitchVision

### Repo
`Bijay-Thakur/GlitchVision---Visual-Anomaly-Detection-for-Game-QA`

### Suggested portfolio title
**GlitchVision — Visual Anomaly Detection for Game QA**

### Recommended category
**Computer Vision / Anomaly Detection / QA Tooling**

### One-sentence summary
A CPU-first visual anomaly triage tool for gameplay/simulation footage using ResNet-18 embeddings, Isolation Forest, reference-bank kNN, hybrid scoring, segment aggregation, Streamlit UI, and synthetic benchmark evaluation.

### Honest status
Very strong secondary project. It may deserve headline placement if the portfolio targets ML more than GenAI. The README includes detailed architecture, benchmark results, limitations, and profiling.

### Confirmed tech stack
- Python
- PyTorch / torchvision
- ResNet-18 embeddings
- scikit-learn Isolation Forest and Logistic Regression
- OpenCV
- NumPy
- Streamlit
- yt-dlp
- matplotlib
- pytest
- GitHub Actions

### Confirmed metrics to use
- ResNet-18 + Isolation Forest: accuracy 0.750, precision 1.000, recall 0.333, F1 0.500.
- Reference kNN: ROC-AUC 0.993, PR-AUC 0.987, Precision@20 1.000, Hit@20 1.000.
- Temporal LogisticRegression interval recall: 1.000.
- CPU profile: 58.75s total runtime, 196.28 MB peak traced memory, $0 external API cost.

### Best portfolio card copy
**GlitchVision**  
CPU-first gameplay anomaly triage tool using ResNet-18 embeddings, Isolation Forest, reference kNN, hybrid scoring, and synthetic glitch benchmark evaluation.

**Tags:** Python, PyTorch, OpenCV, scikit-learn, Streamlit

**Impact line:** Achieved ROC-AUC 0.993 and Precision@20 1.000 with reference-kNN scoring on a synthetic injected-glitch benchmark.

### Do not claim
- Do not call it a production bug detector.
- Do not claim it identifies the cause of glitches.
- Say “triage aid” and “flags where to look.”

---

## Supporting Project — BetaFlow

### Repo
`Bijay-Thakur/BetaFlow-`

### Suggested portfolio title
**BetaFlow — Feedback/Product Workflow Prototype**

### Recommended category
**Full-Stack / Product Tool Prototype**

### Honest status
Repo evidence is currently weak. README is mostly the default Next.js template, and package metadata only confirms a Next.js 14 + React + TypeScript project. Use this as a small supporting project only, or improve the README/code before featuring it.

### Confirmed tech stack
- Next.js 14.0.4
- React 18
- TypeScript 5
- ESLint

### Safe portfolio copy
**BetaFlow**  
A Next.js/TypeScript prototype exploring product-feedback workflows and clean web application structure.

**Tags:** Next.js, React, TypeScript

**Impact line:** Early-stage prototype; needs stronger README, screenshots, and feature documentation before being heavily featured.

### Do not claim
- Do not claim analytics, PostgreSQL, AI feedback ranking, user metrics, or production deployment unless those are added and documented.

---

## Supporting Project — NeuralFeedback

### Repo status
No matching accessible GitHub repo was found during this review.

### Portfolio guidance
Use only if you have a repo/demo elsewhere or add it to GitHub. If used without repo evidence, label it as a hackathon/prototype and avoid deep technical claims.

### Safe portfolio copy
**NeuralFeedback**  
Hackathon/prototype concept for multi-perspective AI feedback generation using LLM reviewers.

**Tags:** GenAI, Gemini, Feedback Analysis, Prototype

### Do not claim
- Do not claim measured production outcomes.
- Do not claim repository-backed implementation unless a repo is added.

---

# 5. Suggested Portfolio Information Architecture

## Homepage
Homepage should not show every project. Keep it focused.

### Homepage project cards
Use exactly three:
1. RAG SEC 10-K
2. LaunchLab AI
3. Code Council or Demand Forecasting

Recommendation:
- If targeting **AI Engineer / GenAI Engineer**: RAG SEC 10-K, LaunchLab AI, Code Council.
- If targeting **ML Engineer / Data Scientist**: RAG SEC 10-K, Demand Forecasting, GlitchVision.
- If targeting **Full-Stack AI Engineer**: LaunchLab AI, Code Council, AI Podcast Generator.

## Projects Page
Use sections:

### Featured / Headline Projects
- RAG SEC 10-K
- LaunchLab AI
- Code Council
- Demand Forecasting & Optimization
- AI Podcast Generator / VoxGen

### Other Projects
- GlitchVision
- BetaFlow
- Chautari
- StoreSense
- NeuralFeedback if repo/demo is available

## Case Study Pages
Build detailed case studies first for:
1. RAG SEC 10-K
2. LaunchLab AI
3. Demand Forecasting

These have the strongest architecture + learning story.

---

# 6. Recruiter-Safe Project Ranking

| Rank | Project | Why | Risk |
|---:|---|---|---|
| 1 | RAG SEC 10-K | Strongest metrics, RAG eval, architecture, real README depth | Must not overgeneralize beyond Apple 2025 |
| 2 | LaunchLab AI | Best GenAI product workflow and fallback story | Some README wording has version/history complexity |
| 3 | Demand Forecasting | Real applied ML/data pipeline, honest results | LightGBM currently worse than baseline |
| 4 | GlitchVision | Strong CV/anomaly benchmark; excellent ML depth | Secondary if portfolio already has too many projects |
| 5 | Code Council | Strong multi-agent app and backend flow | README language is over-polished; avoid production claims |
| 6 | AI Podcast Generator | Polished GenAI app with media/TTS pipeline | No measured technical metrics |
| 7 | StoreSense | Good hackathon/community story | Needs evidence if featured |
| 8 | BetaFlow | Minimal confirmed repo evidence | Needs README/code improvement |
| 9 | NeuralFeedback | Good concept | No repo found in accessible list |

---

# 7. Portfolio Copy Blocks

## Homepage headline
**Building AI systems that are measured, grounded, and useful.**

## Homepage subheading
I’m Bijay Thakur, a Computer Science student at Queens College focused on AI/ML engineering, GenAI systems, RAG, applied ML, and full-stack AI products.

## Project section intro
Selected projects where I built beyond demos: retrieval systems with evaluation, multi-LLM workflows with fallbacks, multi-agent code analysis, applied forecasting pipelines, and GenAI media tools.

## About summary
My strongest learning pattern is building systems end-to-end, then measuring where they work and where they fail. I’m especially interested in RAG, LLM agents, applied ML, evaluation, and practical products that solve real problems.

---

# 8. Data Structure Recommendation for Cursor

Use this shape in `src/data/projects.ts`:

```ts
export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  priority: 'headline' | 'supporting';
  featuredRank?: number;
  summary: string;
  problem: string;
  approach: string;
  tech: string[];
  metrics?: string[];
  impactLine: string;
  honestStatus: string;
  repoUrl?: string;
  demoUrl?: string;
  image?: string;
  caseStudy: {
    context: string;
    architecture: string[];
    results: string[];
    tradeoffs: string[];
    lessons: string[];
    doNotClaim: string[];
  };
};
```

---

# 9. Cursor Prompt — Use This To Build Portfolio Projects Content

```text
You are a senior full-stack engineer, AI engineer, UX designer, and honest technical writer.

TASK:
Update my portfolio project content using the Markdown source-of-truth I provide.

STYLE:
Use caveman technique.
- Build directly.
- No long explanations.
- No invented claims.
- No exaggeration.
- Keep recruiter clarity.
- If repo evidence is weak, say so through softer wording.

PORTFOLIO GOAL:
Make my project section strong for AI/ML, GenAI, and full-stack AI engineering roles.
Recruiters should quickly understand:
1. What I built.
2. Why it matters.
3. What tech I used.
4. What was measured.
5. What I learned.

IMPORTANT RULES:
- Do not lie.
- Do not inflate metrics.
- Do not invent users, revenue, deployment, production usage, or accuracy numbers.
- If a project has verified metrics, use them.
- If a project has no verified metrics, use an honest impact/learning line instead.
- Do not use fake “improved by X%” claims unless in the provided source.
- Do not overuse badges.
- Do not show too many projects on the homepage.

PROJECT PRIORITY:
Headline projects:
1. RAG SEC 10-K
2. LaunchLab AI
3. Code Council
4. Demand Forecasting & Optimization
5. AI Podcast Generator / VoxGen

Supporting projects:
- GlitchVision
- BetaFlow
- Chautari
- StoreSense
- NeuralFeedback only if repo/demo exists or mark as prototype

HOMEPAGE:
Show exactly 3 project cards:
1. RAG SEC 10-K
2. LaunchLab AI
3. Code Council
Add link/button: “View all projects”
Do not crowd homepage.

PROJECTS PAGE:
Create sections:
- Featured Projects
- Other Projects

Featured Projects must include the 5 headline projects.
Other Projects can include GlitchVision, BetaFlow, Chautari, StoreSense, NeuralFeedback.

CASE STUDY PRIORITY:
Create detailed case-study modal/page for:
1. RAG SEC 10-K
2. LaunchLab AI
3. Demand Forecasting
Optional later:
4. Code Council
5. GlitchVision

CONTENT DATA:
Create/update centralized file:
src/data/projects.ts

Use this type:

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  priority: 'headline' | 'supporting';
  featuredRank?: number;
  summary: string;
  problem: string;
  approach: string;
  tech: string[];
  metrics?: string[];
  impactLine: string;
  honestStatus: string;
  repoUrl?: string;
  demoUrl?: string;
  image?: string;
  caseStudy: {
    context: string;
    architecture: string[];
    results: string[];
    tradeoffs: string[];
    lessons: string[];
    doNotClaim: string[];
  };
};

PROJECT CONTENT TO IMPLEMENT:

1. RAG SEC 10-K
Title: SEC 10-K RAG — Production Q&A over Annual Reports
Category: RAG / Retrieval / Evaluation
Summary: Production-style RAG system for Apple’s 2025 10-K with cited answers, hybrid retrieval, reranking, RAGAS evaluation, and manual vs LlamaIndex pipeline comparison.
Tech: Python, Streamlit, ChromaDB, OpenAI, LlamaIndex, RAGAS, BM25, Sentence Transformers
Metrics:
- Hybrid retrieval Recall@5: 0.86 on 50 hand-curated gold questions
- Hybrid + rerank Recall@1: 0.74
- RAGAS Faithfulness: 0.99
- LlamaIndex relevancy: 0.95
- End-to-end query latency: about 3 seconds
Impact line: Achieved 0.86 Recall@5 and 0.99 RAGAS faithfulness on a curated financial QA evaluation set.
Do not claim: works across all SEC filings, financial advice, zero hallucinations, production deployment.

2. LaunchLab AI
Title: LaunchLab AI — Multi-LLM Product Studio
Category: GenAI Product / Multi-LLM Workflow
Summary: Multi-LLM product studio that transforms rough ideas into research, MVP scope, Claude/Cursor build prompts, launch copy, visual prompts, and evaluation reports with API fallback handling.
Tech: Next.js, React, TypeScript, Tailwind, Flask, Gemini, OpenAI, LangGraph
Metrics: none measured; use architecture/fallback evidence instead.
Impact line: Built a demo-safe GenAI workflow with manual and LangGraph orchestration modes plus per-step fallback handling.
Do not claim: real market validation, enterprise production, replaces PMs, image generation always works.

3. Code Council
Title: Code Council — Multi-Agent GenAI Code Analysis System
Category: Multi-Agent Systems / Code Review
Summary: Multi-agent code analysis app with specialized agents for explanation, bug detection, complexity analysis, debate, and final supervisor synthesis.
Tech: React, TypeScript, Vite, Tailwind, Express, OpenAI, Gemini, Zod
Metrics: no verified product metrics.
Impact line: Implemented parallel agent analysis, schema validation, debate flow, and fallback handling for robust code review output.
Do not claim: production enterprise system, guaranteed bug detection, real-world bug reduction.

4. Demand Forecasting & Optimization
Title: Retail Demand Forecasting — End-to-End ML Pipeline
Category: Applied ML / Forecasting / Data Engineering
Summary: End-to-end ML pipeline using real grocery invoice data, PostgreSQL aggregation, time-series feature engineering, baseline forecasting, LightGBM, and error analysis.
Tech: Python, PostgreSQL, Pandas, NumPy, SQLAlchemy, LightGBM, scikit-learn, Jupyter
Metrics:
- Train set: 1,353 rows across 209 SKUs
- Test set: 1,254 rows across 209 SKUs
- Naive baseline: MAE 0.219, RMSE 1.740
- LightGBM snapshot: MAE 0.758, RMSE 2.408, worse than baseline
- Promotion weeks increased forecast error
Impact line: Found that a naive lag baseline outperformed the first LightGBM model and identified promotions as a key driver of forecast error.
Do not claim: LightGBM improved accuracy, deployed production forecasting, calculated cost savings.

5. AI Podcast Generator / VoxGen
Title: VoxGen — AI Podcast Studio
Category: GenAI Media / Full-Stack App
Summary: Full-stack GenAI app that generates podcast scripts, refines them with AI, and produces multi-speaker audio using ElevenLabs voice synthesis.
Tech: React, TypeScript, Vite, Tailwind, Gemini, OpenAI, ElevenLabs, Express, Vercel Functions, Web Audio API
Metrics: no verified usage metrics.
Impact line: Built secure server-side API routes for script generation, refinement, voice synthesis, and audio playback workflow.
Do not claim: production-scale audio processing, user adoption, studio-quality output unless samples prove it.

6. GlitchVision
Title: GlitchVision — Visual Anomaly Detection for Game QA
Category: Computer Vision / Anomaly Detection
Summary: CPU-first gameplay anomaly triage tool using ResNet-18 embeddings, Isolation Forest, reference kNN, hybrid scoring, and synthetic glitch benchmark evaluation.
Tech: Python, PyTorch, OpenCV, scikit-learn, Streamlit, NumPy, yt-dlp, pytest
Metrics:
- Reference kNN ROC-AUC: 0.993
- PR-AUC: 0.987
- Precision@20: 1.000
- ResNet-18 + IsolationForest F1: 0.500
- $0 external API cost
Impact line: Achieved ROC-AUC 0.993 and Precision@20 1.000 with reference-kNN scoring on a synthetic injected-glitch benchmark.
Do not claim: production bug detector, identifies root cause of glitches.

7. BetaFlow
Title: BetaFlow — Product Workflow Prototype
Category: Full-Stack Prototype
Summary: A Next.js/TypeScript prototype exploring product-feedback workflows and clean web application structure.
Tech: Next.js, React, TypeScript
Metrics: none.
Impact line: Early-stage prototype; needs stronger README, screenshots, and feature documentation before being heavily featured.
Do not claim: AI ranking, PostgreSQL, users, analytics, production features unless added.

8. NeuralFeedback
Title: NeuralFeedback — AI Feedback Prototype
Category: GenAI Prototype
Summary: Prototype concept for multi-perspective AI feedback generation using LLM reviewers.
Tech: GenAI, Gemini, Feedback Analysis
Metrics: none.
Impact line: Prototype/hackathon concept; show only if repo/demo exists or mark clearly as prototype.
Do not claim: repository-backed implementation if not present.

UI REQUIREMENTS:
- Project cards must be easy to scan.
- Each card should show title, category, summary, tech tags, impact line, and buttons: View Details, GitHub.
- Case study view must show Problem, Approach, Architecture, Results, Tradeoffs, Lessons, and Honest Limitations.
- Add a small “Verified metrics” label only for projects with real metrics.
- Add a small “Prototype” label for weak/early projects.

DESIGN:
- Keep same clean portfolio style.
- White/off-white background.
- Blue/purple accents.
- Rounded cards.
- Minimal hover animations.
- No clutter.

SELF-CHECK:
Create/update TODO_STATUS.md:
- [ ] projects.ts created/updated
- [ ] homepage shows exactly 3 projects
- [ ] projects page has headline and supporting sections
- [ ] detailed case studies exist for top 3
- [ ] metrics are accurate and not invented
- [ ] weak projects are labeled honestly
- [ ] no fake production/user claims
- [ ] responsive layout works
- [ ] build passes

After implementation:
Run:
- npm run lint if available
- npm run build
Fix errors.
Final response: short. Mention files changed and build status only.
```

---

# 10. Final Recommendation

Your strongest current technical portfolio story is not “I make many apps.” It is:

> I build AI systems with evaluation, fallback handling, full-stack UX, and honest engineering tradeoffs.

Lead with RAG SEC 10-K, LaunchLab AI, and Code Council for AI engineering. Keep Demand Forecasting as the strongest applied ML/data project. Keep AI Podcast Generator as a polished GenAI product demo. Use GlitchVision as a strong supporting ML/computer-vision project or promote it if applying to ML-heavy roles.

Do not hide limitations. Recruiters respect honest engineering tradeoffs more than inflated project claims.
