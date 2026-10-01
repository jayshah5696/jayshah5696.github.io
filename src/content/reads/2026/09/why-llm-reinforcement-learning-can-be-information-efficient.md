---
title: "Why LLM Reinforcement Learning Can Be Information-Efficient"
url: "https://www.beren.io/2026-07-26-How-Can-LLM-RL-Work-Despite-Information-Theoretic-Inefficiency/"
date: 2026-09-12
tags: ["rl", "llm", "research"]
draft: false
---

I'd start with the shift from bits per sample to signal-to-noise on the task objective: a binary reward carries little information, but points the update at success, while next-token loss also spends gradient on incidental tokens. I like this as a way to frame why RL can beat iterative SFT, though the broader SNR and loss-landscape explanation is explicitly speculative and needs tests that distinguish objective alignment from other causes.
