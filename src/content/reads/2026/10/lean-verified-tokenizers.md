---
title: "Lean-Verified Tokenizers"
url: "https://srush.github.io/verified-tokenizer/"
date: 2026-10-31
tags: ["ai-agents", "rl", "systems"]
draft: false
---

If you're working on tool-using RL, this is worth a look: decoding and re-encoding can change token IDs, and inserting one byte can shift BPE merges on both sides, so the training sequence may no longer match inference. The Rust-to-Lean path through Aeneas is an interesting way to address that correctness gap; I'd want to know exactly which renderer and tokenizer behaviors fall inside the proof boundary before treating it as end-to-end protection.
