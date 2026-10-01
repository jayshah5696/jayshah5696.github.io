---
title: "How Frontier Labs Build RL Environments for Agents"
url: "https://huggingface.co/blog/sergiopaniego/rl-environments-2026"
date: 2026-09-11
tags: ["ai-agents", "infrastructure", "rl"]
draft: false
---

I liked the concrete shift from an in-memory reset/step simulator to one machine per rollout: each sandbox has its own filesystem, shell, and surviving processes, then is destroyed after a short attempt or checkpointed and resumed for long ones. I recommend opening this if you build agent-training infrastructure, because it gives a practical mental model for the real scaling problem: scheduling and preserving isolated worlds, from Cursor's hundreds of thousands of concurrent sandboxes to Kimi's resumable microVMs.
