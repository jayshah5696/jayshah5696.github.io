---
title: "Training a Coding Model to Paint Watercolours with TRL and OpenEnv"
url: "https://huggingface.co/blog/train-to-paint-with-code"
date: 2026-09-11
tags: ["rl", "coding-tools", "evals"]
draft: false
---

The interesting move is treating the hand-rated reference pool as part of the reward: the pairwise judge compares paintings against it, so "the pool defines taste here." I like that the open implementation compares three mixes of that judge and HPSv3, though 60- and 110-step runs and model-based taste proxies leave the strength of the result uncertain.
