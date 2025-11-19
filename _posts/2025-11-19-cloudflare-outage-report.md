---
layout: post
title: "Cloudflare Outage Report"
date: 2025-11-18 00:00:00 +0000
categories: blog
tags: [Cloudflare, Outage, Networking, Web]
---

On 2025-11-23, Cloudflare experienced a major outage affecting many sites and services. The incident highlighted
the role CDNs and edge networks play in the modern web and the importance of redundancy and monitoring.

Key takeaways:

- Modern web traffic relies heavily on edge proxies and CDNs — when they fail, many services experience degraded
  or no connectivity.
- Proper health checks, multi-region failover, and fallback origins reduce blast radius.
- Observability (logs, traces, and distributed monitoring) is essential to detect and recover quickly.

As a developer this was a good reminder to design systems assuming external dependencies can fail. Consider
graceful degradation, long TTLs for caches where appropriate, and multi-CDN or multi-origin strategies for
critical services.

More posts will explore how caching, proxying, and failover are designed and tested.
