---
title: "Why LLM Reinforcement Learning Can Be Information-Efficient"
url: "https://www.beren.io/2026-07-26-How-Can-LLM-RL-Work-Despite-Information-Theoretic-Inefficiency/"
date: 2026-09-12
tags: ["llm", "machine-learning", "rl"]
draft: false
---

I liked the distinction between information quantity and information relevance: a binary RL reward carries far fewer bits than pretraining, but those bits target task success, while next-token gradients mostly describe the wrong loss. I recommend opening this for that SNR mental model, especially the explanation of why iterative SFT on successful traces can still underperform policy gradients. The supplied material is speculative and cuts off mid-argument, so the broader SNR and bias-variance theory cannot be judged here.
