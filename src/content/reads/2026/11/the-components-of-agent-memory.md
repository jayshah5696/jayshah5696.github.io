---
title: "The components of agent memory"
url: "https://www.anthropic.com/research/components-of-agent-memory"
date: 2026-11-11
tags: ["ai-agents", "evals", "memory"]
draft: false
---

I'd start with the Pokémon section: Sonnet 3.7 wrote 413 memory files and earned one badge, while Fable 5 used nine files plus `global.md` and earned four, favoring durable strategies over game state it could see on-screen. I like the framing of memory as a prediction about what a future session will need; with one run per model, though, the comparison illustrates the design point more than it isolates its cause.
