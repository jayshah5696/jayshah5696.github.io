export interface Project {
  title: string;
  script?: string;
  summary: string;
  description: string;
  url: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: 'Pi Agent Extensions',
    summary: 'Extensions, handoffs, and review tools for the Pi coding agent.',
    description: 'A collection of extensions and themes for the Pi coding agent, including sessions, structured questions, handoffs, multi-agent workflows, and review tools.',
    url: 'https://github.com/jayshah5696/pi-agent-extensions',
    tags: ['AI AGENTS', 'TYPESCRIPT', 'DEVELOPER TOOLS'],
  },
  {
    title: 'Sangam (संगम)',
    script: 'संगम',
    summary: 'Self-hosted document workspace shared by humans and AI agents.',
    description: 'A single-user, self-hosted document workspace where a human and identified AI agents work with ordinary files through the same revision-aware API.',
    url: 'https://github.com/jayshah5696/sangam',
    tags: ['AI AGENTS', 'LOCAL-FIRST', 'FASTAPI', 'PYTHON'],
  },
  {
    title: 'Session Aggregator',
    summary: 'Local TUI and semantic search across AI coding sessions.',
    description: 'A local tool for syncing, searching, and exporting AI coding sessions across development tools, with a terminal UI and semantic search.',
    url: 'https://github.com/jayshah5696/session-aggregator',
    tags: ['AI', 'TUI', 'PYTHON', 'SEMANTIC SEARCH'],
  },
  {
    title: 'Medha (मेधा) IDE',
    script: 'मेधा',
    summary: 'Local-first SQL IDE for flat files with semantic query generation.',
    description: 'A local-first SQL IDE for flat files that combines DuckDB, FastAPI, Vite, and LangGraph for semantic query generation.',
    url: 'https://github.com/jayshah5696/medha',
    tags: ['SQL', 'LOCAL-FIRST', 'LANGGRAPH', 'DUCKDB'],
  },
  {
    title: 'Arka (अर्क)',
    script: 'अर्क',
    summary: 'Config-driven synthetic data pipeline with deduplication and checkpoints.',
    description: 'A config-driven pipeline for generating and filtering fine-tuning data with multi-source ingestion, Evol-Instruct, MinHash and LSH deduplication, and SQLite checkpoints.',
    url: 'https://github.com/jayshah5696/arka',
    tags: ['LLM', 'DATA GENERATION', 'PYTHON', 'YAML'],
  },
  {
    title: 'Humanizer-RL',
    summary: 'Humanness scorer and RL reward pipeline for Gemma fine-tuning.',
    description: 'A text humanness scorer and reinforcement-learning pipeline that turns model evaluations into a reward function for Gemma fine-tuning.',
    url: 'https://github.com/jayshah5696/humanize-rl',
    tags: ['RL', 'FINE-TUNING', 'GEMMA', 'PYTHON'],
  },
  {
    title: 'Text Watermarking Lab',
    summary: 'Keyed text watermarking, statistical detection, and edit-resilience experiments.',
    description: 'Experiments with keyed text watermarking, statistical detection, model behavior, calibration, and the effect of editing on the signal.',
    url: 'https://github.com/jayshah5696/text-watermarking-lab',
    tags: ['LLM', 'WATERMARKING', 'EVALUATION', 'PYTHON'],
  },
  {
    title: 'ER Metric & Model POC',
    summary: 'Dense embeddings vs. BM25 and MRL for entity resolution.',
    description: 'An entity-resolution evaluation comparing dense embeddings with BM25 and Matryoshka Representation Learning for efficient retrieval at scale.',
    url: 'https://github.com/jayshah5696/entity-resolution-poc',
    tags: ['ML', 'ELASTICSEARCH', 'MRL', 'ENTITY RESOLUTION'],
  },
  {
    title: 'Pravāha: AI Search Engine',
    script: 'प्रवाह',
    summary: 'Local search assistant combining web, document retrieval, and ranking.',
    description: 'A local search assistant that combines web search, document retrieval, agent tools, and language models with specialized ranking and chunking.',
    url: 'https://github.com/jayshah5696/pravah',
    tags: ['LLM', 'SEARCH', 'RAG'],
  },
  {
    title: 'Gujarati Llama',
    script: 'ગુજરાતી',
    summary: 'Llama 2 7B fine-tuned on 60k English-Gujarati pairs.',
    description: 'A Llama 2 7B model fine-tuned on 60,000 bilingual English-Gujarati pairs for low-resource language use cases.',
    url: 'https://huggingface.co/jayshah5696/Gujarati-Llama-7b-Base',
    tags: ['LLM', 'FINE-TUNING', 'NLP'],
  },
  {
    title: 'StreamLens',
    summary: 'Multi-model RAG over autonomous vehicle video streams.',
    description: 'A multi-model retrieval-augmented system for interacting with autonomous-vehicle video streams, built for the LlamaIndex RAG-a-thon.',
    url: 'https://github.com/rohrao/llamaindex_RAGathon',
    tags: ['RAG', 'LLAMAINDEX', 'VIDEO'],
  },
  {
    title: 'NeuroBuddy',
    summary: 'Mental-health support assistant built with Mistral AI and Whisper.',
    description: 'A personalized chatbot for mental-health support and resources, built with Mistral AI and Whisper models during a hackathon.',
    url: 'https://devpost.com/software/neurobuddy',
    tags: ['LLM', 'HEALTHCARE', 'HACKATHON'],
  },
  {
    title: 'Power Curve Estimation',
    summary: 'Statistical and ML models for wind-farm power curve estimation.',
    description: 'Statistical and machine-learning models for estimating wind-farm power curves and supporting energy-system optimization.',
    url: 'https://github.com/jayshah5696/Power_Curve_Estimation',
    tags: ['ML', 'ENERGY', 'RESEARCH'],
  },
  {
    title: 'Customer Relationship Prediction',
    summary: 'Churn, appetency, and up-selling classifiers for telecom analytics.',
    description: 'Classification models for predicting churn, appetency, and up-selling behavior for a mobile network operator.',
    url: 'https://github.com/jayshah5696/Crm-Analytics',
    tags: ['ML', 'ANALYTICS'],
  },
  {
    title: 'Phase 1 Analysis',
    summary: 'Multivariate PCA quality control for industrial forging.',
    description: 'Multivariate quality-control analysis for an industrial forging process using principal components and control charts.',
    url: 'https://github.com/jayshah5696/Phase1_Analysis',
    tags: ['STATISTICS', 'QUALITY CONTROL', 'MANUFACTURING'],
  },
];
