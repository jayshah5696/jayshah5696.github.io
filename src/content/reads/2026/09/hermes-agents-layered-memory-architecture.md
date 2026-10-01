---
title: "Hermes Agent's Layered Memory Architecture"
url: "https://manthanguptaa.in/posts/hermes_memory/"
date: 2026-09-02
tags: ["ai-agents", "memory", "systems"]
draft: false
---

Hermes caps always-injected memory at 2,200 characters in `MEMORY.md` and 1,375 in `USER.md`, while keeping past sessions in SQLite for on-demand search. I like the separation: a small, stable prompt prefix supports caching, and episodic recall comes back through FTS5 search and focused session summaries.
