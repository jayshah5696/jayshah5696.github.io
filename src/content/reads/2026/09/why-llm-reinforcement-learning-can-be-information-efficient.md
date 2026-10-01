---
title: "Why LLM Reinforcement Learning Can Be Information-Efficient"
url: "https://www.beren.io/2026-07-26-How-Can-LLM-RL-Work-Despite-Information-Theoretic-Inefficiency/"
date: 2026-09-12
tags: ["rl", "llm", "machine-learning"]
draft: false
---

Read this if you are trying to explain why policy-gradient RL can make rapid gains in LLMs despite receiving far fewer bits per sample than pretraining. The proposed explanation is that reward gradients target task success directly, while next-token gradients spend much of their signal on incidental predictions; the author presents this as a speculative signal-to-noise account.
