---
title: "Mastering Atari Games with Limited Data"
url: "https://arxiv.org/html/2111.00210v2"
date: 2026-09-13
tags: ["machine learning", "research", "rl"]
draft: false
---

I liked that EfficientZero reaches 194.3% mean and 109.0% median human performance on Atari 100k with only two hours of gameplay, while approaching DQN's performance with 500 times less data. I recommend opening it for the design behind that result: a self-supervised environment model, an end-to-end value prefix to reduce compounding error, and learned-model correction of off-policy value targets. The supplied material does not show how much each component contributes, so that ablation question remains open.
