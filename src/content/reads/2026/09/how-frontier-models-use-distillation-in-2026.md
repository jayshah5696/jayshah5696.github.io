---
title: "How Frontier Models Use Distillation in 2026"
url: "https://huggingface.co/blog/sergiopaniego/distillation-2026"
date: 2026-09-11
tags: ["distillation", "rl", "llm"]
draft: false
---

I like this because it separates ordinary teacher-to-student compression from a newer pattern: same-size, domain-specialized RL checkpoints guide a student on its own rollouts. The contrast between token-level teacher feedback and RL's single reward for an attempt makes the appeal clear, though the model-report examples don't establish when distillation actually wins.
