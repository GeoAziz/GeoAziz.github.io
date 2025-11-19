---
layout: default
title: Blog
permalink: /blog/
pagination:
  enabled: true
---

## Blog

{% if site.posts == empty %}
No posts yet — check back soon!
{% else %}
<ul class="post-list">
  {% for post in site.posts %}
  <li class="post-card">
    <a href="{{ post.url | relative_url }}"><h3>{{ post.title }}</h3></a>
    <div class="meta muted small">{{ post.date | date: "%Y-%m-%d" }} • {{ post.categories | join: ", " }}</div>
    <p class="small">{{ post.excerpt | strip_html | truncate: 140 }}</p>
  </li>
  {% endfor %}
</ul>
{% endif %}
