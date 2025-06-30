export type PersonalProject = {
  title: string;
  techs: string[];
  githubLink: string;
  liveLink?: string;
  description?: string;
  isComingSoon?: boolean;
};

export type Gig = {
  title: string;
  techs: string[];
  websiteLink?: string;
  description?: string;
  client?: string;
  isComingSoon?: boolean;
};

export type Projects = {
  personal: PersonalProject[];
  gigs: Gig[];
};

const projects: Projects = {
  personal: [
    {
      title: "Portfolio Website",
      techs: ["Astro", "TypeScript", "Tailwind CSS"],
      githubLink: "https://coker-felix.github.io",
      description: "A clean and modern portfolio built with Astro.",
      isComingSoon: false,
    },
    {
      title: "Simple Key Value Store",
      techs: ["Go"],
      githubLink: "https://github.com/coker-felix/simple-key-value-store",
      description: "A simple key value store built with Go.",
      isComingSoon: false,
    },
    {
      title: "A Simple Web Server From Scratch",
      techs: ["Node.js"],
      githubLink: "#",
      description: "A simple web server built with Node.js. Network protocol HTTP in detail Concurrency WebSocket",
      isComingSoon: true,
    },
    {
      title: "A Mini Relational Database",
      techs: ["Go"],
      githubLink: "#",
      description: "A mini relational database built with Go.",
      isComingSoon: true,
    },
  ],
  gigs: [
    {
      title: "An Event Management and Ticketing System",
      techs: ["Node.js", "React", "Zod", "Tailwind CSS", "TypeScript", "PostgreSQL", "Prisma","Paystack"],
      websiteLink: "https://jambotickets.com",
      description: "Built a full-stack event management and ticketing system with payment processing and inventory management.",
      client: "A Tech Startup",
    },
  ],
};

export default projects;
