---
title: "The Principles of Diffusion Models"
url: "https://arxiv.org/pdf/2510.21890"
date: 2026-09-16
tags: ["gen-ai", "ml", "research"]
draft: false
---

I recommend opening this for its concrete unification of the variational, score-based, and flow-based views around a learned time-dependent velocity field. That gives diffusion sampling a useful mental model: solve a differential equation that transports a simple noise prior to the data, then treat guidance, numerical solvers, and flow-map models as ways of controlling or approximating that trajectory.
