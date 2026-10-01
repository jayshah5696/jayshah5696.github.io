---
title: "Tail-Likelihood Reinforcement Learning"
url: "https://arxiv.org/html/2609.02987v1"
date: 2026-09-07
tags: ["rl", "research", "machine-learning"]
draft: false
---

If you're looking at why policies stop improving when you draw more samples, this is the paper I'd point you to. I like its shift from mean reward to log-probability across reward thresholds, especially the connection to a harmonic mixture of Best-of-k gradients: it gives a clear way to think about keeping rare, high-reward rollouts in play.
