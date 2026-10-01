---
title: "How Discord Indexes Trillions of Messages"
url: "https://discord.com/blog/how-discord-indexes-trillions-of-messages"
date: 2026-09-12
tags: ["search", "infrastructure", "systems"]
draft: false
---

A 50-message batch could fan out to 50 Elasticsearch nodes, so one failed node could make roughly 40% of bulk operations fail in a 100-node cluster. I like the fix of batching by cluster and index: it narrows the failure domain instead of making unrelated messages share a retry.
