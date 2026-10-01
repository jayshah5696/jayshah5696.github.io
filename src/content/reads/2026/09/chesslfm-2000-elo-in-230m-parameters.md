---
title: "ChessLFM: 2000 Elo in 230M Parameters"
url: "https://maximelabonne.substack.com/p/chesslfm-2000-elo-in-230m-params"
date: 2026-09-16
tags: ["llm", "rl", "machine-learning"]
draft: false
---

I like the fixed-position board encoding and the 1,968 move tokens: they give a decoder-only model a much cleaner chess interface than raw move text, while keeping the route to WebGPU deployment open. The 2004 Elo comes from a full recipe with a strong teacher, some RL, and a lot of search, so I wouldn't read it as the strength of the 230M model alone.
