---
title: "Pretraining and scaling as a research methodology"
url: "https://jiaxuanzou0714.github.io/en/blog/2026/pretrain-scaling-methodology-scientific-perspective/"
date: 2026-09-07
tags: ["llm", "machine-learning", "rl"]
draft: false
---

I like that this treats scaling as a question about reusable learning, not just lower loss: the Dyna-2 example follows human-video pretraining into robot task scores under the same post-training setup, rising from 20% to 53% as the data grows from 1,000 to 1 million hours. That transfer is the interesting part, though data composition and the video prediction objective matter too, so I wouldn't read the curve as a clean scale-only law.
