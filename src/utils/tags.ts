// Shared tag categorization — single source of truth
// Used by TagList, RightSidebar, and tag pages

export const TAG_CATEGORIES = {
  ai: [
    'gen-ai',
    'llm',
    'rag',
    'ai-agents',
    'prompt',
    'ai-safety',
    'watermarking',
    'entity-resolution',
    'entity resolution',
  ],
  dev: [
    'coding-tools',
    'developer-tools',
    'pi-coding-agent',
    'typescript',
    'systems',
    'software-engineering',
    'infrastructure',
    'openclaw',
  ],
  ml: [
    'ml',
    'machine-learning',
    'machine learning',
    'search',
    'embedding-models',
    'embedding models',
    'bm25',
    'matryoshka-representation-learning',
    'matryoshka representation learning',
    'fine-tuning',
    'nlp',
    'analytics',
    'statistics',
    'qc',
    'research',
    'energy',
    'rl',
    'distillation',
    'evals',
    'memory',
    'production',
    'hackathon',
  ],
  personal: [
    'spiritual',
    'personal',
    'career',
  ],
} as const;

// Category indicators — neutralized in the Scandinavian pass (labels carry the meaning)
export const TAG_INDICATORS: Record<string, string> = {
  ai: '',
  dev: '',
  ml: '',
  personal: '',
  default: '',
};

export function normalizeTagSlug(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, '-');
}

export function getTagCategory(tag: string): 'ai' | 'dev' | 'ml' | 'personal' | 'default' {
  const raw = tag.toLowerCase().trim();
  const slug = normalizeTagSlug(tag);

  if (TAG_CATEGORIES.ai.includes(raw as any) || TAG_CATEGORIES.ai.includes(slug as any)) return 'ai';
  if (TAG_CATEGORIES.dev.includes(raw as any) || TAG_CATEGORIES.dev.includes(slug as any)) return 'dev';
  if (TAG_CATEGORIES.ml.includes(raw as any) || TAG_CATEGORIES.ml.includes(slug as any)) return 'ml';
  if (TAG_CATEGORIES.personal.includes(raw as any) || TAG_CATEGORIES.personal.includes(slug as any)) return 'personal';
  return 'default';
}

export function getTagColorClass(tag: string): string {
  const cat = getTagCategory(tag);
  switch (cat) {
    case 'ai': return 'tag-ai';
    case 'dev': return 'tag-dev';
    case 'ml': return 'tag-ml';
    case 'personal': return 'tag-personal';
    default: return 'tag';
  }
}

export function getTagPillClasses(tag: string): string {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors';
  return `${base} bg-cream-100 dark:bg-night-800 text-ink-light dark:text-silk-muted hover:bg-black/8 dark:hover:bg-white/12 hover:text-black dark:hover:text-white`;
}

export function getTagMicroPillClasses(tag: string): string {
  const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] transition-colors';
  return `${base} bg-cream-100 dark:bg-night-800 text-ink-muted dark:text-silk-muted border border-transparent hover:text-black dark:hover:text-white`;
}

export function getTagIndicator(tag: string): string {
  return TAG_INDICATORS[getTagCategory(tag)] || '';
}
