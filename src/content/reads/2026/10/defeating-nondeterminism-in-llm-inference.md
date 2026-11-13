---
title: "Defeating Nondeterminism in LLM Inference"
url: "https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/"
date: 2026-10-19
tags: ["llm", "research", "systems"]
draft: false
---

If you treat temperature 0 as a reproducibility guarantee, I like this post's distinction between deterministic kernels and the nondeterministic results users can see. The repeated matrix-multiplication test, bitwise equal across 1,000 runs, makes a useful case that GPU concurrency alone doesn't explain the problem.
