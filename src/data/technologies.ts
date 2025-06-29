type Technology = {
  name: string;
  category: string;
};

type TechnologySection = {
  title: string;
  description: string;
  technologies: Technology[];
};

const usedTechnologies: TechnologySection = {
  title: "Technologies & Tools",
  description: "Here are the key technologies and tools I actively use in my day-to-day development work.",
  technologies: [
    { name: "Go Lang", category: "Programming Language" },
    { name: "JavaScript (Node.js | Express.js | TypeScript)", category: "Programming Language" },
    { name: "Python (Django | Flask)", category: "Programming Language" },
    { name: "PHP (Laravel)", category: "Programming Language" },
    { name: "React ", category: "Frontend Framework" },
    { name: "Astro", category: "Frontend Framework" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "Docker (Docker Swarm | Docker Compose)", category: "DevOps" },
    { name: "Terraform (AWS | GCP | DigitalOcean)", category: "DevOps" },
    { name: "Ansible", category: "DevOps" },
    { name: "Github Actions", category: "DevOps" },
    { name: "AWS | GCP | DigitalOcean | Hostinger", category: "Cloud Platform" },
  ]
};

const skillsOfInterest: TechnologySection = {
  title: "Learning & Exploring",
  description: "Here are the technologies and skills I'm currently learning or interested in exploring.",
  technologies: [
    { name: "Rust", category: "Programming Language" },
    { name: "Dart", category: "Programming Language" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "Machine Learning", category: "Emerging Tech" },
    { name: "Blockchain", category: "Emerging Tech" },
    { name: "Web3", category: "Emerging Tech" },
  ]
};

export { usedTechnologies, skillsOfInterest }; 