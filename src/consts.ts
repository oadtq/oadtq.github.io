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
  id: 'about' | 'projects' | 'writing' | 'reading-list';
  label: string;
  href: string;
}

export const NAV: NavItem[] = [
  { id: 'about', label: SITE.name, href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects/' },
  { id: 'writing', label: 'Writing', href: '/writing/' },
  { id: 'reading-list', label: 'Reading List', href: '/reading-list/' },
];

export interface Theme {
  id: string;
  label: string;
}

/** Order here is the order shown in the theme picker. */
export const THEMES: Theme[] = [
  { id: 'github-light', label: 'GitHub Light' },
  { id: 'github-dark', label: 'GitHub Dark' },
  { id: 'one-dark', label: 'One Dark' },
  { id: 'material', label: 'Material' },
  { id: 'gruvbox-dark', label: 'Gruvbox Dark' },
  { id: 'gruvbox-light', label: 'Gruvbox Light' },
  { id: 'nord', label: 'Nord' },
  { id: 'solarized-light', label: 'Solarized Light' },
];

export const DEFAULT_THEME = 'nord';
export const THEME_STORAGE_KEY = 'oadtq-theme';

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
      'One persistent, isolated computer per project, hosted on hardware you already own. Work keeps running after you disconnect, and any coding agent runs inside it unchanged.',
    url: 'https://github.com/ThePrimitiveWorks/micropc',
    repo: 'ThePrimitiveWorks/micropc',
  },
  {
    name: 'Pi Cloud Agent',
    description:
      'Open-source groundwork for agents that work in the cloud. Inspired by Pi\'s philosophy, rebuilt from first principles.',
    url: 'https://github.com/zen8labs/pi-cloud-agent',
    repo: 'zen8labs/pi-cloud-agent',
  },
];

export interface ReadingItem {
  title: string;
  url: string;
  /** Publisher or author shown on the right of the row. */
  source: string;
  /** Why it's worth your time — first person, one or two sentences. */
  comment: string;
}

export interface ReadingGroup {
  /** ISO date the batch was recommended. Groups render newest first. */
  date: string;
  items: ReadingItem[];
}

/** Recommended reads and videos, newest batch first. */
export const READING_LIST: ReadingGroup[] = [
  {
    date: '2026-07-30',
    items: [
      {
        title: 'On reasoning about a product before building it',
        url: 'https://x.com/thdxr/status/2068664103917240757',
        source: 'dax',
        comment:
          "A short teardown of a product idea that is probably dead on arrival. Worth learning as a way of thinking.",
      },
      {
        title: 'Harness Engineering',
        url: 'https://openai.com/index/harness-engineering/',
        source: 'OpenAI',
        comment:
          "The clearest writeup I've found on how the job changes once agents write most of the code. You stop yelling when an agent fails and start asking what was missing in the system that let it fail.",
      },
      {
        title: 'The Primitive Is the Product',
        url: 'https://www.amplifypartners.com/blog-posts/the-primitive-is-the-product',
        source: 'Amplify Partners',
        comment:
          'First-principles thinking pointed at product scope. The argument I keep returning to: find the smallest irreducible unit your users actually compose with, ship that, and let the workflows be theirs rather than yours.',
      },
      {
        title: 'Revisiting Clarity of Thought',
        url: 'https://investing101.substack.com/p/revisiting-clarity-of-thought',
        source: 'Investing 101',
        comment:
          "You can't decide well on a fuzzy understanding, and most bad calls are borrowed opinions nobody checked. Ask why until you hit something you know is true, then build your view back up from there.",
      },
      {
        title: 'Choose Good Quests',
        url: 'https://foundersfund.com/2023/06/choose-good-quests/',
        source: 'Founders Fund',
        comment:
          'On the importance of working on hard problems when you are well-resourced. Written for people who already made it, not for me, but I read it for fun.',
      },
    ],
  },
];
