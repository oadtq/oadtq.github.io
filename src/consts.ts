export const SITE = {
  name: 'oad.tq',
  realName: 'Bao',
  logotype: 'oad.tq',
  url: 'https://oadtq.github.io',
  tagline: 'Notes on agentic AI, inference optimization, and building startups.',
  socials: {
    github: 'https://github.com/oadtq',
    x: 'https://x.com/oadtq',
    linkedin: 'https://www.linkedin.com/in/bao-tq/',
    scholar: 'https://scholar.google.com/citations?user=-HS4pjsAAAAJ&hl',
  },
};

export interface NavItem {
  id: 'about' | 'projects' | 'writing';
  label: string;
  href: string;
}

export const NAV: NavItem[] = [
  { id: 'about', label: SITE.name, href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects/' },
  { id: 'writing', label: 'Writing', href: '/writing/' },
];

export interface Project {
  name: string;
  description: string;
  url: string;
  repo: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'MicroPC',
    description:
      'Turns machines you control into hosts for persistent, isolated project computers. Existing coding agent CLIs run unchanged inside SmolVM microVMs, long-running work survives in tmux, and SSH over Tailscale carries commands plus loopback development routes.',
    url: 'https://github.com/ThePrimitiveWorks/micropc',
    repo: 'ThePrimitiveWorks/micropc',
  },
  {
    name: 'Pi Cloud',
    description:
      'A minimal, task-agnostic core for coding agents that run headless in the cloud: trigger, sandbox, harness, secret broker, actuation, observability, and profiles. Verticals like PR review arrive as profiles rather than forks of the core.',
    url: 'https://github.com/zen8labs/pi-cloud/blob/main/VISION.md',
    repo: 'zen8labs/pi-cloud',
  },
];
