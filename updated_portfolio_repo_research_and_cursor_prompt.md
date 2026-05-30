# Updated Portfolio Project Research + Cursor Implementation Brief

Prepared for: **Bijay Thakur**  
Purpose: source-of-truth Markdown for updating a clean, recruiter-focused portfolio website in Cursor.  
Research date: **May 29, 2026**  
Primary source checked: GitHub repositories under `Bijay-Thakur`.  
LinkedIn status: **not independently verifiable from this environment**. Public LinkedIn profile/project content could not be fetched or found through public search, so this file does **not** invent LinkedIn-only details. Use the GitHub-backed facts below unless Bijay manually pastes LinkedIn project text/screenshots.

---

## 0. Verification Rules for Cursor

Cursor must follow these rules strictly:

1. **Do not invent metrics.** Use only metrics listed in this file under “confirmed evidence.”
2. **Do not claim production users, revenue, deployment, or company adoption unless explicitly stated in a repo source.**
3. **Separate “implemented” from “planned.”** If a README says something is planned, portfolio copy must not present it as finished.
4. **Prefer honest engineering language over hype.** Recruiters respect clear limitations and measured results.
5. **If LinkedIn project descriptions differ from this file, ask Bijay to paste them before overriding GitHub-backed facts.**
6. **Use headline projects for the main Projects page.** Use secondary projects in a smaller section.
7. **For projects with thin repo evidence, use conservative copy.**

---

## 1. Recommended Portfolio Project Hierarchy

### Headline / Featured Projects
These should be the main five projects on the portfolio.

1. **RAG SEC 10-K** — strongest AI/ML/RAG engineering project.
2. **LaunchLab AI** — strongest GenAI product/orchestration project.
3. **Code Council** — strongest multi-agent code analysis/full-stack AI app.
4. **Retail Demand Forecasting** — strongest applied ML/data engineering project.
5. **VoxGen / AI Podcast Generator** — strong GenAI media workflow app.

### Secondary / Other Projects
Use these after the headline projects, in a smaller grid.

1. **GlitchVision** — very strong visual anomaly / ML systems project; could be promoted if the portfolio targets ML/computer vision more strongly.
2. **StoreSense** — polished product/retail SaaS MVP; honest mock-data MVP; useful for product-minded engineering story.
3. **Chautari** — strong hackathon/team/full-stack AI + mental-health awareness project.
4. **ResumeForge** — good frontend multi-agent resume tailoring prototype; currently mocked frontend + optional backend path.
5. **BetaFlow** — keep conservative; current repo evidence only confirms a basic Next.js TypeScript app.

---

# 2. Headline Project Research

## 2.1 RAG SEC 10-K

**Repository:** `Bijay-Thakur/rag-sec-10k`  
**GitHub URL:** `https://github.com/Bijay-Thakur/rag-sec-10k`  
**Portfolio priority:** Highest / flagship AI engineering project  
**Suggested category:** RAG Systems / Retrieval Evaluation / Financial Document QA  
**Recommended display title:** `SEC 10-K RAG — Source-Grounded Annual Report Q&A`

### Confirmed Evidence

The README describes the project as a production-grade RAG system for answering questions about Apple’s 2025 10-K filing with source-grounded citations. It is implemented twice: manual Python and LlamaIndex, with empirical comparison.

Confirmed metrics from README:

- Hybrid retrieval Recall@5: **0.86** on 50 hand-curated gold questions.
- Reranker Recall@1: **0.74**, +8 percentage points over semantic alone.
- RAGAS Faithfulness: **0.99**.
- LlamaIndex Relevancy: **0.95**.
- End-to-end query latency: approximately **3 seconds**.
- 2 pipeline implementations: manual and LlamaIndex.
- ChromaDB vector store with **2,812 vectors**.
- Embedding model: OpenAI `text-embedding-3-small`.
- Generation model: OpenAI `gpt-4o-mini`.
- UI: Streamlit with v1/v2 version picker.

### What the Project Actually Does

A user asks questions about Apple’s 10-K filing. The system retrieves relevant chunks, generates a citation-grounded answer, and displays source passages for verification. It compares manual RAG engineering against a framework-based LlamaIndex version.

### Technical Scope

- SEC 10-K HTML ingestion and Part/Item segmentation.
- Multiple chunking strategies: semantic, recursive/hierarchical, fixed-size.
- Dense retrieval with OpenAI embeddings + ChromaDB.
- BM25 lexical retrieval.
- Hybrid Reciprocal Rank Fusion retrieval.
- Cross-encoder reranking.
- Citation-grounded generation.
- RAGAS and LlamaIndex evaluation.
- Streamlit UI for interactive Q&A.

### Recruiter-Friendly Positioning

Use this project to show:

- You understand RAG beyond a toy chatbot.
- You know how to evaluate retrieval and generation.
- You can compare framework vs. from-scratch engineering tradeoffs.
- You understand grounded generation and citation quality.
- You can build an end-to-end AI system with measurable reliability.

### Suggested Short Portfolio Card Copy

**SEC 10-K RAG**  
Built a source-grounded RAG system over Apple’s 2025 10-K with manual and LlamaIndex implementations, citation-backed answers, hybrid retrieval, reranking, and evaluation against a 50-question gold set.

### Suggested Impact Line

`Achieved 0.86 Recall@5 and 0.99 RAGAS Faithfulness on SEC filing Q&A.`

### Suggested Tags

`Python`, `RAG`, `LlamaIndex`, `ChromaDB`, `OpenAI`, `BM25`, `RAGAS`, `Streamlit`

### Suggested Case Study Points

- Why HTML/XBRL-aware SEC filing parsing matters.
- Why citations and source panels are essential for financial QA.
- How hybrid retrieval and reranking improved retrieval quality.
- Manual RAG vs. LlamaIndex tradeoff: debuggability vs. extensibility.
- Evaluation methodology: gold questions, Recall@K, MRR, RAGAS.

### Honest Caveats / Do Not Claim

Do **not** claim this is deployed for real analysts.  
Do **not** claim multi-company coverage unless the repo adds it later.  
Do **not** claim production enterprise use.  
Do **not** present LLM-as-judge metrics as absolute truth; phrase them as evaluation evidence.

---

## 2.2 LaunchLab AI

**Repository:** `Bijay-Thakur/LaunchLab-AI---Multi-LLM-Product-Studio`  
**GitHub URL:** `https://github.com/Bijay-Thakur/LaunchLab-AI---Multi-LLM-Product-Studio`  
**Portfolio priority:** High / headline GenAI product project  
**Suggested category:** Multi-LLM Orchestration / Product Studio / GenAI Workflow  
**Recommended display title:** `LaunchLab AI — Multi-LLM Product Studio`

### Confirmed Evidence

The README describes LaunchLab AI as a polished demo-ready multi-LLM product studio that turns a rough idea into a launch-ready package: research, blueprint, build prompt, campaign copy, image prompts, evaluation, and workflow map.

Confirmed details:

- Calls **Gemini** and **OpenAI** when keys are present.
- Has per-step mock fallback so the demo does not break.
- Manual v1 workflow and LangGraph v2 workflow are available side-by-side.
- Pipeline roles include Human reviewer, Gemini Research Analyst, OpenAI Product Architect, OpenAI Prompt Engineer, OpenAI Campaign Strategist, OpenAI Visual Designer, Gemini Evaluation Judge, and Claude Code/Cursor as coding agent.
- Frontend: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, lucide-react.
- Backend: Python, Flask, flask-cors, python-dotenv, google-genai, openai.
- API routes include `/api/generate` and `/api/v2/run-workflow`.
- Fallback modes include `live`, `partial-fallback`, and `mock-fallback`.

### What the Project Actually Does

A user enters a rough product idea. The workflow turns that idea into a structured product package using multiple model roles. It produces market/problem research, product blueprint, Claude/Cursor build prompt, campaign copy, visual prompts, evaluation report, and workflow map.

### Technical Scope

- Full-stack GenAI app.
- Multi-provider model routing.
- Manual orchestration and LangGraph orchestration.
- Shared response shape between v1 and v2.
- Provider warning and fallback mode handling.
- Demo-safety architecture with graceful degradation.
- Optional Supabase setup for saved projects/sign-in, according to README.

### Recruiter-Friendly Positioning

Use this project to show:

- You can orchestrate multi-step GenAI workflows.
- You understand failure handling and demo reliability.
- You can build a product, not just an API wrapper.
- You understand model-role specialization and human-in-the-loop workflow design.
- You can compare procedural orchestration vs. graph-based orchestration.

### Suggested Short Portfolio Card Copy

**LaunchLab AI**  
Built a multi-LLM product studio that transforms a rough idea into research, product blueprint, Claude/Cursor build prompt, campaign copy, visual prompts, and evaluation using Gemini, OpenAI, and a LangGraph v2 workflow.

### Suggested Impact Line

`Designed a demo-safe multi-LLM workflow with live, partial-fallback, and mock-fallback modes.`

### Suggested Tags

`Next.js`, `TypeScript`, `Flask`, `OpenAI`, `Gemini`, `LangGraph`, `Prompt Engineering`, `GenAI`

### Suggested Case Study Points

- How each model role contributes to the final product package.
- Why graceful fallback matters in live AI demos.
- Manual v1 vs. LangGraph v2: same output shape, different orchestration model.
- How to design model outputs for reliable frontend rendering.
- How Cursor/Claude Code fits into the workflow as the coding agent.

### Honest Caveats / Do Not Claim

Do **not** claim it is a real startup-launch platform with real market validation.  
Do **not** claim real users unless analytics are later added.  
Do **not** claim all image generation works on every OpenAI account; README notes image generation depends on account permission.  
Do **not** overstate LangGraph if the current graph is sequential; call it deterministic sequential LangGraph v2.

---

## 2.3 Code Council

**Repository:** `Bijay-Thakur/Code-Council---A-Multi-Agent-GenAI-Code-Analysis-System`  
**GitHub URL:** `https://github.com/Bijay-Thakur/Code-Council---A-Multi-Agent-GenAI-Code-Analysis-System`  
**Portfolio priority:** High / headline multi-agent AI app  
**Suggested category:** Multi-Agent Code Review / AI Developer Tools  
**Recommended display title:** `Code Council — Multi-Agent GenAI Code Analysis`

### Confirmed Evidence

The README describes Code Council as a multi-agent GenAI code analysis system with specialized agents that analyze, debate, and refine code.

Confirmed README claims:

- Five specialized agents: Explainer, Bug Hunter, Complexity Analyst, Debate Agent, Supervisor Agent.
- Multi-round debate panel.
- Final verdict synthesis.
- System logs and dashboard UI.
- Frontend stack: React 18.3.1, TypeScript 5.6.3, Vite 5.4.11, TailwindCSS 3.4.14.

Confirmed backend evidence from code:

- Express backend exposes `/api/health`, `/api/chat`, and `/api/analyze`.
- `analyzeController` uses orchestrator, explainer, bug hunter, complexity, debate, and supervisor steps.
- Explainer, BugHunter, Complexity run in parallel via `Promise.all`.
- Uses Zod-style schema validation and fallback responses when API keys or responses fail.
- Uses OpenAI client utilities and model helper.

### What the Project Actually Does

A user submits code. The backend routes the code through several AI analysis roles: an orchestrator plans the review; explainer, bug hunter, and complexity agents run in parallel; a structured debate service refines findings; a supervisor synthesizes the final verdict.

### Technical Scope

- React/Vite/TypeScript frontend.
- Express backend.
- Multi-agent workflow over code input.
- Prompt-based agent roles.
- JSON extraction and schema validation.
- Graceful fallback behavior.
- Logs and trace IDs.
- Debate and final verdict synthesis.

### Recruiter-Friendly Positioning

Use this project to show:

- You understand multi-agent workflows in a developer-tool setting.
- You can design role-specialized agents.
- You know how to validate LLM outputs instead of blindly trusting them.
- You can combine frontend UX with backend orchestration.
- You can discuss parallel execution, fallback behavior, and synthesis.

### Suggested Short Portfolio Card Copy

**Code Council**  
Built a multi-agent code analysis system where specialized agents explain code, detect bugs, analyze complexity, debate findings, and synthesize a final review through an Express backend and React/TypeScript dashboard.

### Suggested Impact Line

`Implemented parallel agent execution, structured debate, schema validation, and fallback-safe final verdict generation.`

### Suggested Tags

`React`, `TypeScript`, `Vite`, `Express`, `OpenAI`, `Zod`, `Multi-Agent Systems`, `Prompt Engineering`

### Suggested Case Study Points

- Why code review benefits from multiple specialist perspectives.
- How parallel agent execution reduces workflow latency.
- How schema validation makes LLM responses safer for UI rendering.
- Why supervisor synthesis is useful after debate.
- Where the project could improve: evaluation benchmark, test suite, saved sessions, real code execution sandbox.

### Honest Caveats / Do Not Claim

Do **not** claim it is production-ready for enterprise code review.  
Do **not** claim verified bug-reduction metrics unless you later benchmark it.  
Do **not** say “fine-tuned agents”; evidence supports prompt-specialized agents, not fine-tuning.  
Do **not** claim GitHub PR integration unless added later.

---

## 2.4 Retail Demand Forecasting

**Repository:** `Bijay-Thakur/demand-forecast`  
**GitHub URL:** `https://github.com/Bijay-Thakur/demand-forecast`  
**Portfolio priority:** High / applied ML project  
**Suggested category:** Applied Machine Learning / Forecasting / Data Engineering  
**Recommended display title:** `Retail Demand Forecasting — End-to-End ML Pipeline`

### Confirmed Evidence

The README describes an end-to-end weekly retail demand forecasting system built on real grocery invoice data.

Confirmed details:

- Raw invoice ingestion into PostgreSQL.
- SQL data modeling and weekly aggregation.
- Time-series feature engineering with lag and rolling-window features.
- Temporal train/test split to prevent leakage.
- Naive baseline forecast.
- LightGBM model implementation.
- Error analysis around promotions and discounts.
- Dataset: approximately 52 weeks of grocery invoice history.
- Processed data: 1,353 train rows and 1,254 test rows across 209 SKUs.
- Model features: 22 columns including lags, rolling stats, price/promo, holiday/sports, snow, calendar, and SKU ID.
- Baseline MAE: 0.219; baseline RMSE: 1.740.
- LightGBM MAE: 0.758; LightGBM RMSE: 2.408.
- The README clearly states the naive baseline remains stronger on this snapshot.

### What the Project Actually Does

It takes real grocery invoice records, loads them into a relational database, aggregates weekly SKU demand, engineers time-series features, trains/evaluates forecasting approaches, and performs error analysis to understand when the baseline fails.

### Technical Scope

- Python data pipeline.
- PostgreSQL schema and SQL aggregation.
- Feature engineering with lags, rolling windows, price/promo features, calendar flags, weather/snow flags.
- Temporal train/test split.
- Naive baseline.
- LightGBM model.
- Error analysis notebook.

### Recruiter-Friendly Positioning

Use this project to show:

- You know applied ML starts with data modeling and baseline evaluation.
- You avoid leakage in time-series problems.
- You can be honest when ML does not beat a strong baseline.
- You understand promotion-driven forecast errors and intermittent demand.
- You can turn ML results into business insight.

### Suggested Short Portfolio Card Copy

**Retail Demand Forecasting**  
Built an end-to-end ML pipeline from real grocery invoice data to weekly SKU demand forecasts, including PostgreSQL ingestion, SQL aggregation, lag/rolling features, temporal splitting, baseline modeling, LightGBM, and error analysis.

### Suggested Impact Line

`Found that a naive baseline outperformed the first LightGBM model, then used error analysis to identify promotions and discounts as key failure drivers.`

### Suggested Tags

`Python`, `PostgreSQL`, `Pandas`, `SQLAlchemy`, `LightGBM`, `scikit-learn`, `Time Series`, `ML Pipelines`

### Suggested Case Study Points

- Why time-series train/test split matters.
- Why baseline modeling is not optional.
- How promotions broke stable demand patterns.
- Why honest error analysis is more impressive than inflated model claims.
- Future improvements: Optuna tuning, walk-forward validation, reorder point calculation.

### Honest Caveats / Do Not Claim

Do **not** claim the ML model improved forecast accuracy. It did not on the current snapshot.  
Do **not** claim production deployment.  
Do **not** claim inventory optimization is complete; reorder-point calculation is listed as future work.  
Do **not** hide the baseline > LightGBM result. Make it a strength: honest ML engineering.

---

## 2.5 VoxGen / AI Podcast Generator

**Repository:** `Bijay-Thakur/AI-Podcast-Generator`  
**GitHub URL:** `https://github.com/Bijay-Thakur/AI-Podcast-Generator`  
**Portfolio priority:** Headline project, especially for GenAI product/full-stack roles  
**Suggested category:** GenAI Media Workflow / Full-Stack AI App  
**Recommended display title:** `VoxGen — AI Podcast Studio`

### Confirmed Evidence

The README describes VoxGen as an AI Podcast Studio.

Confirmed details:

- Smart topic selection: preset or custom topic.
- AI-powered script generation using Google Gemini or OpenAI.
- Script refinement with AI assistance.
- Voice synthesis using ElevenLabs.
- Multi-speaker support for host/guest voices.
- Real-time visual feedback showing which speaker is talking.
- Custom podcast length.
- Local storage for preferences/progress.
- Server-side API key handling; frontend no longer exposes keys.
- Backend API routes include health, script generation, script refinement, voice generation, voice ID retrieval.
- Frontend stack: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Radix UI, Lucide React.
- AI/API stack: Google Gemini API, OpenAI GPT-4 alternative generation, ElevenLabs API, Web Audio API.

### What the Project Actually Does

A user selects or enters a podcast topic, chooses an AI provider and podcast length, generates a host/guest script, optionally refines it, then generates podcast audio with ElevenLabs voices and synchronized speaker feedback.

### Technical Scope

- React/Vite frontend.
- Server-side API routes / local backend approach.
- Gemini/OpenAI script generation.
- ElevenLabs TTS integration.
- Multi-speaker audio generation.
- Audio timing/synchronization.
- Local/session storage.
- Deployment-oriented environment variable guidance.

### Recruiter-Friendly Positioning

Use this project to show:

- You can build a complete GenAI content workflow.
- You understand server-side key protection.
- You can coordinate text generation and audio generation.
- You can build a polished UI around a creative AI task.
- You understand async user flows where generation may take time.

### Suggested Short Portfolio Card Copy

**VoxGen — AI Podcast Studio**  
Built a GenAI podcast creation app that generates scripts with Gemini/OpenAI, refines dialogue, synthesizes multi-speaker audio with ElevenLabs, and provides synchronized speaker playback feedback.

### Suggested Impact Line

`Designed a full GenAI media workflow from topic selection to script generation, refinement, voice synthesis, and synchronized playback.`

### Suggested Tags

`React`, `TypeScript`, `Vite`, `Gemini`, `OpenAI`, `ElevenLabs`, `Web Audio API`, `Tailwind CSS`

### Suggested Case Study Points

- Why server-side key handling matters.
- How text generation and TTS are sequenced.
- How multi-speaker audio timing is tracked.
- How UI state guides the user through long-running generation steps.

### Honest Caveats / Do Not Claim

Do **not** claim studio-quality publishing or commercial podcast hosting.  
Do **not** claim generated audio is stored privately unless verified in backend implementation.  
Do **not** claim real user adoption or deployment unless later verified.

---

# 3. Secondary Project Research

## 3.1 GlitchVision

**Repository:** `Bijay-Thakur/GlitchVision---Visual-Anomaly-Detection-for-Game-QA`  
**GitHub URL:** `https://github.com/Bijay-Thakur/GlitchVision---Visual-Anomaly-Detection-for-Game-QA`  
**Suggested category:** Computer Vision / Visual Anomaly Detection / QA Tooling  
**Recommended display title:** `GlitchVision — Visual Anomaly Triage for Game QA`

### Confirmed Evidence

GlitchVision is a CPU-first visual regression triage tool for gameplay and simulation footage. It uses ResNet-18 embeddings, Isolation Forest, reference-based kNN, hybrid scoring, segment-level analysis, synthetic benchmark, and Streamlit UI.

Confirmed metrics:

- Current synthetic benchmark: 80 sampled frames, 30 positive frames, 10 URLs probed.
- ResNet-18 + IsolationForest: F1 = 0.500, accuracy = 0.750, precision = 1.000, recall = 0.333.
- Reference kNN: ROC-AUC = 0.993, PR-AUC = 0.987, Precision@20 = 1.000, Hit@20 = 1.000.
- Temporal LogisticRegression variant: interval recall = 1.000.
- CPU profile: 58.75s total runtime, 1.36 samples/s, 196.28 MB peak traced memory, $0 external API cost.
- README explicitly says the metrics are benchmark evidence on controlled injected glitches, not production QA accuracy.

### Suggested Short Portfolio Card Copy

**GlitchVision**  
Built a CPU-first visual anomaly triage tool for gameplay footage using ResNet-18 embeddings, Isolation Forest, reference kNN, hybrid scoring, segment aggregation, Streamlit UI, and a synthetic injected-glitch benchmark.

### Suggested Impact Line

`Reached 0.993 ROC-AUC with reference kNN on a controlled synthetic glitch benchmark; reported as benchmark evidence, not production QA accuracy.`

### Tags

`Python`, `PyTorch`, `ResNet-18`, `scikit-learn`, `OpenCV`, `Streamlit`, `Computer Vision`, `Anomaly Detection`

### Honest Caveats

Do not call it a bug detector. The README says it tells reviewers where to look, not what is broken.  
Do not claim production QA accuracy.  
Do not claim ResNet was trained from scratch; it uses frozen pretrained embeddings.

---

## 3.2 StoreSense

**Repository:** `Bijay-Thakur/StoreSense---AI-Profit-Leak-Assistant-for-Small-Stores`  
**GitHub URL:** `https://github.com/Bijay-Thakur/StoreSense---AI-Profit-Leak-Assistant-for-Small-Stores`  
**Suggested category:** Product MVP / Retail Analytics / Small Business SaaS  
**Recommended display title:** `StoreSense — Profit Leak Assistant for Small Stores`

### Confirmed Evidence

The README describes StoreSense as a POS-connected reorder, invoice, and profit-leak assistant concept for small stores. The current codebase is explicitly a hackathon-ready MVP with typed mock data. It has no production AI, no live POS, no real payments.

Confirmed details:

- Mobile-first Next.js app with typed mock data.
- Free vs Pro preview positioning.
- Routes include login, home, sales, products, product insight, invoices, alerts, profile, and market benchmark.
- Demo login: `admin` / `admin`.
- Data comes from CSV mock data and TypeScript fixtures.
- Tech stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide React.
- Auth demo uses a cookie via Next API login route and middleware.
- Not in repo: Supabase, Firebase, Stripe, live competitor APIs, real Gmail/OCR, production POS connectors, hosted LLM calls.

### Suggested Short Portfolio Card Copy

**StoreSense**  
Built a mobile-first retail SaaS MVP that shows reorder guidance, invoice status, product insights, alerts, and Pro-preview market benchmarking for small stores using typed mock data and realistic product UX.

### Suggested Impact Line

`Designed a hackathon-ready retail decision-support MVP with honest mock-data boundaries and clear future integration paths.`

### Tags

`Next.js`, `React`, `TypeScript`, `Tailwind CSS`, `Product Design`, `Retail Analytics`, `Mock Data MVP`

### Honest Caveats

Do not claim live POS integration.  
Do not call it production AI.  
Do not claim Stripe/payments.  
Do not claim real competitor pricing data.  
The README explicitly labels the MVP as mock-data/demo-driven.

---

## 3.3 Chautari

**Repository:** `Bijay-Thakur/Chautari`  
**GitHub URL:** `https://github.com/Bijay-Thakur/Chautari`  
**Suggested category:** Hackathon / Full-Stack AI / Community Product  
**Recommended display title:** `Chautari — Culturally Grounded Mental Health Awareness Space`

### Confirmed Evidence

The README describes Chautari as a culturally grounded digital safe space for mental-health awareness and community presence. It is explicitly not medical advice or therapy. It was developed as a mental-health themed hackathon project by a team of four.

Confirmed Bijay role:

- Deployment
- AI integration
- Full-stack developer

Confirmed features:

- Anonymous kite room.
- Guided reflection with voice/text input.
- Whisper transcription fallback.
- GPT-4o-mini classification into mental-health buckets.
- Gemini/OpenAI resource suggestions with fallback JSON.
- Bilingual screening questionnaire.
- Scenario chain flow.
- Supabase realtime broadcast for anonymous chat.
- Next.js 16, React 19, TypeScript, Tailwind, Framer Motion, Supabase, OpenAI, Gemini.

### Suggested Short Portfolio Card Copy

**Chautari**  
Contributed deployment, AI integration, and full-stack development for a hackathon mental-health awareness app with anonymous reflection, Supabase realtime features, Whisper transcription, GPT-4o-mini classification, and Gemini/OpenAI resource suggestions.

### Suggested Impact Line

`Built as a team hackathon project with clear safety disclaimers and culturally grounded UX.`

### Tags

`Next.js`, `React`, `TypeScript`, `Supabase`, `OpenAI`, `Gemini`, `Framer Motion`, `Hackathon`

### Honest Caveats

Do not present this as therapy or a medical tool.  
Keep the disclaimer visible in the portfolio case study.  
Mention team role accurately; do not imply solo ownership.

---

## 3.4 ResumeForge

**Repository:** `Bijay-Thakur/ResumeForge`  
**GitHub URL:** `https://github.com/Bijay-Thakur/ResumeForge`  
**Suggested category:** AI Career Tool / Multi-Agent Frontend Prototype  
**Recommended display title:** `ResumeForge — Multi-Agent Resume Tailoring Frontend`

### Confirmed Evidence

The README describes ResumeForge as a production-quality frontend for a multi-agent Resume Tailor app built with Next.js App Router, TypeScript, and Tailwind. It runs fully in-browser with mocked API routes and no backend required.

Confirmed features:

- Landing page.
- Workspace with job/resume inputs.
- Agent Report tab with 7 agents and streaming simulation.
- Resume Editor tab with Monaco LaTeX editor and mock PDF preview.
- Export tab with mock PDF, `.tex`, and ATS text copy.
- Optional real backend path using FastAPI/uvicorn and OpenAI key.

### Suggested Short Portfolio Card Copy

**ResumeForge**  
Built a polished frontend for a multi-agent resume tailoring workflow with job/resume inputs, simulated agent analysis, Monaco LaTeX editing, mock PDF preview, and export flows.

### Suggested Tags

`Next.js`, `TypeScript`, `Tailwind CSS`, `Monaco Editor`, `Mock API`, `AI UX`

### Honest Caveats

Do not claim full backend production workflow unless current backend is verified.  
Current README says frontend runs with mocked API routes.

---

## 3.5 BetaFlow

**Repository:** `Bijay-Thakur/BetaFlow-`  
**GitHub URL:** `https://github.com/Bijay-Thakur/BetaFlow-`  
**Suggested category:** Early Full-Stack / Product Prototype  
**Recommended display title:** `BetaFlow`

### Confirmed Evidence

The current README only confirms that BetaFlow is a Next.js application built with TypeScript. It includes default-style instructions for `npm install` and `npm run dev`.

### Suggested Short Portfolio Card Copy

**BetaFlow**  
Early Next.js + TypeScript project. Keep as a smaller/archived project unless more README evidence, screenshots, or feature documentation are added.

### Tags

`Next.js`, `TypeScript`

### Honest Caveats

Do not claim feedback analytics, product management workflows, or production features unless the repo is updated with evidence.  
If this was a hackathon/product project, update the README before featuring it strongly.

---

# 4. LinkedIn Verification Status

Bijay said the LinkedIn project section has been updated. However, from this environment:

- The LinkedIn profile URL could not be fetched directly.
- Public web search did not surface the updated project section.
- Therefore, no LinkedIn-only claims are included as verified facts.

### Cursor Instruction

Do not use LinkedIn project text unless Bijay pastes it into the project or adds it to this Markdown. If LinkedIn descriptions are later provided, compare them against GitHub evidence:

- If LinkedIn has a metric not in GitHub, mark it as `needs verification`.
- If LinkedIn exaggerates the repo evidence, rewrite it honestly.
- If LinkedIn has better wording but same facts, use it.

---

# 5. Recommended Portfolio Project Data Model

Use this data shape in `src/data/projects.ts` or `src/data/portfolio.ts`:

```ts
export type ProjectStatus = "featured" | "secondary" | "early";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  status: ProjectStatus;
  category: string;
  oneLiner: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  caseStudyBullets: string[];
  credibilityNotes: string[];
  doNotClaim: string[];
};
```

---

# 6. Suggested `projects` Content for Cursor

Cursor should create/update project content using the following conservative data.

```ts
export const projects: Project[] = [
  {
    slug: "rag-sec-10k",
    title: "SEC 10-K RAG — Source-Grounded Annual Report Q&A",
    shortTitle: "SEC 10-K RAG",
    status: "featured",
    category: "RAG Systems",
    oneLiner: "A source-grounded RAG system over Apple’s 2025 10-K with manual and LlamaIndex implementations, cited answers, retrieval evaluation, and Streamlit UI.",
    problem: "Annual reports are long, dense, and difficult to search reliably when analysts need specific, source-backed answers.",
    solution: "Built an end-to-end RAG pipeline with SEC HTML parsing, structured chunking, ChromaDB retrieval, BM25/hybrid retrieval, reranking, citation-grounded generation, and v1/v2 implementation comparison.",
    impact: "Reported 0.86 Recall@5 on a 50-question gold set and 0.99 RAGAS Faithfulness for citation-grounded answers.",
    tech: ["Python", "RAG", "LlamaIndex", "ChromaDB", "OpenAI", "BM25", "RAGAS", "Streamlit"],
    repoUrl: "https://github.com/Bijay-Thakur/rag-sec-10k",
    caseStudyBullets: [
      "Implemented both from-scratch and LlamaIndex RAG pipelines.",
      "Used hybrid retrieval and cross-encoder reranking for better retrieval quality.",
      "Evaluated retrieval with Recall@K/MRR and generation with RAGAS/LlamaIndex evaluators.",
      "Designed cited answers and source panels so users can verify model claims."
    ],
    credibilityNotes: ["Metrics are from the project README/eval outputs."],
    doNotClaim: ["Do not claim real analyst adoption.", "Do not claim multi-company coverage unless later added."]
  },
  {
    slug: "launchlab-ai",
    title: "LaunchLab AI — Multi-LLM Product Studio",
    shortTitle: "LaunchLab AI",
    status: "featured",
    category: "GenAI Product Workflow",
    oneLiner: "A multi-LLM product studio that turns rough ideas into research, blueprint, build prompt, campaign copy, visual prompts, evaluation, and workflow map.",
    problem: "Early product builders often have messy ideas but need structured research, MVP scope, positioning, and implementation prompts.",
    solution: "Built a full-stack workflow using Gemini and OpenAI with role-specific model steps, manual v1 orchestration, LangGraph v2 orchestration, and fallback-safe demo behavior.",
    impact: "Designed a demo-safe system with live, partial-fallback, and mock-fallback modes so every workflow step remains presentable.",
    tech: ["Next.js", "TypeScript", "Flask", "OpenAI", "Gemini", "LangGraph", "Tailwind", "Framer Motion"],
    repoUrl: "https://github.com/Bijay-Thakur/LaunchLab-AI---Multi-LLM-Product-Studio",
    caseStudyBullets: [
      "Mapped each product-building stage to a specialized model role.",
      "Added Manual v1 and LangGraph v2 orchestration modes with the same response shape.",
      "Built provider warnings and graceful fallbacks for missing keys, timeouts, malformed JSON, and backend failure.",
      "Generated Claude/Cursor-ready build prompts as part of the workflow."
    ],
    credibilityNotes: ["README confirms Gemini/OpenAI usage, fallback behavior, and v1/v2 workflow modes."],
    doNotClaim: ["Do not claim real startup validation.", "Do not claim production users.", "Do not claim all image generation works for every OpenAI account."]
  },
  {
    slug: "code-council",
    title: "Code Council — Multi-Agent GenAI Code Analysis",
    shortTitle: "Code Council",
    status: "featured",
    category: "AI Developer Tools",
    oneLiner: "A multi-agent code analysis tool where specialist agents explain code, detect bugs, analyze complexity, debate findings, and synthesize a final review.",
    problem: "Single-pass code review can miss bugs, complexity issues, and tradeoffs that benefit from multiple perspectives.",
    solution: "Built a React/TypeScript dashboard and Express backend that routes submitted code through orchestrator, explainer, bug hunter, complexity, debate, and supervisor stages.",
    impact: "Implemented parallel agent execution, structured debate, schema validation, trace logs, and fallback-safe final verdict generation.",
    tech: ["React", "TypeScript", "Vite", "Express", "OpenAI", "Zod", "Multi-Agent Systems", "Tailwind"],
    repoUrl: "https://github.com/Bijay-Thakur/Code-Council---A-Multi-Agent-GenAI-Code-Analysis-System",
    caseStudyBullets: [
      "Runs explainer, bug hunter, and complexity agents in parallel.",
      "Uses structured debate before supervisor synthesis.",
      "Validates model outputs against schemas before rendering.",
      "Includes fallback responses when API calls or parsing fail."
    ],
    credibilityNotes: ["Backend code confirms orchestration, parallel agents, schema validation, and fallback behavior."],
    doNotClaim: ["Do not say fine-tuned agents.", "Do not claim production code review accuracy.", "Do not claim GitHub PR integration unless added later."]
  },
  {
    slug: "retail-demand-forecasting",
    title: "Retail Demand Forecasting — End-to-End ML Pipeline",
    shortTitle: "Demand Forecasting",
    status: "featured",
    category: "Applied Machine Learning",
    oneLiner: "An applied ML pipeline for weekly SKU demand forecasting using real grocery invoice data, PostgreSQL, time-series feature engineering, baseline modeling, LightGBM, and error analysis.",
    problem: "Small retailers need better reorder decisions, but demand varies by SKU, promotions, discounts, and intermittent sales patterns.",
    solution: "Built a reproducible pipeline from raw invoice ingestion to SQL aggregation, feature engineering, temporal splitting, baseline forecasting, LightGBM training, and error analysis.",
    impact: "Found that the naive baseline outperformed the first LightGBM model, then identified promotions and discounts as major forecast failure drivers.",
    tech: ["Python", "PostgreSQL", "Pandas", "SQLAlchemy", "LightGBM", "scikit-learn", "Time Series", "Jupyter"],
    repoUrl: "https://github.com/Bijay-Thakur/demand-forecast",
    caseStudyBullets: [
      "Loaded raw invoice data into PostgreSQL and built weekly SKU-level demand tables.",
      "Engineered lag, rolling, price, promotion, calendar, sports, and weather features.",
      "Used per-SKU temporal train/test split to avoid leakage.",
      "Used error analysis to show why promotions break the naive baseline."
    ],
    credibilityNotes: ["README honestly reports that baseline MAE/RMSE beat the first LightGBM model on the current snapshot."],
    doNotClaim: ["Do not claim ML model improvement over baseline.", "Do not claim deployed inventory optimization.", "Do not hide baseline > LightGBM result."]
  },
  {
    slug: "voxgen-ai-podcast-studio",
    title: "VoxGen — AI Podcast Studio",
    shortTitle: "VoxGen",
    status: "featured",
    category: "GenAI Media Workflow",
    oneLiner: "A GenAI podcast creation app that generates and refines scripts with Gemini/OpenAI, synthesizes host/guest audio with ElevenLabs, and shows synchronized playback feedback.",
    problem: "Creating a polished podcast requires topic ideation, scripting, editing, voice generation, and audio playback coordination.",
    solution: "Built a React/TypeScript app with AI script generation/refinement, server-side API key handling, ElevenLabs voice synthesis, multi-speaker support, and playback synchronization.",
    impact: "Designed an end-to-end creative AI workflow from topic selection to script generation, refinement, voice synthesis, and synchronized speaker feedback.",
    tech: ["React", "TypeScript", "Vite", "Gemini", "OpenAI", "ElevenLabs", "Web Audio API", "Tailwind"],
    repoUrl: "https://github.com/Bijay-Thakur/AI-Podcast-Generator",
    caseStudyBullets: [
      "Supports preset and custom podcast topics.",
      "Generates and refines scripts with Gemini or OpenAI.",
      "Uses ElevenLabs for multi-speaker text-to-speech generation.",
      "Protects API keys server-side instead of exposing them in the browser."
    ],
    credibilityNotes: ["README confirms features, server-side key handling, APIs, and tech stack."],
    doNotClaim: ["Do not claim commercial podcast hosting.", "Do not claim real user adoption.", "Do not claim persistent private storage unless verified."]
  }
];
```

---

# 7. Suggested Secondary Project Data

```ts
export const secondaryProjects: Project[] = [
  {
    slug: "glitchvision",
    title: "GlitchVision — Visual Anomaly Triage for Game QA",
    shortTitle: "GlitchVision",
    status: "secondary",
    category: "Computer Vision",
    oneLiner: "CPU-first visual anomaly triage for gameplay footage using ResNet-18 embeddings, Isolation Forest, reference kNN, hybrid scoring, and Streamlit.",
    problem: "Manual gameplay QA footage review does not scale, and labeled glitch datasets are scarce.",
    solution: "Built a frame-sampling and embedding pipeline with unsupervised and reference-based scoring plus segment-level review outputs.",
    impact: "Reference kNN reached 0.993 ROC-AUC and 1.000 Precision@20 on a controlled synthetic glitch benchmark; not claimed as production QA accuracy.",
    tech: ["Python", "PyTorch", "ResNet-18", "OpenCV", "scikit-learn", "Streamlit"],
    repoUrl: "https://github.com/Bijay-Thakur/GlitchVision---Visual-Anomaly-Detection-for-Game-QA",
    caseStudyBullets: [],
    credibilityNotes: ["Benchmark metrics are controlled synthetic evidence only."],
    doNotClaim: ["Do not call it a bug detector.", "Do not claim production QA accuracy."]
  },
  {
    slug: "storesense",
    title: "StoreSense — Profit Leak Assistant for Small Stores",
    shortTitle: "StoreSense",
    status: "secondary",
    category: "Product MVP",
    oneLiner: "Mobile-first retail decision-support MVP for reorders, invoices, alerts, and market benchmark preview using typed mock data.",
    problem: "Small store owners often reorder and price by habit while vendor costs and margin leaks go unnoticed.",
    solution: "Built a polished Next.js MVP with simulated POS/invoice/product data, Free/Pro preview flows, and action-oriented retail UX.",
    impact: "Demonstrates product thinking and retail workflow design with explicitly labeled mock-data boundaries.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Lucide", "Mock Data"],
    repoUrl: "https://github.com/Bijay-Thakur/StoreSense---AI-Profit-Leak-Assistant-for-Small-Stores",
    caseStudyBullets: [],
    credibilityNotes: ["README explicitly says no production AI, no live POS, and no real payments."],
    doNotClaim: ["Do not claim live POS.", "Do not claim production AI.", "Do not claim real market pricing data."]
  },
  {
    slug: "chautari",
    title: "Chautari — Mental Health Awareness Space",
    shortTitle: "Chautari",
    status: "secondary",
    category: "Hackathon / Full-Stack AI",
    oneLiner: "Team-built culturally grounded mental-health awareness app with anonymous reflection, Supabase realtime features, Whisper transcription, GPT-4o-mini classification, and Gemini/OpenAI resource suggestions.",
    problem: "People need a gentle, anonymous space for reflection and awareness, especially with culturally familiar design language.",
    solution: "Contributed deployment, AI integration, and full-stack development to a team hackathon project with safety disclaimers and multilingual/cultural UX.",
    impact: "Built in a four-person hackathon team; Bijay’s role: deployment, AI integration, full-stack development.",
    tech: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Gemini", "Framer Motion"],
    repoUrl: "https://github.com/Bijay-Thakur/Chautari",
    caseStudyBullets: [],
    credibilityNotes: ["Team roles are listed in the README."],
    doNotClaim: ["Do not present as therapy or medical product.", "Do not imply solo ownership."]
  },
  {
    slug: "resumeforge",
    title: "ResumeForge — Multi-Agent Resume Tailoring Frontend",
    shortTitle: "ResumeForge",
    status: "secondary",
    category: "AI Career Tool",
    oneLiner: "Polished frontend for a multi-agent resume tailoring workflow with simulated agent report, Monaco LaTeX editor, mock PDF preview, and export flow.",
    problem: "Tailoring resumes requires extracting job requirements, mapping evidence, editing LaTeX, and exporting recruiter-ready versions.",
    solution: "Built a Next.js frontend with mocked orchestration routes, agent report simulation, LaTeX editing, and export UI.",
    impact: "Strong AI UX prototype; current README says it runs fully in-browser with mocked API routes.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Monaco Editor", "Mock API"],
    repoUrl: "https://github.com/Bijay-Thakur/ResumeForge",
    caseStudyBullets: [],
    credibilityNotes: ["README confirms frontend + mocked API route status."],
    doNotClaim: ["Do not claim full production backend unless verified."]
  },
  {
    slug: "betaflow",
    title: "BetaFlow",
    shortTitle: "BetaFlow",
    status: "early",
    category: "Early Project",
    oneLiner: "Early Next.js + TypeScript project. Keep small unless the README is updated with real feature evidence.",
    problem: "Not enough repo evidence to describe a larger product accurately.",
    solution: "Use as an archive/learning project or update README before featuring.",
    impact: "Current repo evidence only confirms Next.js and TypeScript setup.",
    tech: ["Next.js", "TypeScript"],
    repoUrl: "https://github.com/Bijay-Thakur/BetaFlow-",
    caseStudyBullets: [],
    credibilityNotes: ["README is minimal/default-style."],
    doNotClaim: ["Do not claim advanced product analytics or user workflows without repo evidence."]
  }
];
```

---

# 8. Portfolio Page Recommendations

## Home Page

Show only 3 projects on the homepage:

1. RAG SEC 10-K
2. LaunchLab AI
3. Code Council

Why: these best communicate AI engineering + GenAI systems. Demand Forecasting and VoxGen are excellent but better placed on the full Projects page.

## Projects Page

Use this structure:

### Featured Projects
- RAG SEC 10-K — flagship / top card
- LaunchLab AI
- Code Council
- Retail Demand Forecasting
- VoxGen

### Other Strong Builds
- GlitchVision
- StoreSense
- Chautari
- ResumeForge

### Early / Archived
- BetaFlow

## About Page

Use story framing:

- Learning: CS foundations + tutoring + systems thinking.
- Building: full-stack apps, GenAI workflows, applied ML pipelines.
- Impact: source-grounded AI, practical product tools, honest evaluation.

## Experience Page

Do not mix projects into experience. Keep internships/work separately.

---

# 9. Cursor Prompt

Copy-paste this into Cursor.

```text
You are a senior full-stack engineer, UI/UX designer, AI engineer, and technical content editor.

TASK:
Update my portfolio project data and project pages using the project research in this Markdown file.

IMPORTANT:
Use caveman technique:
- Direct.
- No long explanations.
- Build first.
- Do not over-engineer.
- No fake claims.
- No invented metrics.
- Use only facts from this Markdown.
- If a project has weak evidence, keep copy conservative.

OBJECTIVE:
Create/update my portfolio so the Projects section is credible, recruiter-friendly, and aligned with my updated GitHub.

PROJECT HIERARCHY:
Headline projects:
1. RAG SEC 10-K
2. LaunchLab AI
3. Code Council
4. Retail Demand Forecasting
5. VoxGen / AI Podcast Generator

Secondary projects:
1. GlitchVision
2. StoreSense
3. Chautari
4. ResumeForge
5. BetaFlow as early/archive only

DO NOT:
- Do not claim LinkedIn facts unless they are pasted into the repo or this file.
- Do not claim production users unless source says so.
- Do not claim real deployment unless source says so.
- Do not hide limitations.
- Do not claim Demand Forecasting beat the baseline. It did not.
- Do not claim Code Council agents are fine-tuned.
- Do not claim StoreSense has live POS, real payments, or production AI.
- Do not claim Chautari is therapy or medical advice.
- Do not over-feature BetaFlow.

DATA MODEL:
Create or update `src/data/projects.ts` or `src/data/portfolio.ts` with:

export type ProjectStatus = "featured" | "secondary" | "early";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  status: ProjectStatus;
  category: string;
  oneLiner: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  caseStudyBullets: string[];
  credibilityNotes: string[];
  doNotClaim: string[];
};

Use the exact project data from sections 6 and 7 of this Markdown.

PAGE UPDATES:

1. Home page:
- Show only top 3 projects:
  - RAG SEC 10-K
  - LaunchLab AI
  - Code Council
- Add link: “View all projects”
- Keep homepage simple and recruiter-focused.

2. Projects page:
- Hero heading: “Projects that show how I think, build, and solve problems.”
- Short intro: “Selected AI/ML, GenAI, and software projects grounded in measurable systems, honest evaluation, and practical product thinking.”
- Section 1: Featured Projects
  - Display 5 headline projects.
  - RAG SEC 10-K should be the largest/first card.
  - Each card must show category, title, oneLiner, impact, tech tags, repo link.
- Section 2: Other Strong Builds
  - GlitchVision, StoreSense, Chautari, ResumeForge.
- Section 3: Early / Archived
  - BetaFlow with conservative text.

3. Project detail pages or expandable cards:
If project detail pages already exist, update them.
If not, implement simple modal or detail route only if easy.
Each detail should include:
- Problem
- Solution
- Impact
- Tech stack
- Case study bullets
- Credibility notes
- “What I would improve next”
- Repo link

4. Credibility notes:
Show credibility notes subtly, maybe as “Evidence / Notes” in detail view.
Do not show “doNotClaim” publicly unless useful; keep internal in data.

5. Visual design:
- Keep same clean portfolio style.
- Light theme.
- Blue/purple accents.
- Rounded cards.
- Recruiter-readable.
- No clutter.
- No progress bars.
- No fake dashboards if not needed.

6. Filtering:
Optional but useful:
- All
- RAG / GenAI
- ML / Data
- Full Stack
- Product MVP
Do not overbuild.

7. External links:
- Every project with repoUrl should have a GitHub button.
- If liveUrl is missing, do not show fake live demo link.

QUALITY CHECKLIST:
Create/update `TODO_STATUS.md`:

A. Data
- [ ] Project data centralized
- [ ] 5 headline projects included
- [ ] Secondary projects included
- [ ] BetaFlow marked early/archive
- [ ] No fake metrics
- [ ] No LinkedIn-only claims

B. Home page
- [ ] Only top 3 projects shown
- [ ] Clear CTA to all projects
- [ ] Project cards use truthful copy

C. Projects page
- [ ] Featured section shows 5 projects
- [ ] Other projects section included
- [ ] Repo links work
- [ ] Conservative copy for weak-evidence projects

D. Design
- [ ] Clean hierarchy
- [ ] Responsive cards
- [ ] No clutter
- [ ] Accessible links/buttons

E. Validation
- [ ] npm run lint passes if available
- [ ] npm run build passes
- [ ] No TypeScript errors
- [ ] No console errors

SELF-REPAIR:
After editing:
1. Run build.
2. Fix errors.
3. Check project copy against this Markdown.
4. Remove any unsupported claim.
5. Update TODO_STATUS.md.
6. Final response: concise summary, changed files, build status.

START NOW.
```

---

# 10. Final Recommendation

For recruiter impact, lead with this order:

1. **RAG SEC 10-K** — best proof of AI engineering maturity.
2. **LaunchLab AI** — best proof of GenAI product/orchestration ability.
3. **Code Council** — best proof of multi-agent developer tooling.
4. **Retail Demand Forecasting** — best proof of applied ML honesty and data pipeline thinking.
5. **VoxGen** — best proof of creative GenAI workflow + API integration.

Use **GlitchVision** as a strong secondary or promote it when applying to ML/computer vision roles.
Use **StoreSense** when applying to product-minded full-stack/startup roles.
Use **Chautari** when showing hackathon/team/impact work.
Use **ResumeForge** as AI UX/frontend prototype.
Use **BetaFlow** only if its README is updated with real evidence.

