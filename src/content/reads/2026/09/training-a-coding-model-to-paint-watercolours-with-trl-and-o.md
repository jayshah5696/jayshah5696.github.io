---
title: "Training a Coding Model to Paint Watercolours with TRL and OpenEnv"
url: "https://huggingface.co/blog/train-to-paint-with-code"
date: 2026-09-11
tags: ["rl", "coding-tools", "gen-ai"]
draft: false
---

Instead of asking an image model for another statistically average picture, this trains a coding model to emit about 150 lines of JavaScript, with its style constrained to ten p5.brush methods. The taste reward combines HPSv3 with a pairwise vision judge comparing paintings against a hand-rated reference pool; the post reports that both judge-led and HPS-led runs learned.
