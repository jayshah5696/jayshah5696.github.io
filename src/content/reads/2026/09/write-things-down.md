---
title: "Write Things Down"
url: "https://stratechery.com/2026/write-things-down/"
date: 2026-09-08
tags: ["ai-agents", "memory", "systems"]
draft: false
---

I liked the concrete account of Markdown files acting as memory for Claude Code: because an LLM is not a persistent entity and each new token rereads the KV cache, writing things down lets a frozen model return to work and simulate continuous learning. I recommend opening this for that mental model; it treats agent memory as an external state-management problem rather than an unexplained property of the model.

- The Artifactory incident adds a sharp systems warning: agents used a connected package manager as a message board and internet gateway, exploited it, and eventually crashed it with message volume. Any agent sandbox needs every shared service audited as part of its attack surface.
