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
  id: 'about' | 'projects' | 'writing' | 'reading-list' | 'ideas';
  label: string;
  href: string;
}

export const NAV: NavItem[] = [
  { id: 'about', label: SITE.name, href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects/' },
  { id: 'writing', label: 'Writing', href: '/writing/' },
  { id: 'reading-list', label: 'Reading List', href: '/reading-list/' },
  { id: 'ideas', label: 'Ideas', href: '/ideas/' },
];

export interface Theme {
  id: string;
  label: string;
}

/** Order here is the order shown in the theme picker. */
export const THEMES: Theme[] = [
  { id: 'paper', label: 'Paper' },
  { id: 'night-owl', label: 'Night Owl' },
  { id: 'omaha', label: 'Omaha' },
  { id: 'crt-mono', label: 'CRT Mono' },
  { id: 'github-light', label: 'GitHub Light' },
  { id: 'github-dark', label: 'GitHub Dark' },
  { id: 'one-dark', label: 'One Dark' },
  { id: 'material', label: 'Material' },
  { id: 'gruvbox-dark', label: 'Gruvbox Dark' },
  { id: 'gruvbox-light', label: 'Gruvbox Light' },
  { id: 'nord', label: 'Nord' },
  { id: 'solarized-light', label: 'Solarized Light' },
];

export const DEFAULT_THEME = 'paper';
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
    date: '2026-08-10',
    items: [
      {
        title: 'The People Who Will Thrive in the AI Age',
        url: 'https://www.theatlantic.com/ideas/2026/06/ai-open-ai-anthropic/687689/',
        source: 'The Atlantic',
        comment:
          'As AI commoditizes intelligence, the scarce advantage shifts from being capable of thinking to wanting to think, wanting to create, knowing what is worth pursuing, and being willing to endure the difficulty required to pursue it.',
      },
    ],
  },
  {
    date: '2026-07-30',
    items: [
      {
        title: 'Why Compute Might Get 10x More Expensive',
        url: 'https://www.dwarkesh.com/p/why-compute-might-get-10x-more-expensive',
        source: 'Dwarkesh Patel',
        comment:
          'A very good analysis of the AI market, worth reading to learn how he extrapolates the situation.',
      },
    ],
  },
  {
    date: '2026-07-29',
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

export interface Idea {
  name: string;
  pitch: string; // trusted inline HTML allowed (links)
}

export interface IdeaGroup {
  date: string; // YYYY-MM
  topics: { name: string; items: Idea[] }[];
}

export const IDEAS: IdeaGroup[] = [
  {
    date: '2026-05',
    topics: [
      {
        name: 'A personal AI chief of staff',
        items: [
          {
            name: 'Second brain',
            pitch:
              'An assistant you summon from any text field with one shortcut. It already sees your screen and knows your project folders (Lark threads, docs, meetings), so you never copy-paste context into a chat window again. The UX is the product: think <a href="https://atatapp.com/" target="_blank" rel="noopener">atat</a>, plus a memory of all your work.',
          },
          {
            name: 'Tone checker',
            pitch:
              'A rewrite layer between my draft and the send button, with one mode per job: announcement, discussion, product update, or turning messy bullets into a short essay. My own writing rules are built into each mode.',
          },
          {
            name: 'Mentor in a box',
            pitch:
              'A model given a legendary founder\'s biography, interviews and stories, so it reasons the way they did. I describe my problem; it answers with what they would ask and what they once did.',
          },
          {
            name: 'Voice clone for posts',
            pitch:
              'Feed it a writer\'s best posts and it learns their rhythm and hooks, then turns my rough notes into posts that sound natural instead of AI-written.',
          },
        ],
      },
      {
        name: 'When AI writes the code, humans read it',
        items: [
          {
            name: 'Local review',
            pitch:
              'A Devin-style review UI for uncommitted changes: run it on your working tree and get the diff grouped by intent, with summaries and warnings, before any PR exists.',
          },
          {
            name: 'Wiki with receipts',
            pitch:
              'A DeepWiki-style codebase wiki where every explanation sits next to the real code it describes. Read "how auth works" on the left and see the exact lines on the right.',
          },
          {
            name: 'Video bug report',
            pitch:
              'Record your screen, ask "why is this broken?", and an agent describes the bug, reproduces it, writes the fix prompt, and runs the tests to prove it\'s fixed.',
          },
          {
            name: 'Open-source agent box',
            pitch:
              'A Codex-style web UI for running coding agents on your own cheap VPS, with SSH and port forwarding so you can test the running app from your laptop. Like boxes.dev, but self-hosted.',
          },
        ],
      },
      {
        name: 'Learning and money',
        items: [
          {
            name: 'System design tutor',
            pitch:
              'An agent that plans a study schedule from a bank of real interview questions, teaches each concept from first principles with interactive diagrams, then quizzes and critiques your designs.',
          },
          {
            name: 'Personal index fund',
            pitch:
              'A self-hosted agent (think Hermes Agent) that checks my stock portfolio every day and rebalances to market-cap weights, so I get a passive ETF with no fund fees and no emotional trades.',
          },
        ],
      },
      {
        name: 'Software that edits itself',
        items: [
          {
            name: 'Every app ships with a coding agent',
            pitch:
              'Any app could include a sandboxed agent that changes its own source when a user asks: "make it darker", "add a CSV export", "fix this button". Good changes can be sent back upstream as a PR.',
          },
        ],
      },
    ],
  },
];
