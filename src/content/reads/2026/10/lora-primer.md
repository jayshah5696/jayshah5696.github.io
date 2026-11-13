---
title: "LoRA Primer"
url: "https://tinker-docs.thinkingmachines.ai/tinker/lora-primer/"
date: 2026-10-15
tags: ["fine-tuning", "llm", "rl"]
draft: false
---

I'd start with the learning-rate section: LoRA typically needs about 10x the full fine-tuning rate, so carrying over the old rate can make it look worse than it is. I like the distinction between RL, where the primer says small ranks match full fine-tuning, and large supervised datasets, where LoRA can lose ground; I'd treat the token-count rule as a rough sizing heuristic, not a guarantee.
