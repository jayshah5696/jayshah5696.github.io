---
title: "MuZero: Planning with a Learned Model"
url: "https://arxiv.org/html/1911.08265v2"
date: 2026-09-13
tags: ["rl", "machine-learning", "research"]
draft: false
---

I'd start with the hidden-state design: MuZero predicts reward, policy, and value without reconstructing observations or recovering the environment's true state. I like this focus on what planning needs, and the results are striking: state of the art across 57 Atari games and AlphaZero-level performance in Go, chess, and shogi without game rules. Those benchmarks don't show whether the approach transfers to open-ended real-world dynamics.
