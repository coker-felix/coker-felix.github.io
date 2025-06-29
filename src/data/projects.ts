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
  ],
  gigs: [
    // {
    //   title: "E-commerce Platform",
    //   techs: ["React", "Node.js", "PostgreSQL", "Stripe"],
    //   websiteLink: "https://example-ecommerce.com",
    //   description: "Built a full-stack e-commerce platform with payment processing and inventory management.",
    //   client: "Retail Client",
    // },
  ],
};

export default projects;
