type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
};

const yearsOfExperience = new Date().getFullYear() - 2020;
const presentation: Presentation = {
  mail: "felixkwekuco@gmail.com",
  title: "Hi, I’m Felix Coker 👋",
  profile: "/profile.webp",
  description:
    `Hey there!, I'm a *Software Engineer* with over *${yearsOfExperience} years* of web experience. I am currently working with *Go Lang, JavaScript, Python, and PHP*. 
    I enjoy working across both the *Frontend*, *Backend*, and *DevOps*, and I'm always up for learning new tools or frameworks that help me build better, faster, and more reliable software.
    Outside of work I enjoy learning *new Technologies* and building side projects.`,
  socials: [
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/felix-coker-9a7960123/",
    },
    {
      label: "Github",
      link: "https://github.com/coker-felix",
    },
  ],
};

export default presentation;
