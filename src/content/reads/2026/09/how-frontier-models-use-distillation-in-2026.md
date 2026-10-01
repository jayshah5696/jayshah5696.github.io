---
title: "How Frontier Models Use Distillation in 2026"
url: "https://huggingface.co/blog/sergiopaniego/distillation-2026"
date: 2026-09-11
tags: ["distillation", "rl", "machine-learning"]
draft: false
---

Several frontier-model recipes use on-policy distillation to combine separate RL specialists: the student generates its own rollouts, and the teachers provide feedback on each token. The examples clarify how this differs from training a smaller student on a larger teacher, and how a model can also learn from a better-conditioned or earlier version of itself.
