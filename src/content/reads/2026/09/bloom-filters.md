---
title: "Bloom Filters"
url: "https://samwho.dev/bloom-filters"
date: 2026-09-04
tags: ["statistics", "systems"]
draft: false
---

The browser example caught my attention: a Bloom filter can shrink a million malicious links from 20 MB to 3.59 MB, at the cost of a false warning about once per million links checked. Its one-sided error is the point: a definite "no" skips the full-list lookup, while a "maybe" can be checked against the database.
