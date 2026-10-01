---
title: "MuZero: Planning with a Learned Model"
url: "https://arxiv.org/html/1911.08265v2"
date: 2026-09-13
tags: ["machine-learning", "research", "rl"]
draft: false
---

I liked MuZero's choice to learn only the reward, action-selection policy, and value function needed for planning, instead of forcing its hidden state to reconstruct the observation. That gives a useful mental model for model-based RL: optimize the internal state for decisions, then test the idea against its concrete result across 57 Atari games and rule-free Go, chess, and shogi.
