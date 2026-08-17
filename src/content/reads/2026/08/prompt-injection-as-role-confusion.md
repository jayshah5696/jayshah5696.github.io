---
title: "Prompt Injection as Role Confusion"
url: "https://role-confusion.github.io/"
date: 2026-08-16
tags: ["ai-safety", "llm"]
draft: false
---

Shows that LLMs identify system vs. user roles by writing style rather than special delimit tags, and introduces **CoT Forgery** where models mistake injected instructions for their own reasoning trace.

- Suggests that prompt injection defense requires semantic role separation rather than delimiter engineering.
- Explains why chain-of-thought models remain vulnerable to deceptive thinking patterns.
