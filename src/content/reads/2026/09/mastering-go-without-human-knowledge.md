---
title: "Mastering Go Without Human Knowledge"
url: "https://discovery.ucl.ac.uk/id/eprint/10045895/1/agz_unformatted_nature.pdf"
date: 2026-09-13
tags: ["rl", "machine-learning", "research"]
draft: false
---

Training game agents by copying expert moves can impose a ceiling; AlphaGo Zero instead started from random play and learned solely through self-play, without human data or domain knowledge beyond the rules. Its training loop treats MCTS search probabilities as policy-improvement targets and game winners as value targets, then uses the updated network to guide the next round of self-play.
