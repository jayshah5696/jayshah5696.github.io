---
title: "MuZero: Planning with a Learned Model"
url: "https://arxiv.org/html/1911.08265v2"
date: 2026-09-13
tags: ["rl", "machine-learning", "research"]
draft: false
---

MuZero trains its recurrent model to predict reward, policy, and value, without requiring its hidden state to reconstruct observations or match the environment’s true state. Read it if you’re designing model-based RL systems and need to reason about what a planner’s model must preserve; the paper reports state-of-the-art results on 57 Atari games and AlphaZero-matching superhuman performance in Go, chess, and shogi without game rules.
