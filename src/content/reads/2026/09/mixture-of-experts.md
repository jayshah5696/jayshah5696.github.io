---
title: "Mixture of Experts"
url: "https://aman.ai/primers/ai/mixture-of-experts/#latentmoe-hardware-aware-expert-scaling-in-a-latent-space"
date: 2026-09-19
tags: ["llm", "machine-learning", "systems"]
draft: false
---

I liked that this primer treats mixture-of-experts models as a routing and systems problem, tying the capacity factor to token overflow, drop rate, load balancing, and communication trade-offs. That makes it worth opening if you want a practical mental model for why sparse activation is not free: the router's decisions determine both model quality and hardware efficiency. The supplied excerpt is an outline and cuts off during token-dropping mitigation, so I cannot judge the depth or accuracy of the explanations.
