// Technology categories shown in the Skills section.
// Order here is the order on screen: frontend, languages, backend, cms, database, tools.
export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend Development",
    note: "Component-driven interfaces, design systems and motion.",
    items: [
      "React.js",
      "Next.js",
      "Bootstrap",
      "jQuery",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    note: "Core languages used across every layer of the stack.",
    items: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "C", "C++", "PHP"],
  },
  {
    id: "backend",
    title: "Backend & Frameworks",
    note: "APIs, services and server-side architecture.",
    items: ["Node.js", "Flask", "FastAPI", "Django", "PHP", "Laravel", "RESTful APIs"],
  },
  {
    id: "cms",
    title: "CMS & WordPress",
    note: "Theme, plugin and page-builder customization.",
    items: [
      "WordPress",
      "WordPress Theme Customization",
      "WordPress Plugin Customization",
      "Elementor",
      "WPBakery",
      "Avada Theme",
      "Webstudio",
    ],
  },
  {
    id: "database",
    title: "Database & Storage",
    note: "Relational and document data modelling.",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    note: "Development environment, tooling and hosting platforms.",
    // Hosting platforms are listed apart from the local toolchain so the two
    // are never mistaken for the same kind of thing.
    groups: [
      {
        label: "Environment & IDEs",
        items: ["Linux", "PyCharm", "Jupyter Notebook", "Anaconda"],
      },
      {
        label: "Hosting & Cloud Platforms",
        items: ["GoDaddy", "AWS", "Netlify", "Vercel"],
      },
    ],
  },
];

export const capabilities = [
  "Responsive Web Design",
  "API Integration",
  "Reusable Components",
  "CMS Customization",
  "Full Stack Development",
  "Frontend Development",
  "REST API Development",
];

// Small looping label list used in the Hero's developer-style visual.
export const heroStack = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Python",
  "Node.js",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "WordPress",
  "Elementor",
  "Linux",
  "AWS",
  "Netlify",
];

// Short list used in the scrolling band under the hero.
export const marqueeItems = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
  "JavaScript",
  "TypeScript",
  "Python",
  "PHP",
  "Node.js",
  "Django",
  "FastAPI",
  "Laravel",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "WordPress",
  "Elementor",
  "Linux",
];
