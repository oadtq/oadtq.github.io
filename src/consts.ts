export const SITE = {
  name: 'oad.tq',
  realName: 'Bao',
  logotype: 'oad.tq',
  url: 'https://oadtq.dev',
  tagline: 'Notes on agentic AI, inference optimization, and building startups.',
  email: 'contact.baotq@gmail.com',
  socials: {
    github: 'https://github.com/oadtq',
    linkedin: 'https://www.linkedin.com/in/bao-tq/',
    scholar: 'https://scholar.google.com/citations?user=-HS4pjsAAAAJ&hl',
  },
};

export interface Product {
  name: string;
  description: string;
  url: string;
  stats?: string;
}

export const PRODUCTS: Product[] = [
  {
    name: 'Warp',
    description: 'An agentic development environment, born out of the terminal.',
    url: 'https://github.com/oadtq/warp',
    stats: 'Rust · fork of warpdotdev/warp',
  },
];
