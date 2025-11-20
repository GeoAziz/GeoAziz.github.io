// Lightweight Fuse.js-powered site search
// Loads /search.json and wires a modal with keyboard navigation
(function(){
  let index = null; let fuse = null; let results = []; let lastMatches = null; let activeTag = null;
  const fetchIndex = async ()=>{
    try{
      const r = await fetch('/search.json');
      index = await r.json();
    }catch(e){ console.error('Failed to load search index', e); index = []; }
  };

  function createFuse(){
    if(!window.Fuse || !index) return;
    const options = {
      keys: [
        {name: 'title', weight: 0.7},
        {name: 'tags', weight: 0.6},
        {name: 'categories', weight: 0.5},
        {name: 'excerpt', weight: 0.4},
        {name: 'content', weight: 0.2}
      ],
      includeMatches: true,
      threshold: 0.35,
      ignoreLocation: true,
      useExtendedSearch: true
    };
    fuse = new Fuse(index, options);
  }

  // Modal wiring
  const openSearch = ()=>{ const m = document.getElementById('search-modal'); if(!m) return; m.classList.add('open'); const i = m.querySelector('input'); i && i.focus(); }; 
  const closeSearch = ()=>{ const m = document.getElementById('search-modal'); if(!m) return; m.classList.remove('open'); const openBtn = document.getElementById('open-search'); openBtn && openBtn.focus(); };

  // debounce
  function debounce(fn, wait){ let t; return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), wait); }; }

  function renderResults(query){
    const out = document.getElementById('search-results'); if(!out) return;
    if(!query){ out.innerHTML = '<p class="search-hint">Type to search posts…</p>'; return; }
  if(!fuse){ out.innerHTML = '<p class="search-hint">Indexing…</p>'; return; }
  // Apply tag filter if set
  const opts = {limit: 12};
  let res = fuse.search(query, opts);
  // res is array of {item, matches}
  // store matches for highlighting
  lastMatches = res;
  results = res.map(r=>r.item);
  if(activeTag){ results = results.filter(it => (it.tags||[]).includes(activeTag)); res = res.filter(r => (r.item.tags||[]).includes(activeTag)); }
    if(results.length === 0){ out.innerHTML = '<p class="search-none">No results</p>'; return; }
    // Best match card
  const primary = results[0];
    let html = '';
    html += '<div class="search-primary">';
    html += `<a class="search-link" href="${primary.url}">`;
    if(primary.thumbnail) html += `<img class="search-thumb" src="${primary.thumbnail}" alt="">`;
  // Use matches data to highlight primary result title & excerpt
  const primaryMatch = res && res.length>0 ? res[0].matches : null;
  html += `<div class="search-meta"><h3>${highlightText(primary.title, primaryMatch, 'title')}</h3>`;
  if(primary.excerpt) html += `<p class="search-excerpt">${highlightText(truncate(primary.excerpt,180), primaryMatch, 'excerpt')}</p>`;
    html += `<p class="search-tags">${(primary.tags||[]).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join(' ')}</p>`;
    html += `</div></a></div>`;
    // Secondary list
    html += '<ul class="search-list">';
    for(let i=1;i<Math.min(results.length,10);i++){
      const it = results[i];
      const match = res[i] && res[i].matches ? res[i].matches : null;
      html += `<li data-index="${i}"><a href="${it.url}"><strong>${highlightText(it.title, match, 'title')}</strong> <small>${highlightText((it.excerpt||'').slice(0,120), match, 'excerpt')}</small></a></li>`;
    }
    html += '</ul>';
    out.innerHTML = html;
    // reset selection
    const firstLink = out.querySelector('[data-index]'); if(firstLink) { clearSelection(); firstLink.classList.add('selected'); }
  }

  function clearSelection(){ const out=document.getElementById('search-results'); if(!out) return; out.querySelectorAll('.selected').forEach(el=>el.classList.remove('selected')); }

  function moveSelection(dir){ const out=document.getElementById('search-results'); if(!out) return; const items = Array.from(out.querySelectorAll('[data-index]')); if(items.length===0) return; const cur = out.querySelector('.selected'); let idx = cur ? parseInt(cur.getAttribute('data-index')) : 0; idx = Math.max(1, Math.min(items.length-1, idx + dir)); clearSelection(); const el = out.querySelector(`[data-index="${idx}"]`); if(el){ el.classList.add('selected'); el.scrollIntoView({block:'nearest'}); }}

  function openSelected(){ const out=document.getElementById('search-results'); if(!out) return; const sel = out.querySelector('.selected'); if(sel){ const a = sel.querySelector('a'); if(a) window.location.href = a.getAttribute('href'); } else { // open primary
    const prim = results && results[0]; if(prim) window.location.href = prim.url; }
  }

  function highlightText(text, matches, key){
    if(!matches || !Array.isArray(matches)) return escapeHtml(text);
    // find match entry for the given key
    const m = matches.find(x => x.key === key) || matches.find(x => x.key === 'content') || matches[0];
    if(!m || !m.indices) return escapeHtml(text);
    const parts = []; let last = 0;
    m.indices.forEach(([start,end])=>{
      parts.push(escapeHtml(text.slice(last,start)));
      parts.push('<mark>' + escapeHtml(text.slice(start,end+1)) + '</mark>');
      last = end+1;
    });
    parts.push(escapeHtml(text.slice(last)));
    return parts.join('');
  }

  function escapeHtml(s){ return (s||'').replace(/[&"'<>]/g, function(c){ return {'&':'&amp;','"':'&quot;','\'':'&#39;','<':'&lt;','>':'&gt;'}[c]; }); }
  function truncate(s,n){ return s && s.length>n ? s.slice(0,n-1)+'…' : s; }

  document.addEventListener('DOMContentLoaded', async function(){
    await fetchIndex(); createFuse();
    // wire open/close
    const openBtn = document.getElementById('open-search'); if(openBtn) openBtn.addEventListener('click', function(e){ e.preventDefault(); openSearch(); });
    const modal = document.getElementById('search-modal'); if(!modal) return;
    const inp = modal.querySelector('input'); const out = document.getElementById('search-results');
    // populate tag filters from index
    const tagContainer = document.getElementById('search-tags');
    if(tagContainer && index){
      const uniq = Array.from(new Set(index.flatMap(p=>p.tags||[]))).sort((a,b)=>a.localeCompare(b));
      uniq.forEach(t=>{
        const btn = document.createElement('button'); btn.type='button'; btn.textContent = t; btn.addEventListener('click', function(){
          // toggle
          if(activeTag === t){ activeTag = null; btn.classList.remove('active'); } else { activeTag = t; // clear others
            tagContainer.querySelectorAll('button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }
          renderResults(inp.value.trim());
        }); tagContainer.appendChild(btn);
      });
    }
    const deb = debounce(function(){ renderResults(inp.value.trim()); }, 160);
    inp.addEventListener('input', deb);
    modal.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ closeSearch(); } else if(e.key === 'ArrowDown'){ e.preventDefault(); moveSelection(1);} else if(e.key === 'ArrowUp'){ e.preventDefault(); moveSelection(-1);} else if(e.key === 'Enter'){ e.preventDefault(); openSelected(); } });
    modal.querySelector('.search-close').addEventListener('click', function(){ closeSearch(); });
    // click outside to close
    modal.addEventListener('click', function(e){ if(e.target === modal) closeSearch(); });

    // Quick nav button
    const quick = document.getElementById('quick-nav-button'); const quickMenu = document.getElementById('quick-nav-menu'); if(quick){ quick.addEventListener('click', function(){ quickMenu.classList.toggle('open'); }); }
  });
})();
