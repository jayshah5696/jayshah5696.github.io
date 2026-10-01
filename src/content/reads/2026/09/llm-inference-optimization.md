---
title: "LLM Inference Optimization"
url: "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization"
date: 2026-09-11
tags: ["infrastructure", "llm", "systems"]
draft: false
---

I liked the post's prefill/decode split: prefill is a highly parallelized matrix-matrix operation, while decode is a memory-bound matrix-vector loop that generates one token at a time. I recommend opening it if you are sizing an inference service, because this gives the right mental model for why decode performance, KV-cache memory, and request scheduling cannot be treated as one uniform GPU problem.

- The KV-cache formula makes the cost of context length and batching explicit: memory scales with layers, attention dimensions, precision, batch size, and sequence length.
- Static batching makes every request wait for the longest completion; in-flight batching is the concrete scheduling alternative described here.
