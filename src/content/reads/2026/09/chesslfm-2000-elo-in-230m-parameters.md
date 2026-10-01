---
title: "ChessLFM: 2000 Elo in 230M Parameters"
url: "https://maximelabonne.substack.com/p/chesslfm-2000-elo-in-230m-params"
date: 2026-09-16
tags: ["distillation", "llm", "machine-learning"]
draft: false
---

I liked the decision to turn each of chess's 1,968 geometrically possible moves into a vocabulary token and represent the position with fixed board tokens; I recommend opening this for a concrete example of adapting a small decoder-only model to a structured action space. The implementation trades a specialized policy/value head for direct ONNX, transformers.js, and WebGPU deployment, and the reported result is 2004 Elo on a Stockfish-anchored ladder. That benchmark is compelling for the engineering pattern, though the supplied material does not establish how the model performs outside that ladder.
