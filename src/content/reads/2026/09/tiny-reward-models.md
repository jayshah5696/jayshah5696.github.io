---
title: "Tiny Reward Models"
url: "https://arxiv.org/html/2507.09973v1"
date: 2026-09-20
tags: ["rl", "machine-learning", "llm"]
draft: false
---

I like that this treats reward modeling as a recurring inference-cost problem, not just a one-time RLHF expense: TinyRM uses bidirectional 150M- and 400M-parameter models with FLAN-style cloze prompts, DoRA, and layer freezing, and reports rivaling models over 175 times larger on reasoning and safety tasks. The result is domain-specific, with conversational preference modeling still a limitation, and the paper leaves ablations to future work, so it doesn't establish which design choice is doing the work.
