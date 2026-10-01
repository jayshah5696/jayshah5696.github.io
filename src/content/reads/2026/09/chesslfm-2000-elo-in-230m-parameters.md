---
title: "ChessLFM: 2000 Elo in 230M Parameters"
url: "https://maximelabonne.substack.com/p/chesslfm-2000-elo-in-230m-params"
date: 2026-09-16
tags: ["distillation", "llm", "evals"]
draft: false
---

I'd read the move representation first: fixed-position board tokens and 1,968 move tokens give the model an explicit interface instead of making it track a position through PGN text. I'd skip the familiar setup about LLMs blundering at chess and look closely at what the 2004 Elo on a Stockfish-anchored ladder actually measures; the browser-based WebGPU deployment is a neat constraint, not a substitute for that eval.
