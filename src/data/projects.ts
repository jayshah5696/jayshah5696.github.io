export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: 'Session Aggregator',
    description: 'A unified powerhouse for AI coding history. Sync, search, and export sessions from across all your AI development tools with a beautiful TUI and semantic search.',
    url: 'https://github.com/jayshah5696/session-aggregator',
    tags: ['AI', 'TUI', 'PYTHON', 'SEMANTIC-SEARCH'],
  },
  {
    title: 'Medha (\u092e\u0947\u0927\u093e) IDE',
    description: 'A local-first SQL IDE for flat files. Leverages DuckDB, FastAPI, and Vite, featuring LangGraph for semantic query generation.',
    url: 'https://github.com/jayshah5696/medha',
    tags: ['SQL', 'LOCAL-FIRST', 'LANGGRAPH', 'DUCKDB'],
  },
  {
    title: 'ER Metric & Model POC',
    description: 'High-scale entity resolution comparing dense embedding models against BM25 with Matryoshka Rep. Learning (MRL) for efficient ANN retrieval.',
    url: 'https://github.com/jayshah5696/entity-resolution-poc',
    tags: ['ML', 'ELASTICSEARCH', 'MRL', 'ENTITY-RESOLUTION'],
  },
  {
    title: 'Prav\u0101ha: AI-Powered Search Engine',
    description: 'LLM enhanced search relevance with specialized ranking and chunking strategies.',
    url: 'https://github.com/jayshah5696/pravah',
    tags: ['LLM', 'Search', 'RAG'],
  },
  {
    title: 'StreamLens',
    description: 'Winner at Rag-a-thon 2024. Multi-model RAG system for autonomous vehicle streams.',
    url: 'https://github.com/rohrao/llamaindex_RAGathon',
    tags: ['RAG', 'LlamaIndex', 'Award'],
  },
  {
    title: 'Gujarati Llama',
    description: 'Fine-tuned Llama-2 7B with 60k bilingual English-Gujarati pairs.',
    url: 'https://huggingface.co/jayshah5696/Gujarati-Llama-7b-Base',
    tags: ['LLM', 'Fine-tuning', 'NLP'],
  },
  {
    title: 'Pi Agent Extensions',
    description: 'Custom extensions for the Pi coding agent \u2014 handoff, ask-user, sessions, and more.',
    url: 'https://github.com/jayshah5696/pi-agent-extensions',
    tags: ['AI Agents', 'TypeScript', 'Developer Tools'],
  },
  {
    title: 'NeuroBuddy',
    description: 'Personalized chatbot for mental health support, built at Mistral Hackathon.',
    url: 'https://devpost.com/software/neurobuddy',
    tags: ['LLM', 'Healthcare', 'Hackathon'],
  },
  {
    title: 'Power Curve Estimation',
    description: 'Statistical estimation of power curves for wind energy farm optimization.',
    url: 'https://github.com/jayshah5696/Power_Curve_Estimation',
    tags: ['ML', 'Energy', 'Research'],
  },
  {
    title: 'Customer Relationship Prediction',
    description: 'Predicting churn, appetency, and up-selling with machine learning.',
    url: 'https://github.com/jayshah5696/Crm-Analytics',
    tags: ['ML', 'Analytics'],
  },
  {
    title: 'Phase 1 Analysis',
    description: 'Multivariate quality control analysis for industrial forging processes.',
    url: 'https://github.com/jayshah5696/Phase1_Analysis',
    tags: ['Statistics', 'QC', 'Manufacturing'],
  },
];
