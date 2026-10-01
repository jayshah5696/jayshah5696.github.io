---
title: "Fast Embeddings on GPUs"
url: "https://www.perplexity.ai/hub/blog/fast-embeddings-on-gpus"
date: 2026-09-05
tags: ["embedding-models", "infrastructure", "search"]
draft: false
---

My RAG post focuses more on retrieval; I like that this adds the serving path behind it. The split between batch embedding for throughput and online embedding for latency, along with the note that a sub-billion-parameter model can saturate around 512 tokens, makes workload shape feel just as important as kernel speed.
