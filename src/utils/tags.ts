// Shared tag categorization — single source of truth
// Used by TagList, RightSidebar, and tag pages

export const TAG_CATEGORIES = {
  ai: ['gen-ai', 'llm', 'rag', 'ai-agents', 'prompt'],
  dev: ['coding-tools', 'developer-tools', 'pi-coding-agent', 'typescript'],
  ml: ['ml', 'fine-tuning', 'nlp', 'analytics', 'statistics', 'qc', 'research', 'energy'],
  personal: ['spiritual', 'personal'],
} as const;

// Shape indicators for accessibility (distinguishable without color)
export const TAG_INDICATORS: Record<string, string> = {
  ai: '\u25CF',       // ● filled circle
  dev: '\u25C6',      // ◆ filled diamond
  ml: '\u25B2',       // ▲ filled triangle
  personal: '\u2726', // ✦ four-pointed star
  default: '',
};

export function getTagCategory(tag: string): 'ai' | 'dev' | 'ml' | 'personal' | 'default' {
  const t = tag.toLowerCase();
  if (TAG_CATEGORIES.ai.includes(t as any)) return 'ai';
  if (TAG_CATEGORIES.dev.includes(t as any)) return 'dev';
  if (TAG_CATEGORIES.ml.includes(t as any)) return 'ml';
  if (TAG_CATEGORIES.personal.includes(t as any)) return 'personal';
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
  const base = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono transition-colors';
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

export function getTagIndicator(tag: string): string {
  return TAG_INDICATORS[getTagCategory(tag)] || '';
}
