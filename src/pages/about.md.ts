import type { APIRoute } from 'astro';
import { SITE_TITLE, SITE_TAGLINE, SITE_URL, SITE_EMAIL, SOCIAL_LINKS } from '../consts';

export const GET: APIRoute = async () => {
  const content = `# About ${SITE_TITLE}

> ${SITE_TAGLINE}
> Canonical URL: ${SITE_URL}/about/
> Email: ${SITE_EMAIL}

## Background

I build machine-learning and language-model systems that have to work beyond the notebook.

At 6sense, I work on intent intelligence: foundational models with custom embeddings, model explainability, contextual knowledge graphs, and evaluation systems for large language model agents. The hard part is rarely choosing a better model. It is dealing with noisy signals, changing behavior, unclear definitions, and knowing whether a system is still trustworthy after it ships.

Before 6sense, I built retrieval-augmented generation systems, Model Context Protocol (MCP) agent platforms, anomaly detection products, and foundation-model operations at [Avathon](https://avathon.com). Some of that work supported more than 20 agent workflows and reduced model release cycles by 45%. Earlier, I worked on energy forecasting and failure prediction systems, including anomaly detection work that contributed to more than $500k in savings.

My graduate research at Texas A&M focused on predicting wind-energy failures. That experience gave me a lasting rule: a model that works in a notebook has made a promise, not proved anything.

I write about the systems I build, the assumptions behind them, and the parts that usually break. If something is on this site, it shipped or I learned enough from it to explain what happened.

## Outside the Terminal

Cricket comes first. Tea, never coffee. Yoga is the habit that survived a newborn's sleep schedule.

I care about Indic languages and culture, especially the gap between the languages people speak and the languages most AI systems understand. Gujarati Llama started as a personal project because useful language technology should not be limited to English-speaking users.

I also read outside machine learning: systems thinking, philosophy, and energy policy. Some of my best technical ideas began as questions from another field.

## Honors & Awards
- Winner at Ragathon by LlamaIndex (Feb 2024)
- Outstanding Master's of Science Student (Apr 2019)
- 2nd Runner-up at Texas Datathon by Citadel (Feb 2018)

## Patents
- [Calculating energy loss during an outage](https://patents.google.com/patent/US20230213560A1/en) — US20230213560A1, Filed Dec 30, 2021
- [Predicting energy production for energy generating assets](https://patents.google.com/patent/US20230214703A1/en) — US20230214703A1, Filed Dec 30, 2021
- [Dimension Measurement Using Image Processing](https://patents.google.com/patent/IN201721044402A/en) — IN 201721044402, Filed Dec 11, 2017

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
