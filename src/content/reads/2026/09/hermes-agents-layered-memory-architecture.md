---
title: "Hermes Agent's Layered Memory Architecture"
url: "https://manthanguptaa.in/posts/hermes_memory/"
date: 2026-09-02
tags: ["ai-agents", "memory", "systems"]
draft: false
---

Hermes treats provider-side prompt caching as the constraint that shapes memory: tiny, frozen MEMORY.md and USER.md files hold durable facts, while SQLite FTS5 search retrieves past sessions on demand. I like the pre-compression memory flush, which gives the model a chance to save durable details before a lossy summary; the walkthrough explains the architecture well, but doesn't establish how reliably session search finds the right history.
