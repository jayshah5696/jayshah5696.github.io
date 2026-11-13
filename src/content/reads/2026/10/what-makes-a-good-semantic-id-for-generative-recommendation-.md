---
title: "What Makes a Good Semantic ID for Generative Recommendation? A Reproducibility Study"
url: "https://arxiv.org/html/2609.24430v1"
date: 2026-10-05
tags: ["evals", "machine-learning", "research"]
draft: false
---

I trust this one because it separates the method-level benchmark from SID-only comparisons with the backbone and training protocol held fixed; that makes its finding that codebook balance doesn't reliably predict recommendation quality more informative than a leaderboard alone. The results are non-monotonic: RQ-VAE and OPQ vary across datasets, while OPQ and RQ-Kmeans preserve different aspects of local neighborhoods, so the study doesn't settle on a universal design.
