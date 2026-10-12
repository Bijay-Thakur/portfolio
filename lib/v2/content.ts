import { aiProjects, contactLinks, education, experiences, hackathonProjects, inProgressProjects, leadership, productionProjects, siteConfig, skillGroups } from "@/data/portfolio";

export const portfolioContent = {
  site: siteConfig,
  projectGroups: [
    { title: "Production", projects: productionProjects },
    { title: "In Progress", projects: inProgressProjects },
    { title: "AI / ML", projects: aiProjects },
    { title: "Hackathons", projects: hackathonProjects },
  ],
  experiences,
  education,
  skillGroups,
  leadership,
  contactLinks,
};
