export const SITE_TITLE = 'Jay Shah';
export const SITE_TAGLINE = 'Personal Website';
export const SITE_DESCRIPTION =
  'Personal blog about AI, Machine Learning, LLMs, RAG, and data science.';
export const SITE_URL = 'https://jayshah5696.github.io';

export const SOCIAL_LINKS = {
  github: 'https://github.com/jayshah5696',
  twitter: 'https://twitter.com/jayjshah',
  linkedin: 'https://linkedin.com/in/jayshah5696',
  huggingface: 'https://huggingface.co/jayshah5696',
  email: 'mailto:jayshah5696@gmail.com',
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Tags', href: '/tags', icon: 'tags' },
  { label: 'Archives', href: '/archives', icon: 'archive' },
  { label: 'About', href: '/about', icon: 'about' },
  { label: 'Projects', href: '/projects', icon: 'projects' },
] as const;
