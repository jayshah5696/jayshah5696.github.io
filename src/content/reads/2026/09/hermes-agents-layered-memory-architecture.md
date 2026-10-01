---
title: "Hermes Agent's Layered Memory Architecture"
url: "https://manthanguptaa.in/posts/hermes_memory/"
date: 2026-09-02
tags: ["ai-agents", "memory", "systems"]
draft: false
---

I liked the hard split between tiny prompt memory and on-demand history: Hermes limits MEMORY.md to 2,200 characters and USER.md to 1,375, while session_search uses SQLite FTS5 to retrieve and summarize older sessions. I recommend opening this for the implementation model: keep the stable prompt cache-friendly and move episodic recall behind a tool instead of injecting the whole past every turn.

- The compression path is especially practical: Hermes flushes durable preferences and corrections before summarizing, then rebuilds the prompt so those writes become visible. That gives context compression a deliberate point where important facts can survive.
- The memory tool rejects duplicates and scans entries for prompt-injection patterns, credential exfiltration strings, SSH backdoor hints, and invisible Unicode. Since memory becomes future system-prompt content, that is a concrete constraint worth carrying into an implementation.
