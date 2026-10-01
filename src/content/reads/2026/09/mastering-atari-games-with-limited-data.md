---
title: "Mastering Atari Games with Limited Data"
url: "https://arxiv.org/html/2111.00210v2"
date: 2026-09-13
tags: ["rl", "machine-learning", "research"]
draft: false
---

I'm not convinced Atari 100k makes the case for real-world viability; the leap from a game benchmark to robotics or healthcare is still unshown here. I like the paper's diagnosis of what limits sample-efficient MuZero-style learning, especially its end-to-end value prefix to reduce compounding error, and the 109% median human score against DQN's 96% with 500 times less data makes the result worth inspecting.
