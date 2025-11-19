---
layout: default
title: Blog
permalink: /blog/
---

## Blog

{% if site.posts == empty %}
No posts yet — check back soon!
{% else %}
<ul>
  {% for post in site.posts %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> — <small>{{ post.date | date: "%Y-%m-%d" }}</small></li>
  {% endfor %}
</ul>
{% endif %}
