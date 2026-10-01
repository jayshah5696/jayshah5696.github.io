---
title: "Fast Embeddings on GPUs"
url: "https://www.perplexity.ai/hub/blog/fast-embeddings-on-gpus"
date: 2026-09-05
tags: ["embedding-models", "search", "systems"]
draft: false
---

On a sub-billion-parameter model, Tulip's scheduler sees the GPU saturate at around 512 tokens, after which packing in more sequences doesn't improve efficiency. I like the focus beyond kernels: whole-model CUDA graphs and lazy result tracking let CPU scheduling overlap with GPU work, a serving detail that matters for both low-latency queries and large embedding batches.
