---
title: "S3 Files and the Changing Face of S3"
url: "https://www.allthingsdistributed.com/2026/04/s3-files-and-the-changing-face-of-s3.html"
date: 2026-09-07
tags: ["infrastructure", "production", "systems"]
draft: false
---

I recommend this for its concrete account of a storage-boundary failure: S3 provided parallelism, cost, and durability, while genomics tools expected a local Linux filesystem, forcing researchers to copy data around and manage inconsistent copies. That is a useful mental model for data systems: a storage API can become the bottleneck even when the underlying compute and storage primitives are strong. The supplied excerpt does not show how S3 Files implements the filesystem side, so that part cannot be judged here.
