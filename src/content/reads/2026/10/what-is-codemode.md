---
title: "What Is Codemode?"
url: "https://lucumr.pocoo.org/2026/10/6/codemode/"
date: 2026-10-06
tags: ["ai-agents", "coding-tools", "infrastructure"]
draft: false
---

I'm fully sold on Codemode as the answer to "why not bash?", but the "brains vs hands" distinction makes the design click: bash runs in the target environment, while Codemode composes tool calls on the harness side, without routing each one through the LLM's context. Pi's QuickJS-in-WASM sandbox has no network or filesystem, yet Codemode can stash state on the harness host; that boundary is the detail I'd keep in view when judging its safety.
