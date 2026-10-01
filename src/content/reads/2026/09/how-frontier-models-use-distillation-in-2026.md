---
title: "How Frontier Models Use Distillation in 2026"
url: "https://huggingface.co/blog/sergiopaniego/distillation-2026"
date: 2026-09-11
tags: ["distillation", "llm", "rl"]
draft: false
---

I liked that this treats distillation as a way to merge specialized RL checkpoints, not only shrink a large model: the domain teachers are often the same size as the student, while the student generates rollouts and the teachers grade every token. I recommend opening it for that implementation mental model, especially when thinking about avoiding capability loss between sequential RL stages.

- The Qwen3 report puts this approach at roughly one-tenth the GPU hours of RL with better results. I would treat that as a claim to inspect rather than a comparable benchmark, since the supplied material does not include the comparison methodology.
