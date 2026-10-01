---
title: "Training Search Agents with GRPO"
url: "https://jasperlu.com/blog/training-search-agents-grpo/"
date: 2026-09-25
tags: ["rl", "ai-agents", "search"]
draft: false
---

I'm wary of treating runs with 256 training queries and 32 evaluation queries as evidence about a real search workload. I still recommend this for the harness choice: the agent curates its result set as it goes, so even a run that uses up its turn budget returns something gradable.
