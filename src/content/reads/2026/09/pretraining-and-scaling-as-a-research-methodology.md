---
title: "Pretraining and scaling as a research methodology"
url: "https://jiaxuanzou0714.github.io/en/blog/2026/pretrain-scaling-methodology-scientific-perspective/"
date: 2026-09-07
tags: ["llm", "machine-learning", "research"]
draft: false
---

I liked the concrete transfer result: under the same post-training setup, Dyna-2's average normalized robot-task score rises from 20% with 1,000 hours of human video to 53% with one million hours. That makes this worth opening if you design training systems, because the key question is whether an architecture and objective let more data improve unseen tasks, not merely whether the pretraining loss falls.

- The piece also uses GEN-1.5 to make pretraining's payoff measurable: a single demonstration enables in-context task adaptation, while a few gradient updates enable further adaptation. I would carry that evaluation lens into experiments by tracking how much new data, parameter updating, and compute each downstream task requires.
