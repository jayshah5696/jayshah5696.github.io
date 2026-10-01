---
title: "Looking into the Swarm's Eye"
url: "https://florianbrand.com/posts/swarms"
date: 2026-09-18
tags: ["ai-agents", "llm", "systems"]
draft: false
---

I liked the concrete framing of multi-agent swarms as a new scaling axis for wall-clock time, especially for broad research and data work where agents can share findings through agent-to-agent communication. That gives me a useful mental model: fan out when parallel discovery matters, rather than assuming a longer-running single agent is always better.

- The cost warning is hard to ignore: the swarm can spend tens of billions of tokens, and Astra can spawn dozens or hundreds of subagents, costing thousands of dollars on a simple task. Any implementation needs explicit budgets and stopping conditions.
