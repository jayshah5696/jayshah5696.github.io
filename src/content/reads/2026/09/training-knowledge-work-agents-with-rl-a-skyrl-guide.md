---
title: "Training Knowledge-Work Agents with RL: A SkyRL Guide"
url: "https://www.mercor.com/blog/training-frontier-knowledge-work-agents-a-397b-rl-training-guide-with-skyrl/"
date: 2026-09-04
tags: ["ai-agents", "rl", "infrastructure"]
draft: false
---

I'd start with the harness and infrastructure section, especially the detail that sharing one Python process across hundreds of agent loops caused constant MCP disconnects; they moved each loop into its own Ray task. I'd skip the hero-run framing and read for the failure handling, since harness quirks can teach an agent to work around the harness instead of doing the task.
