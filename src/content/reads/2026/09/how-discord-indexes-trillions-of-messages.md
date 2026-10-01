---
title: "How Discord Indexes Trillions of Messages"
url: "https://discord.com/blog/how-discord-indexes-trillions-of-messages"
date: 2026-09-12
tags: ["infrastructure", "search", "systems"]
draft: false
---

I liked the concrete failure analysis: a 50-message bulk request could fan out across 50 Elasticsearch nodes, so one failed node made roughly 40% of batches fail. I recommend this for the resulting implementation lesson: batch messages by cluster and index so a node failure only retries work destined for that node, instead of turning a localized failure into a system-wide retry storm.
