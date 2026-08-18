export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: 'Pi Agent Extensions',
    description: 'A collection of extensions and themes for the Pi coding agent, including sessions, structured questions, handoffs, multi-agent workflows, and review tools.',
    url: 'https://github.com/jayshah5696/pi-agent-extensions',
    tags: ['AI AGENTS', 'TYPESCRIPT', 'DEVELOPER TOOLS'],
  },
  {
    title: 'Session Aggregator',
    description: 'A local tool for syncing, searching, and exporting AI coding sessions across development tools, with a terminal UI and semantic search.',
    url: 'https://github.com/jayshah5696/session-aggregator',
    tags: ['AI', 'TUI', 'PYTHON', 'SEMANTIC SEARCH'],
  },
  {
    title: 'Medha (मेधा) IDE',
    description: 'A local-first SQL IDE for flat files that combines DuckDB, FastAPI, Vite, and LangGraph for semantic query generation.',
    url: 'https://github.com/jayshah5696/medha',
    tags: ['SQL', 'LOCAL-FIRST', 'LANGGRAPH', 'DUCKDB'],
  },
  {
    title: 'Arka (अर्क)',
    description: 'A config-driven pipeline for generating and filtering fine-tuning data with multi-source ingestion, Evol-Instruct, MinHash and LSH deduplication, and SQLite checkpoints.',
    url: 'https://github.com/jayshah5696/arka',
    tags: ['LLM', 'DATA GENERATION', 'PYTHON', 'YAML'],
  },
  {
    title: 'Humanizer-RL',
    description: 'A text humanness scorer and reinforcement-learning pipeline that turns model evaluations into a reward function for Gemma fine-tuning.',
    url: 'https://github.com/jayshah5696/humanize-rl',
    tags: ['RL', 'FINE-TUNING', 'GEMMA', 'PYTHON'],
  },
  {
    title: 'Text Watermarking Lab',
    description: 'Experiments with keyed text watermarking, statistical detection, model behavior, calibration, and the effect of editing on the signal.',
    url: 'https://github.com/jayshah5696/text-watermarking-lab',
    tags: ['LLM', 'WATERMARKING', 'EVALUATION', 'PYTHON'],
  },
  {
    title: 'ER Metric & Model POC',
    description: 'An entity-resolution evaluation comparing dense embeddings with BM25 and Matryoshka Representation Learning for efficient retrieval at scale.',
    url: 'https://github.com/jayshah5696/entity-resolution-poc',
    tags: ['ML', 'ELASTICSEARCH', 'MRL', 'ENTITY RESOLUTION'],
  },
  {
    title: 'Pravāha: AI Search Engine',
    description: 'A local search assistant that combines web search, document retrieval, agent tools, and language models with specialized ranking and chunking.',
    url: 'https://github.com/jayshah5696/pravah',
    tags: ['LLM', 'SEARCH', 'RAG'],
  },
  {
    title: 'Gujarati Llama',
    description: 'A Llama 2 7B model fine-tuned on 60,000 bilingual English-Gujarati pairs for low-resource language use cases.',
    url: 'https://huggingface.co/jayshah5696/Gujarati-Llama-7b-Base',
    tags: ['LLM', 'FINE-TUNING', 'NLP'],
  },
  {
    title: 'StreamLens',
    description: 'A multi-model retrieval-augmented system for interacting with autonomous-vehicle video streams, built for the LlamaIndex RAG-a-thon.',
    url: 'https://github.com/rohrao/llamaindex_RAGathon',
    tags: ['RAG', 'LLAMAINDEX', 'VIDEO'],
  },
  {
    title: 'NeuroBuddy',
    description: 'A personalized chatbot for mental-health support and resources, built with Mistral AI and Whisper models during a hackathon.',
    url: 'https://devpost.com/software/neurobuddy',
    tags: ['LLM', 'HEALTHCARE', 'HACKATHON'],
  },
  {
    title: 'Power Curve Estimation',
    description: 'Statistical and machine-learning models for estimating wind-farm power curves and supporting energy-system optimization.',
    url: 'https://github.com/jayshah5696/Power_Curve_Estimation',
    tags: ['ML', 'ENERGY', 'RESEARCH'],
  },
  {
    title: 'Customer Relationship Prediction',
    description: 'Classification models for predicting churn, appetency, and up-selling behavior for a mobile network operator.',
    url: 'https://github.com/jayshah5696/Crm-Analytics',
    tags: ['ML', 'ANALYTICS'],
  },
  {
    title: 'Phase 1 Analysis',
    description: 'Multivariate quality-control analysis for an industrial forging process using principal components and control charts.',
    url: 'https://github.com/jayshah5696/Phase1_Analysis',
    tags: ['STATISTICS', 'QUALITY CONTROL', 'MANUFACTURING'],
  },
];
