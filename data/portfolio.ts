export const siteConfig = {
  name: "Bijay Thakur",
  role: "AI/ML Engineer in the making",
  subtitle:
    "I'm Bijay Thakur, a Computer Science student at Queens College focused on AI/ML engineering, GenAI systems, RAG, applied ML, and full-stack AI products.",
  location: "New York, USA",
  email: "starbijay143@gmail.com",
  github: "https://github.com/Bijay-Thakur",
  linkedin: "https://linkedin.com/in/bijay-thakur-6b7793258/",
  resume: "/resumes/AI_ML_Engineer_resume.pdf",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const credibilityChips = [
  "AI Agent Builder Intern",
  "Queens College CS",
  "RAG + GenAI + Applied ML",
];

export const homeCredibilityCards = [
  {
    icon: "Zap",
    title: "What I'm building",
    text: "Production-minded AI/ML apps that solve real problems.",
  },
  {
    icon: "BookOpen",
    title: "Where I'm growing",
    text: "ML fundamentals, systems thinking, and rigorous evaluation.",
  },
  {
    icon: "Star",
    title: "What I care about",
    text: "Useful products, clean engineering, and real impact.",
  },
];

export const storySteps = [
  {
    step: "01",
    title: "Learning",
    text: "Built strong foundations in Computer Science, ML, and real-world problem solving.",
  },
  {
    step: "02",
    title: "Building",
    text: "Turn ideas into working products through projects, internships, and continuous learning.",
  },
  {
    step: "03",
    title: "Impact",
    text: "Aim to create practical systems that help people and solve real problems.",
  },
];


export type Experience = {
  role: string;
  company: string;
  date: string;
  bullets: string[];
  impact: string[];
};

export const experiences: Experience[] = [
  {
    role: "AI Agent Builder Intern",
    company: "NeuralSeek",
    date: "May 2024 – Aug 2024",
    bullets: [
      "Built custom AI agents using LangChain, RAG, and tool-use.",
      "Integrated vector databases and APIs for real-time actions.",
      "Evaluated and iterated on agent performance and safety.",
    ],
    impact: [
      "Improved response accuracy by 20%.",
      "Reduced task completion time by 25%.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "WebX Nepal",
    date: "Jan 2024 – Apr 2024",
    bullets: [
      "Developed responsive web applications with React and Next.js.",
      "Built and integrated RESTful APIs with Node.js and MongoDB.",
      "Collaborated with designers to ship production-ready features.",
    ],
    impact: [
      "Delivered 3+ features used by 2K+ users.",
      "Improved page performance by 30%.",
    ],
  },
  {
    role: "Graphic Designer Intern",
    company: "Office of Assembly Member Steven Raga",
    date: "Jun 2023 – Aug 2023",
    bullets: [
      "Designed social media content, flyers, and campaign materials.",
      "Created branded visuals aligned with community initiatives.",
      "Supported communication for outreach and events.",
    ],
    impact: [
      "Increased engagement across channels.",
      "Delivered 50+ designs for key campaigns.",
    ],
  },
  {
    role: "Academic Tutor",
    company: "Queens College",
    date: "Jan 2023 – May 2023",
    bullets: [
      "Tutored students in Data Structures, Python, and Discrete Math.",
      "Simplified complex concepts with hands-on examples.",
      "Hosted problem-solving sessions and exam prep.",
    ],
    impact: [
      "Helped 20+ students improve grades.",
      "Received positive feedback from students and faculty.",
    ],
  },
];

export const workStyles = [
  {
    icon: "Hammer",
    title: "Builder mindset",
    text: "Ship working products, not just demos.",
  },
  {
    icon: "Zap",
    title: "Rapid prototyping",
    text: "Move fast, iterate quickly, learn constantly.",
  },
  {
    icon: "Users",
    title: "User-focused thinking",
    text: "Build for people, not just for tech.",
  },
  {
    icon: "BookOpen",
    title: "Continuous learning",
    text: "Always growing, always improving.",
  },
];

export const education = {
  school: "Queens College",
  degree: "B.S. Computer Science",
  expected: "Expected Dec 2026",
  focus: ["AI/ML", "Systems", "Databases", "Algorithms", "Software Engineering"],
};

export const whatShapedMe = ["Curiosity", "Discipline", "Systems Thinking", "Impact"];

export const milestones = [
  "Queens College CS",
  "NeuralSeek",
  "WebX Nepal",
  "Hackathons",
];

export const lookingFor = [
  "Internships",
  "AI/ML Roles",
  "SWE Opportunities",
  "Collaborations",
];
