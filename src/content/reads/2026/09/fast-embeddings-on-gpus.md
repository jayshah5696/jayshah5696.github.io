---
title: "Fast Embeddings on GPUs"
url: "https://www.perplexity.ai/hub/blog/fast-embeddings-on-gpus"
date: 2026-09-05
tags: ["embedding-models", "infrastructure", "systems"]
draft: false
---

The default is to keep tuning GPU kernels, but Perplexity argues the remaining latency is in the runtime around them. Whole-model CUDA graphs reduce repeated host launches, while a Rust-side `LazyTensor` tracks GPU results asynchronously so CPU scheduling can overlap GPU work.
