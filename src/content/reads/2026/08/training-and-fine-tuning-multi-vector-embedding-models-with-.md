---
title: "Training and Fine-Tuning Multi-Vector Embedding Models with Sentence Transformers"
url: "https://huggingface.co/blog/train-multi-vector-encoder"
date: 2026-08-26
tags: ["embedding-models", "machine-learning", "search"]
draft: false
---

This guide explains how to train and fine-tune multi-vector embedding models—such as ColBERT-style encoders—in Sentence Transformers. Instead of compressing an entire document or query into one vector, these models retain multiple token-level representations and use late-interaction scoring for more expressive retrieval.

- Multi-vector encoders represent each input as a sequence of embeddings, enabling fine-grained query–document matching while remaining compatible with approximate retrieval pipelines.
- Late interaction commonly scores a query and document with MaxSim: for each query token, find the most similar document token, then sum those maximum similarities.
- Sentence Transformers provides reusable modules and training objectives for in-batch negatives and hard-negative fine-tuning, making experimentation with custom multi-vector architectures more practical.
