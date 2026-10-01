---
title: "Hermes Agent's Layered Memory Architecture"
url: "https://manthanguptaa.in/posts/hermes_memory/"
date: 2026-09-02
tags: ["ai-agents", "memory", "systems"]
draft: false
---

The frozen `MEMORY.md` and `USER.md` snapshot caught my attention: mid-session edits wait for a new session or a prompt rebuild after compression. I like the split between tiny curated prompt memory and SQLite-backed `session_search`; keeping the stable prefix cacheable while pulling history on demand is a design I'd take from this.
