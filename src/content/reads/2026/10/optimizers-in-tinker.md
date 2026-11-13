---
title: "Optimizers in Tinker"
url: "https://tinker-docs.thinkingmachines.ai/tinker/optimizers/"
date: 2026-10-15
tags: ["fine-tuning", "machine-learning", "rl"]
draft: false
---

I'm cautious about generalizing the Dimuon recommendation, but the page gives a clear reason to test it: in Tinker's SFT runs, it reached lower loss in fewer steps at similar step time, while RL efficiency was similar to AdamW. The roughly 15× learning-rate ratio for SFT versus 60× for RL makes clear that switching optimizers also means retuning; I'd treat those ratios as starting points and validate on my own evaluations.
