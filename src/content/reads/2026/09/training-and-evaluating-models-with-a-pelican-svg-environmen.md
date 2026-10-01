---
title: "Training and Evaluating Models with a Pelican SVG Environment"
url: "https://huggingface.co/blog/sergiopaniego/pelican-env-openenv"
date: 2026-09-11
tags: ["evals", "machine-learning", "rl"]
draft: false
---

I liked that Pelican SVG Env reads the SVG source before rendering it: `data:image` embeds and `<text>` labels are rejected at the gate, so a pixel-perfect shortcut cannot earn reward. That makes this worth opening for anyone building evals or RL environments, because `reset()` and `step()` expose the same scorer to both evaluation and training while cheap deterministic checks discard bad outputs before vision-model calls.

- Treat the reported scores as judge-dependent rather than objective model rankings: `structure` scored exactly 1.000 on 136 of 139 samples, leaving most of the signal to the two vision-model calls.
