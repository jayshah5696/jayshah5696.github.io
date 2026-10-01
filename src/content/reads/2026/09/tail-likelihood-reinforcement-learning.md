---
title: "Tail-Likelihood Reinforcement Learning"
url: "https://arxiv.org/html/2609.02987v1"
date: 2026-09-07
tags: ["rl", "research", "machine-learning"]
draft: false
---

What caught my attention is that TailRL treats each reward threshold as a binary success event, then maximizes the log-probability of exceeding a uniformly chosen threshold. Its gradient is a harmonic mixture of Best-of-k gradients, and the method needs only a change to the advantage calculation in an existing RL pipeline.
