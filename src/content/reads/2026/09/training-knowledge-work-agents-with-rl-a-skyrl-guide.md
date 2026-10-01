---
title: "Training Knowledge-Work Agents with RL: A SkyRL Guide"
url: "https://www.mercor.com/blog/training-frontier-knowledge-work-agents-a-397b-rl-training-guide-with-skyrl/"
date: 2026-09-04
tags: ["ai-agents", "rl", "systems"]
draft: false
---

The Step 1 infrastructure section explains why Mercor isolated each agent loop in its own Ray task after a shared Python process caused constant MCP disconnects. It also covers pretraining checks, from timeouts and retry classification to running the full training set at expected rollout concurrency.
