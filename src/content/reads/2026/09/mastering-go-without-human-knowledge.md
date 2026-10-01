---
title: "Mastering Go Without Human Knowledge"
url: "https://discovery.ucl.ac.uk/id/eprint/10045895/1/agz_unformatted_nature.pdf"
date: 2026-09-13
tags: ["rl", "research", "machine-learning"]
draft: false
---

The 100-0 result is striking, but the part I like is the training loop: MCTS turns the current network into a stronger policy target, then self-play outcomes train its value estimate, with no human games or rollouts. It's a clean demonstration of search and learning improving each other; 4.9 million self-play games and 1,600 simulations per move also make the compute demands hard to ignore, and Go is a much tidier setting than open-ended agent work.
