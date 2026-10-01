---
title: "How Discord Indexes Trillions of Messages"
url: "https://discord.com/blog/how-discord-indexes-trillions-of-messages"
date: 2026-09-12
tags: ["search", "infrastructure", "systems"]
draft: false
---

The failure math is the part I like: with 50-message batches spread across 100 nodes, one failed node could make about 40% of bulk operations fail. Discord's fix pairs PubSub's guaranteed delivery with batching by cluster and index, so a node failure has a smaller blast radius; I'd still want post-migration numbers to judge the performance gains.
