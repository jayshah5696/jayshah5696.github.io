export const SITE_TITLE = 'Jay Shah';
export const SITE_TAGLINE = 'Senior Machine Learning Engineer | Production AI & Agent Systems';
export const SITE_DESCRIPTION =
  'Personal blog and research portfolio of Jay Shah — Senior Machine Learning Engineer focusing on AI applications, foundational models, LLM evaluations, and RAG systems.';
export const SITE_URL = 'https://jayshah.dev';
export const SITE_AUTHOR = 'Jay Shah';
export const SITE_LEGAL_NAME = 'Jay Shah AI Engineering & Research';
export const SITE_EMAIL = 'contact@jayshah.dev';

export const BRAND_ALTERNATE_NAMES = [
  'Jay Shah',
  'Jay J. Shah',
  'jayshah5696',
  'Jay Shah - AI Systems & Machine Learning',
  'jayshah.dev',
] as const;

export const ORGANIZATION_INFO = {
  name: 'Jay Shah',
  legalName: 'Jay Shah AI Engineering & Research',
  url: 'https://jayshah.dev',
  logo: 'https://jayshah.dev/assets/images/favicon/android-chrome-512x512.png',
  image: 'https://jayshah.dev/assets/images/profile.webp',
  email: 'contact@jayshah.dev',
  contactPoint: {
    contactType: 'technical support',
    email: 'contact@jayshah.dev',
    url: 'https://jayshah.dev/about/',
    availableLanguage: ['English', 'Gujarati', 'Hindi'],
  },
  address: {
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/jayshah5696',
  twitter: 'https://twitter.com/jayjshah',
  linkedin: 'https://linkedin.com/in/jayshah5696',
  huggingface: 'https://huggingface.co/jayshah5696',
  email: 'mailto:contact@jayshah.dev',
  cv: 'https://cv.jayshah.dev',
} as const;

export const SAME_AS_LINKS = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.twitter,
  'https://x.com/jayjshah',
  SOCIAL_LINKS.huggingface,
  SOCIAL_LINKS.cv,
  SITE_URL,
] as const;

export const AGENT_RESOURCES = {
  llmsTxt: '/llms.txt',
  llmsFullTxt: '/llms-full.txt',
  agentInstructions: '/.well-known/agent-instructions.md',
  openApiJson: '/openapi.json',
  openApiYaml: '/openapi.yaml',
  sitemap: '/sitemap-index.xml',
  toolsJson: '/api/tools.json',
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'About', href: '/about/', icon: 'about' },
  { label: 'Projects', href: '/projects/', icon: 'projects' },
  { label: 'Reads', href: '/reads/', icon: 'reads' },
  { label: 'Links', href: '/links/', icon: 'links' },
  { label: 'Archives', href: '/archives/', icon: 'archive' },
  { label: 'Resume', href: 'https://cv.jayshah.dev', icon: 'resume' },
] as const;

/**
 * Dynamic rotating phrases for the About page headline typewriter animation.
 * Edit, reorder, or add phrases here to update the rotating titles on /about/.
 */
export const ABOUT_HEADLINE_PREFIX = "Hi, I'm Jay Shah,";

export const ABOUT_ROTATING_PHRASES = [
  'an ML engineer.',
  'an applied AI scientist.',
  'a data scientist.',
  'an AI researcher.',
  'an AI builder.',
  'an agent builder.',
  'a model skeptic.',
  'a systems thinker.',
  'a language tools maker.',
  'a dad.',
  'a tea aficionado.',
  'a cricket fanboy.',
  'a yogi.',
  'a learner.',
  'a reader.',
  'a builder.',
] as const;




