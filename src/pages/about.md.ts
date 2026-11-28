import type { APIRoute } from 'astro';
import { SITE_TITLE, SITE_TAGLINE, SITE_URL, SITE_EMAIL, SOCIAL_LINKS } from '../consts';

export const GET: APIRoute = async () => {
  const content = `# About ${SITE_TITLE}

> ${SITE_TAGLINE}
> Canonical URL: ${SITE_URL}/about/
> Email: ${SITE_EMAIL}

## Background

I'm a machine learning engineer in San Francisco. I work across classical ML, retrieval, and language models: training custom embeddings, building agent evaluations, and debugging what breaks once real data hits a model.

My path into ML started with mechanical engineering in Gujarat, followed by graduate research at Texas A&M under Dr. Yu Ding, where I worked on wind-turbine failure prediction and minored in applied statistics. From 2019 to 2026 I was at [Avathon](https://avathon.com), building forecasting, anomaly detection, MLOps, and later RAG and MCP agent systems for energy and industrial teams. Now I'm a Senior Machine Learning Engineer at [6sense](https://6sense.com). I lead Forward-Deployed Engineering (FDE) work for predictive ML, working with customers on model health and custom workflows and bringing their feedback into product decisions.

On the side, I build small tools and run my own experiments instead of taking benchmarks at face value. Lately that has meant extensions for the Pi coding agent, experiments on dense retrieval and text watermarking, and [Gujarati Llama](https://huggingface.co/jayshah5696/Gujarati-Llama-7b-Base), a Llama 2 model I fine-tuned on 60,000 English-Gujarati pairs because Indic languages are still poorly served by most AI tools. This site is where I write up those projects and what actually happened.

## Outside work

Outside work, I follow cricket closely and drink tea, never coffee. I have kept up a yoga and meditation practice for years, starting with Sadhguru's work, and it is still the one habit that survived a newborn's sleep schedule. I also spend a lot of time reading outside ML, mostly around systems thinking, philosophy, and energy policy.

## Experience
- **Senior Machine Learning Engineer at 6sense** (2026 - Present): I lead FDE work for predictive ML at 6sense. I work with customers on model health and custom workflows and bring their feedback into product decisions. I also work on model explainability, account embeddings, knowledge-graph prototyping, and AI agent evaluations.
- **Data Scientist III at Avathon** (2019 - 2026): Built forecasting, anomaly detection, and MLOps systems for energy and industrial customers. Led a foundation-model MLOps platform that cut release cycles by 45%, built an MCP agent platform powering 20+ workflows, and shipped solar-storage anomaly detection and Bayesian alert ranking that saved over $500k and cut false positives by 25%.
- **Graduate Research Assistant at Texas A&M University** (2017 - 2019): Researched wind-turbine failure prediction and power production forecasting under Dr. Yu Ding while completing an M.S. in Industrial and Systems Engineering with a minor in Applied Statistics.

## Honors & Awards
- Winner, Ragathon by LlamaIndex (Feb 2024): StreamLens, a multi-model RAG system for autonomous vehicle video streams.
- Outstanding Master of Science Student (Apr 2019): Department of Industrial and Systems Engineering, Texas A&M University.
- 2nd Runner-up, Texas Datathon by Citadel (Feb 2018)

## Patents
- [Calculating energy loss during an outage](https://patents.google.com/patent/US12066472B2/en) (US12066472B2, Granted Aug 20, 2024; Filed Dec 30, 2021)
- [Predicting energy production for energy generating assets](https://patents.google.com/patent/US20230214703A1/en) (US20230214703A1, Published Application, Filed Dec 30, 2021)
- [Dimension Measurement Using Image Processing and Separation of Defective Products](https://patents.google.com/patent/IN201721044402A/en) (IN 201721044402, Filed Dec 11, 2017)

## Profiles & Links
- GitHub: ${SOCIAL_LINKS.github}
- LinkedIn: ${SOCIAL_LINKS.linkedin}
- Twitter / X: ${SOCIAL_LINKS.twitter}
- Hugging Face: ${SOCIAL_LINKS.huggingface}
- CV / Resume: ${SOCIAL_LINKS.cv}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
