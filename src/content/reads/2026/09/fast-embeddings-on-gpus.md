---
title: "Fast Embeddings on GPUs"
url: "https://www.perplexity.ai/hub/blog/fast-embeddings-on-gpus"
date: 2026-09-05
tags: ["embedding-models", "machine-learning", "search"]
draft: false
---

I liked the way this treats embedding serving as two different systems problems: batch embedding is analogous to compute-bound prefill, while online embedding behaves like memory-bound decode, so the same optimized prefill and decode kernels can serve both. I recommend opening it if you build retrieval infrastructure; that mapping gives a practical starting point for deciding whether to optimize throughput, latency, or the handoff between them.

- Tulip stops chasing more sequences once a batch reaches about 512 tokens on a model under one billion parameters, because dense-layer cost is dominated by token count. That is a useful warning against assuming larger batches are automatically more efficient.
- Whole-model CUDA graphs and Rust's `LazyTensor` overlap CPU scheduling with GPU execution. The supplied material does not include an end-to-end latency or throughput table, so the size of the gain cannot be judged here.
