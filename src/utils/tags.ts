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

// Shape indicators for accessibility (distinguishable without color)
export const TAG_INDICATORS: Record<string, string> = {
  ai: '\u25CF',       // ● filled circle
  dev: '\u25C6',      // ◆ filled diamond
  ml: '\u25B2',       // ▲ filled triangle
  personal: '\u2726', // ✦ four-pointed star
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
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-colors';
  const cat = getTagCategory(tag);
  switch (cat) {
    case 'ai':
      return `${base} bg-terra/10 dark:bg-terra-light/10 text-terra dark:text-terra-light hover:bg-terra/20 dark:hover:bg-terra-light/20`;
    case 'dev':
      return `${base} bg-mor/10 dark:bg-mor-light/10 text-mor dark:text-mor-light hover:bg-mor/20 dark:hover:bg-mor-light/20`;
    case 'ml':
      return `${base} bg-gold/10 dark:bg-gold-light/10 text-gold-dark dark:text-gold-light hover:bg-gold/20 dark:hover:bg-gold-light/20`;
    case 'personal':
      return `${base} bg-kumkum/10 dark:bg-kumkum-light/10 text-kumkum dark:text-kumkum-light hover:bg-kumkum/20 dark:hover:bg-kumkum-light/20`;
    default:
      return `${base} bg-cream-100 dark:bg-night-800 text-ink-light dark:text-silk-muted hover:bg-terra/10 hover:text-terra dark:hover:bg-terra-light/10 dark:hover:text-terra-light`;
  }
}

export function getTagMicroPillClasses(tag: string): string {
  const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono tracking-tight transition-colors';
  const cat = getTagCategory(tag);
  switch (cat) {
    case 'ai':
      return `${base} bg-terra/10 dark:bg-terra-light/10 text-terra dark:text-terra-light hover:bg-terra/20 dark:hover:bg-terra-light/20 border border-terra/20 dark:border-terra-light/20`;
    case 'dev':
      return `${base} bg-mor/10 dark:bg-mor-light/10 text-mor dark:text-mor-light hover:bg-mor/20 dark:hover:bg-mor-light/20 border border-mor/20 dark:border-mor-light/20`;
    case 'ml':
      return `${base} bg-gold/10 dark:bg-gold-light/10 text-gold-dark dark:text-gold-light hover:bg-gold/20 dark:hover:bg-gold-light/20 border border-gold/20 dark:border-gold-light/20`;
    case 'personal':
      return `${base} bg-kumkum/10 dark:bg-kumkum-light/10 text-kumkum dark:text-kumkum-light hover:bg-kumkum/20 dark:hover:bg-kumkum-light/20 border border-kumkum/20 dark:border-kumkum-light/20`;
    default:
      return `${base} bg-cream-200/60 dark:bg-night-800/80 text-ink-light dark:text-silk-muted hover:text-terra dark:hover:text-terra-light border border-cream-300/40 dark:border-night-700/60`;
  }
}

export function getTagIndicator(tag: string): string {
  return TAG_INDICATORS[getTagCategory(tag)] || '';
}
