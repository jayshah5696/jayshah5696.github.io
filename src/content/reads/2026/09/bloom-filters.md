---
title: "Bloom Filters"
url: "https://samwho.dev/bloom-filters"
date: 2026-09-04
tags: ["systems", "search"]
draft: false
---

If you're weighing a Bloom filter for a lookup where false positives are tolerable, I'd point you here for its clear distinction between a definite "no" and a "maybe." I especially like the malicious-link example, where a "maybe" can trigger a full database check instead of an API call for every link.
