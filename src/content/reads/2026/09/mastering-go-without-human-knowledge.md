---
title: "Mastering Go Without Human Knowledge"
url: "https://discovery.ucl.ac.uk/id/eprint/10045895/1/agz_unformatted_nature.pdf"
date: 2026-09-13
tags: ["machine-learning", "research", "rl"]
draft: false
---

I like the tight training loop: MCTS produces stronger search probabilities, then one neural network learns to match those probabilities and the self-play winner. That gives a concrete mental model for combining planning and learning, and is the main reason I recommend opening this paper.

- The result is unusually concrete: starting from random play, AlphaGo Zero generated 4.9 million self-play games and beat the earlier AlphaGo 100-0. The scale makes clear that removing human data did not remove the need for substantial computation.
