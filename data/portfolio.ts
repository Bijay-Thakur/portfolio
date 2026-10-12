// ─── Types ────────────────────────────────────────────────────────────────────

export type NavLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
  highlight: string;
  honestNote?: string;
  repoUrl?: string;
  demoUrl?: string;
  isFeatured?: boolean;
  isPrototype?: boolean;
  badge?: string;
  linkLabel?: string;
};

export type Experience = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
  tags: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  gpa: string;
  honor: string;
  note?: string;
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type LeadershipItem = {
  title: string;
  org: string;
  period?: string;
  description: string;
  tags?: string[];
};

export type ContactLink = {
  label: string;
  href: string;
  icon: string;
};

// ─── Site Config ──────────────────────────────────────────────────────────────

// Public site config. Values can be overridden per-environment via .env.local
// (see .env.example); the literals below are the working fallbacks, so a build
// with no env vars set still produces a correct site.
//
// NOTE: NEXT_PUBLIC_* is inlined into the browser bundle at build time. These
// are public config, not secrets. Each var must be referenced as a full static
// expression for Next.js to inline it — do not rewrite these as process.env[k].

export const siteConfig = {
  initials: "B.T.",
  name: "Bijay Thakur",
  title: "AI Engineer · GenAI Systems Builder · Systems Thinker",
  tagline:
    "Building research-driven AI systems, RAG pipelines, and practical ML products with real-world utility.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "starbijay143@gmail.com",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Bijay-Thakur",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://linkedin.com/in/bijay-thakur-6b7793258/",
  resume: process.env.NEXT_PUBLIC_RESUME_URL || "/resumes/AI_ENGINEER_RESUME.pdf",
  about:
    "I'm a Computer Science student at Queens College, CUNY, focused on AI/ML engineering, GenAI systems, RAG, applied ML, and production-minded software development. I enjoy building systems that are honest, evaluated, and actually useful — not just impressive in a demo.",
  focusTags: ["RAG", "LLM Apps", "Applied ML", "Full-Stack AI", "Evaluation", "Product Thinking"],
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Leadership", href: "#leadership" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// ─── AI / ML projects ────────────────────────────────────────────────────────

export const aiProjects: Project[] = [
  {
    slug: "rag-sec-10k",
    title: "SEC Insight AI",
    category: "RAG Systems / Retrieval Evaluation",
    summary:
      "Source-grounded RAG over Apple's 2025 10-K. Manual Python pipeline plus LlamaIndex v2 with hybrid retrieval, BM25 + semantic RRF, cross-encoder reranking, citation-backed answers, and a 50-question gold evaluation set.",
    tech: ["Python", "RAG", "LlamaIndex", "ChromaDB", "OpenAI", "BM25", "RAGAS", "Streamlit"],
    highlight:
      "Hybrid Recall@5: 0.86 · RAGAS Faithfulness: 0.99 · ~3s query latency (README evaluation set).",
    repoUrl: "https://github.com/Bijay-Thakur/rag-sec-10k",
    demoUrl: "https://rag-sec-10k-alpha.vercel.app",
    linkLabel: "Live site",
    badge: "Live",
  },
  {
    slug: "rivalscope-ai",
    title: "RivalScope AI — Agentic Competitive Intelligence",
    category: "Agentic Systems / Competitive Intelligence",
    summary:
      "Agentic competitive-intelligence platform that runs live competitor research and generates cited GTM reports. Next.js 15 + LangGraph/LangChain with Tavily search, LangSmith tracing, and SSE streaming for real-time run progress.",
    tech: ["Next.js 15", "LangGraph", "LangChain", "Tavily", "LangSmith", "Pydantic", "SSE", "TypeScript"],
    highlight:
      "Evaluation-driven grounding layer — Pydantic structured outputs, citation checks, LLM-as-judge evals, and cost/context guards: 88.9% comparison grounding on the latest real-mode benchmark.",
    honestNote:
      "Benchmark is a self-run real-mode eval, not an industry-standard leaderboard.",
    repoUrl: "https://github.com/Bijay-Thakur/RivalScope-AI",
    isFeatured: true,
  },
  {
    slug: "launchlab-ai",
    title: "LaunchLab AI",
    category: "Multi-LLM Orchestration / GenAI Product",
    summary:
      "Multi-LLM product studio that turns a rough idea into research, blueprint, build prompt, campaign copy, and workflow map. Gemini + OpenAI orchestration with both manual v1 and LangGraph v2, plus per-step fallback for demo reliability.",
    tech: ["Next.js", "TypeScript", "Flask", "OpenAI", "Gemini", "LangGraph", "Tailwind"],
    highlight: "Per-step fallback keeps every workflow step presentable without live API keys.",
    honestNote: "Demo-ready product. No production users or revenue.",
    repoUrl: "https://github.com/Bijay-Thakur/LaunchLab-AI---Multi-LLM-Product-Studio",
    isFeatured: true,
  },
  {
    slug: "code-council",
    title: "Code Council",
    category: "Multi-Agent Code Review / AI Developer Tools",
    summary:
      "Multi-agent GenAI code analysis: Explainer, Bug Hunter, Complexity Analyst, and Debate agents run in parallel, then a Supervisor synthesizes a final review. Express backend with /api/analyze and Zod schema validation.",
    tech: ["React", "TypeScript", "Express", "OpenAI", "Zod", "Vite", "Tailwind"],
    highlight: "Parallel agent execution + structured debate before supervisor synthesis.",
    honestNote: "Prompt-specialized agents — not fine-tuned. API prototype, not enterprise production.",
    repoUrl:
      "https://github.com/Bijay-Thakur/Code-Council---A-Multi-Agent-GenAI-Code-Analysis-System",
    isFeatured: true,
  },
  {
    slug: "demand-forecasting",
    title: "Retail Demand Forecasting",
    category: "Applied ML / Forecasting / Data Engineering",
    summary:
      "End-to-end weekly SKU demand forecasting from real grocery invoice data: PostgreSQL ingestion, SQL aggregation, lag/rolling/promo feature engineering, temporal split, naive baseline, and LightGBM with honest error analysis.",
    tech: ["Python", "PostgreSQL", "Pandas", "LightGBM", "scikit-learn", "SQLAlchemy", "Jupyter"],
    highlight:
      "Honest finding: naive baseline (MAE 0.219) outperformed first LightGBM snapshot — framed as ML rigor, not failure.",
    honestNote: "Not deployed for production forecasting. Baseline > LightGBM on current snapshot.",
    repoUrl: "https://github.com/Bijay-Thakur/demand-forecast",
    isFeatured: true,
  },
  {
    slug: "marianmt-nmt",
    title: "MarianMT Domain Adaptation",
    category: "NLP / Neural Machine Translation / Fine-Tuning",
    summary:
      "Fine-tuned Helsinki-NLP/opus-mt-en-fr (MarianMT) for English-to-French translation using Hugging Face Transformers and PyTorch on GPU. Scaled experiments across 1K, 10K, and 189K KDE4 examples — improving BLEU from 46.07 to 58.37.",
    tech: ["Python", "PyTorch", "Hugging Face", "Transformers", "Seq2SeqTrainer", "CUDA", "Google Colab"],
    highlight:
      "BLEU score improved from 46.07 → 58.37 across scaling experiments; larger in-domain training sets consistently improved translation quality.",
    repoUrl: "https://github.com/Bijay-Thakur/marianmt-en-fr-domain-adaptation",
    isFeatured: true,
  },
  {
    slug: "voxgen",
    title: "VoxGen — AI Podcast Studio",
    category: "GenAI Media Workflow / Full-Stack App",
    summary:
      "AI podcast studio: topic selection, Gemini/OpenAI script generation and refinement loop, ElevenLabs multi-speaker voice synthesis, and synchronized playback. API keys handled server-side.",
    tech: ["React", "TypeScript", "Vite", "Gemini", "OpenAI", "ElevenLabs", "Web Audio API", "Tailwind"],
    highlight:
      "Full GenAI media workflow from topic → script → refinement → voice → synchronized playback.",
    honestNote: "Demo product. No commercial podcast hosting or verified user metrics.",
    repoUrl: "https://github.com/Bijay-Thakur/AI-Podcast-Generator",
    isFeatured: true,
  },
  {
    slug: "glitchvision",
    title: "GlitchVision",
    category: "Computer Vision / Anomaly Detection",
    summary:
      "Visual anomaly triage for gameplay footage. ResNet-18 embeddings, Isolation Forest, reference kNN, hybrid scoring, and Streamlit UI. CPU-only, zero API cost.",
    tech: ["Python", "PyTorch", "ResNet-18", "scikit-learn", "Streamlit", "OpenCV"],
    highlight:
      "Reference kNN ROC-AUC: 0.993 on synthetic glitch benchmark (80 frames, 30 positive).",
    honestNote: "Synthetic benchmark only — not production QA accuracy.",
    repoUrl:
      "https://github.com/Bijay-Thakur/GlitchVision---Visual-Anomaly-Detection-for-Game-QA",
  },
  {
    slug: "resumeforge",
    title: "ResumeForge",
    category: "AI Career Tool / Multi-Agent UX",
    summary:
      "Next.js frontend for multi-agent resume tailoring: job/resume inputs, simulated 7-agent analysis report, Monaco LaTeX editor, mock PDF preview, and export flows. Optional FastAPI backend path.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Monaco Editor"],
    highlight: "Strong AI UX prototype — frontend runs fully with mocked API routes.",
    honestNote: "Mocked agent routes. Not claiming production multi-agent backend.",
    repoUrl: "https://github.com/Bijay-Thakur/ResumeForge",
    isPrototype: true,
  },
];

// ─── Production projects with real users ─────────────────────────────────────

export const productionProjects: Project[] = [
  {
    slug: "bronxville-natural-market",
    title: "Bronxville Natural Market",
    category: "Live product / E-commerce",
    summary:
      "Storefront for Bronxville Natural Market, a neighborhood shop for vitamins and natural supplements in Bronxville, NY. Visitors search the catalog, add items to a cart, and choose store pickup or local delivery. Customers manage an account; staff use admin tools for the catalog and the store.",
    tech: ["Next.js", "React", "Vercel"],
    highlight:
      "Shipped and in use by the store and its customers — guest browsing, customer accounts, and admin catalog tools in one app.",
    demoUrl: "https://supplement-market-snowy.vercel.app/",
    linkLabel: "Live site",
    badge: "Live",
  },
  {
    slug: "webx-nepal",
    title: "WebX Nepal",
    category: "Live agency site",
    summary:
      "Public site for WebX Nepal, a Kathmandu studio for web development, branding, and digital marketing. I contributed substantially to the frontend — page structure, service sections, and responsive layout — as part of a larger site the studio uses with clients.",
    tech: ["React", "Next.js"],
    highlight:
      "Live agency site used to present services, client stories, and enquiries. Frontend contribution on a team build.",
    demoUrl: "https://webxnepal.com/",
    linkLabel: "Live site",
    badge: "Live",
  },
  {
    slug: "cvwn-nepal",
    title: "CVWN Nepal",
    category: "Live nonprofit site",
    summary:
      "Public site for the Conflict Victim Women National Network, a Nepal nonprofit supporting women affected by armed conflict. I contributed substantially to the frontend, including program sections, site navigation, and the district network view.",
    tech: ["React"],
    highlight:
      "Live nonprofit site covering programs, events, and district outreach. Frontend contribution on a team build.",
    demoUrl: "https://cvwnnepal.org/",
    linkLabel: "Live site",
    badge: "Live",
  },
];

// ─── Projects in progress ─────────────────────────────────────────────────────

export const inProgressProjects: Project[] = [
  {
    slug: "pact",
    title: "PACT",
    category: "Agent infrastructure / In progress",
    summary:
      "Protocol for Agentic Commit Transactions. A commit layer that lets agents propose effects, then decides whether those effects may commit together, verifies what actually happened, and writes an accountable receipt. Phase 2.1 has local evidence; the next semantic-control phase is still open.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Next.js", "Pydantic", "Groq"],
    highlight:
      "A deterministic barrier checks authority, budgets, and invariants before effects reach an external system. Business providers in the current evidence are still simulated.",
    repoUrl: "https://github.com/Bijay-Thakur/PACT---Protocol-for-Agentic-Commit-Transactions",
    badge: "In progress",
  },
  {
    slug: "novalearn",
    title: "NovaLearn",
    category: "Course workspace / In progress",
    summary:
      "Professor-led course workspace: objectives, connected modules, source-grounded materials, authentic assessments, and evidence review. Nova proposes and summarizes; the professor approves and decides. Students learn, demonstrate, and see professor feedback.",
    tech: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Gemini", "Three.js"],
    highlight:
      "Professor approval gates every release. Mastery is an uncalibrated pilot model, not a grade, and preview mode stays in the browser.",
    repoUrl: "https://github.com/Bijay-Thakur/Nova-Learn",
    badge: "In progress",
  },
  {
    slug: "tea-amo",
    title: "Tea Amo",
    category: "Cafe operations / In progress",
    summary:
      "Cafe operating system for Tea Amo. Administration covers the floor, billing, menu, inventory, staff, and reports. Servers use a phone workspace for tables, orders, and payments. Accounts are created by an administrator.",
    tech: ["JavaScript", "Supabase", "Vercel"],
    highlight:
      "Orders carry a version check so two phones cannot silently overwrite the same ticket, and payment writes are idempotent.",
    repoUrl: "https://github.com/Bijay-Thakur/Tea-Amo",
    badge: "In progress",
  },
];

// ─── Hackathon projects ───────────────────────────────────────────────────────

export const hackathonProjects: Project[] = [
  {
    slug: "chautari",
    title: "Chautari",
    category: "Hackathon / Full-Stack AI",
    summary:
      "Team hackathon app (4 people): anonymous reflection space, Whisper transcription, GPT-4o-mini classification, Gemini resource suggestions, and Supabase realtime chat. Education and self-reflection only — not medical advice.",
    tech: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Gemini", "Framer Motion"],
    highlight: "Culturally grounded UX with explicit non-medical disclaimers throughout.",
    honestNote:
      "Team project. Bijay's role: deployment, AI integration, full-stack. Not therapy or clinical advice.",
    repoUrl: "https://github.com/Bijay-Thakur/Chautari",
  },
  {
    slug: "betaflow",
    title: "BetaFlow",
    category: "Hackathon / Early build",
    summary:
      "Hackathon-era Next.js and TypeScript app. The public repository currently shows the project scaffold and default app setup.",
    tech: ["Next.js", "TypeScript"],
    highlight: "Early hackathon build in the Next.js and TypeScript stack.",
    repoUrl: "https://github.com/Bijay-Thakur/BetaFlow-",
    isPrototype: true,
  },
  {
    slug: "neuralfeedback",
    title: "NeuralFeedback",
    category: "Hackathon / Product feedback",
    summary:
      "Team hackathon app that turns a product idea into persona-based reviews. Reviewers are generated with Gemini, can be chatted with, and can answer by voice through ElevenLabs. A summary collects strengths and improvement areas.",
    tech: ["Python", "Flask", "Gemini", "OpenAI", "ElevenLabs"],
    highlight:
      "Parallel persona reviews, follow-up chat, and voice calls. Team project; I contributed on the shared repository.",
    repoUrl: "https://github.com/matheusfarocha/NeuralFeedback",
  },
  {
    slug: "gc2go",
    title: "GC2Go",
    category: "Hackathon / Group travel",
    summary:
      "Team hackathon app that turns a travel reel into a plan the group can vote on. Gemini identifies the venue from the video, Google Maps grounding checks the place, and a later step builds a timed itinerary from availability, driver, and budget.",
    tech: ["Next.js", "React", "Gemini", "Google Maps", "Zod", "TypeScript"],
    highlight:
      "Each Gemini step is schema-checked before the next one runs. My role on the team was AI/ML engineering.",
    repoUrl: "https://github.com/Bijay-Thakur/gc2go",
  },
  {
    slug: "storesense",
    title: "StoreSense",
    category: "Hackathon / Retail analytics",
    summary:
      "Mobile-first retail SaaS MVP for small stores: reorder guidance, invoices, product insights, alerts, and a Pro-preview market benchmark. Built hackathon-ready with typed mock data and a realistic workflow.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    highlight: "Hackathon MVP with honest mock-data boundaries and a clear store workflow.",
    honestNote: "Mock data only. No production AI, live POS, or real payments.",
    repoUrl:
      "https://github.com/Bijay-Thakur/StoreSense---AI-Profit-Leak-Assistant-for-Small-Stores",
    demoUrl: "https://store-sense-ai-profit-leak-assistan.vercel.app",
    isPrototype: true,
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  // ─── TEMPORARILY HIDDEN (personal reason) — do not delete ──────────────────
  // {
  //   role: "AI Agent Builder Intern",
  //   org: "NeuralSeek",
  //   dates: "April 2026 – May 2026",
  //   bullets: [
  //     "Built custom AI agents using LangChain, RAG, and tool-use patterns.",
  //     "Integrated vector databases and external APIs for real-time agent actions.",
  //     "Evaluated and iterated on agent performance, accuracy, and safety.",
  //   ],
  //   tags: ["LangChain", "RAG", "Vector DB", "AI Agents", "Python"],
  // },
  // ──────────────────────────────────────────────────────────────────────────
  {
    role: "Web Development Intern",
    org: "WebX Nepal",
    dates: "March 2022 – July 2022",
    bullets: [
      "Developed responsive web applications using React and Next.js.",
      "Built and integrated RESTful APIs with Node.js and MongoDB.",
      "Collaborated with designers to ship production-ready features.",
    ],
    tags: ["React", "Next.js", "Node.js", "MongoDB", "REST APIs"],
  },
  {
    role: "Graphic Designer Intern",
    org: "Office of Assembly Member Steven Raga",
    dates: "October 2024 – January 2025",
    bullets: [
      "Designed social media content, flyers, and campaign materials.",
      "Created branded visuals aligned with community outreach initiatives.",
      "Delivered 50+ designs supporting key campaigns and events.",
    ],
    tags: ["Visual Design", "Brand", "Community Outreach"],
  },
  {
    role: "Academic Tutor",
    org: "LaGuardia Community College",
    dates: "February 2024 – June 2024",
    bullets: [
      "Tutored students in C++, Object-Oriented Programming, and core CS fundamentals.",
      "Simplified complex OOP concepts with hands-on coding examples and walkthroughs.",
      "Supported exam preparation and problem-solving sessions for multiple students.",
    ],
    tags: ["C++", "OOP", "Teaching", "CS Fundamentals"],
  },
];

// ─── Education ────────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    school: "Queens College, CUNY",
    degree: "B.S. Computer Science",
    period: "Spring 2025 – Fall 2026",
    gpa: "3.642",
    honor: "3x Dean's List",
    note: "Graduating Dec 2026 · Focus: AI/ML, Systems, Databases, Algorithms",
  },
  {
    school: "LaGuardia Community College, CUNY",
    degree: "A.S. Computer Science",
    period: "Fall 2023 – Fall 2024",
    gpa: "3.802",
    honor: "3x Dean's List",
    note: "Transfer to Queens College",
  },
  {
    school: "Youngstown State University",
    degree: "Early University Coursework",
    period: "Fall 2022 – Spring 2023",
    gpa: "4.00",
    honor: "2x President's List",
    note: "Completed foundational CS coursework",
  },
];

// ─── Leadership & Involvement ─────────────────────────────────────────────────

export const leadership: LeadershipItem[] = [
  {
    title: "Hackathon Participant",
    org: "Multiple Events",
    description:
      "Competed in multiple hackathons, including building Chautari — a culturally grounded mental-health awareness app — with a team of four.",
    tags: ["Team Collaboration", "Rapid Prototyping", "GenAI", "Full-Stack"],
  },
  {
    title: "President, Science & IT Club",
    org: "St. Lawrence College Nepal",
    description:
      "Led the Science & IT Club as President, organizing technical workshops, coding sessions, and STEM events for students at the high school level.",
    tags: ["Leadership", "Tech Education", "Event Planning", "STEM"],
  },
  {
    title: "Scout Troop Leader",
    org: "Sindhupalchok Troop, Nepal",
    description:
      "Served as troop leader for the Sindhupalchok Scout Troop in Nepal, leading community service projects, outdoor activities, and youth development initiatives.",
    tags: ["Scout Leadership", "Community Service", "Youth Development"],
  },
  {
    title: "Member, Nepal Student Association",
    org: "NSA — Youngstown State University",
    description:
      "Active member of the Nepal Student Association at YSU, supporting cultural events, peer networking, and community-building among Nepali students.",
    tags: ["Cultural Community", "Networking", "Student Life"],
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
  },
  {
    label: "AI / ML",
    skills: ["PyTorch", "scikit-learn", "pandas", "NumPy", "LightGBM"],
  },
  {
    label: "GenAI / RAG",
    skills: ["OpenAI API", "Gemini", "RAG", "Embeddings", "LlamaIndex", "LangGraph", "LangChain"],
  },
  {
    label: "Web / Backend",
    skills: ["React", "Next.js", "Flask", "Express", "FastAPI", "Tailwind CSS"],
  },
  {
    label: "Data / Tools",
    skills: ["PostgreSQL", "ChromaDB", "Docker", "Git", "Streamlit", "Vercel", "Supabase"],
  },
];

// ─── Contact Links ────────────────────────────────────────────────────────────

// Derived from siteConfig so there is exactly one source of truth per link —
// and so an env override reaches every place the value is rendered.
export const contactLinks: ContactLink[] = [
  { label: "GitHub", href: siteConfig.github, icon: "Github" },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: "Linkedin" },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: "Mail" },
  // Same PDF as the navbar/hero buttons (the NeuralSeek-free one).
  { label: "Resume", href: siteConfig.resume, icon: "FileText" },
];
