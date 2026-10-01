---
title: "Distillation in AI: From Model Compression to Reasoning Transfer"
url: "https://huggingface.co/blog/sergiopaniego/brief-history-of-distillation-in-ai"
date: 2026-09-11
tags: ["distillation", "llm", "rl"]
draft: false
---

I'd start at the on-policy section, where the student generates its own tokens and a stronger teacher scores them, so training targets mistakes the student actually makes. I like the arc from compression to behavior transfer because it makes clear how distillation's goal has changed; the claim that distillation, supervised fine-tuning, RL, and synthetic data are becoming the same pipeline needs sharper boundaries than this short history gives.
