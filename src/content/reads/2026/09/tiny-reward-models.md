---
title: "Tiny Reward Models"
url: "https://arxiv.org/html/2507.09973v1"
date: 2026-09-20
tags: ["machine-learning", "ml", "rl"]
draft: false
---

I like the concrete efficiency result: TinyRM uses bidirectional masked language models as small as 400 million parameters while rivaling models over 175x larger on reasoning and safety preference tasks. I recommend opening it for the deployment mental model: reward models used for routing, filtering, or test-time supervision pay inference costs repeatedly, so domain-specific specialists with FLAN-style prompting, DoRA, and layer freezing may be a better fit than one large generalist. The supplied material says conversational preference modeling remains a limitation, and the specific techniques are not yet ablated, so it cannot establish which component drives the result.
