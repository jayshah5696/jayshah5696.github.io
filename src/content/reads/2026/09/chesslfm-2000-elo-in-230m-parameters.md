---
title: "ChessLFM: 2000 Elo in 230M Parameters"
url: "https://maximelabonne.substack.com/p/chesslfm-2000-elo-in-230m-params"
date: 2026-09-16
tags: ["machine-learning", "distillation", "systems"]
draft: false
---

Read the move-representation section first: it explains how ChessLFM encodes the board at fixed positions and maps 1,968 geometrically possible moves to vocabulary tokens. Keeping a decoder-only model lets it run through ONNX and WebGPU, including in a browser demo.
