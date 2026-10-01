---
title: "Training Search Agents with GRPO"
url: "https://jasperlu.com/blog/training-search-agents-grpo/"
date: 2026-09-25
tags: ["rl", "search", "bm25"]
draft: false
---

I'd start with the harness design: the agent maintains a curated result set as it searches, so running out of turns still leaves something gradable. I like that clear connection between episode limits and evaluation, but the early runs use only 256 training queries and treat supporting facts like answers, so they don't establish performance on the canonical task.
