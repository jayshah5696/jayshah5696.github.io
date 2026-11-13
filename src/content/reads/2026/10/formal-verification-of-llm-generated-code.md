---
title: "Formal Verification of LLM-Generated Code"
url: "https://ssvlab.github.io/lucasccordeiro/talks/fattw2026_slides.pdf"
date: 2026-10-17
tags: ["llm", "research", "software-engineering"]
draft: false
---

"Use the model to guess what a proof needs, never to judge the result" is the talk's strongest idea: models can propose invariants, contracts, or properties, while a proof engine checks them. I like that it also keeps the human in the loop where it matters: a verifier can check a property, but only a person can confirm it means what was intended. The reported 8.27% verification rate across 310,531 C programs is sobering, though the slides rightly caution that a failed check doesn't mean the program is broken.
