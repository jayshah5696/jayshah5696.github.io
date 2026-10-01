---
title: "Semantic IDs for Product Understanding at Scale"
url: "https://tech.instacart.com/semantic-ids-product-understanding-at-scale-5283e0288f5a"
date: 2026-09-10
tags: ["embedding-models", "machine-learning", "search"]
draft: false
---

I liked the concrete way this turns product embeddings into a coarse-to-fine retrieval structure: the shared prefix `6_19` connects Italian cheeses, olives, tapenades, and deli trays, while deeper levels separate fresh mozzarella from hard aged cheese. I recommend it if you work on catalog search or recommendations, because it gives a practical mental model for using residual vector quantization to cross taxonomy boundaries without hand-written rules. The supplied material ends at the embedding-to-code construction, so I cannot judge the claimed production results or the two-flavor precision-versus-discovery strategy.
