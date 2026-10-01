---
title: "MuZero: Planning with a Learned Model"
url: "https://arxiv.org/html/1911.08265v2"
date: 2026-09-13
tags: ["rl", "research", "machine-learning"]
draft: false
---

I don't take matching AlphaZero on Go, chess, and shogi as proof that learned-model planning will transfer to messy real-world control. I still recommend this for the design choice: MuZero predicts the reward, policy, and value most relevant to planning, without requiring its hidden state to reconstruct the screen or match the environment's true state.
