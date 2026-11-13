---
title: "How to Use Decision Models for Evals"
url: "https://hamel.dev/blog/posts/decision-model-evals/"
date: 2026-10-20
tags: ["evals", "llm", "statistics"]
draft: false
---

I'd start with the threshold-tuning section: a model can separate failures from passes perfectly and still catch none at the default 0.50 threshold. I like that the example chooses thresholds on training folds and measures them on held-out folds.
