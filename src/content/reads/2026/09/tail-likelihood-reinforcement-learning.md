---
title: "Tail-Likelihood Reinforcement Learning"
url: "https://arxiv.org/html/2609.02987v1"
date: 2026-09-07
tags: ["rl", "research", "machine-learning"]
draft: false
---

I like that TailRL turns continuous rewards into a family of binary success events, then optimizes their log-probabilities instead of only the mean. The harmonic mixture of Best-of-k gradients makes the connection to inference-time sampling easy to see, though I'm not sure how sensitive the method is to choosing thresholds uniformly over [0,1].
