---
title: "Training Knowledge-Work Agents with RL: A SkyRL Guide"
url: "https://www.mercor.com/blog/training-frontier-knowledge-work-agents-a-397b-rl-training-guide-with-skyrl/"
date: 2026-09-04
tags: ["rl", "ai-agents", "infrastructure"]
draft: false
---

If you're working on long-horizon agent training, I like that this spends real attention on the unglamorous part: "Steps 1 to 3 are de-risking," from harness bugs and token accounting to rollout failures, before significant compute goes into ablations. The reported 70% relative Pass@1 gain on held-out APEX-Agents is worth examining, though it's still evidence on one benchmark; releasing the training script, weights, and eval traces makes the recipe easier to inspect.
