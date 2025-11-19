---
layout: page
title: Search
---

<input type="text" id="searchBox" placeholder="Search posts..." />

<ul id="results"></ul>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script>
fetch('{{ "/search.json" | relative_url }}')
  .then(res => res.json())
  .then(data => {
    const idx = lunr(function () {
      this.ref('url')
      this.field('title')
      this.field('content')
      data.forEach(doc => this.add(doc))
    });

    document.getElementById('searchBox').addEventListener('input', function () {
      const q = this.value.trim();
      const list = document.getElementById('results')
      list.innerHTML = ""
      if(!q) return;
      const results = idx.search(q)
      results.forEach(r => {
        const item = data.find(d => d.url === r.ref)
        if(item) list.innerHTML += `<li><a href="${item.url}">${item.title}</a></li>`
      })
    })
  })
</script>
