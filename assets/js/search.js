// Lightweight Fuse.js-powered site search
// Loads /search.json and wires a modal with keyboard navigation
(function(){
  let index = null; let fuse = null; let results = [];
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
    const res = fuse.search(query, {limit: 12});
    results = res.map(r=>r.item);
    if(results.length === 0){ out.innerHTML = '<p class="search-none">No results</p>'; return; }
    // Best match card
    const primary = results[0];
    let html = '';
    html += '<div class="search-primary">';
    html += `<a class="search-link" href="${primary.url}">`;
    if(primary.thumbnail) html += `<img class="search-thumb" src="${primary.thumbnail}" alt="">`;
    html += `<div class="search-meta"><h3>${escapeHtml(primary.title)}</h3>`;
    if(primary.excerpt) html += `<p class="search-excerpt">${escapeHtml(truncate(primary.excerpt,180))}</p>`;
    html += `<p class="search-tags">${(primary.tags||[]).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join(' ')}</p>`;
    html += `</div></a></div>`;
    // Secondary list
    html += '<ul class="search-list">';
    for(let i=1;i<Math.min(results.length,10);i++){
      const it = results[i];
      html += `<li data-index="${i}"><a href="${it.url}"><strong>${escapeHtml(it.title)}</strong> <small>${escapeHtml((it.excerpt||'').slice(0,120))}</small></a></li>`;
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

  function escapeHtml(s){ return (s||'').replace(/[&"'<>]/g, function(c){ return {'&':'&amp;','"':'&quot;','\'':'&#39;','<':'&lt;','>':'&gt;'}[c]; }); }
  function truncate(s,n){ return s && s.length>n ? s.slice(0,n-1)+'…' : s; }

  document.addEventListener('DOMContentLoaded', async function(){
    await fetchIndex(); createFuse();
    // wire open/close
    const openBtn = document.getElementById('open-search'); if(openBtn) openBtn.addEventListener('click', function(e){ e.preventDefault(); openSearch(); });
    const modal = document.getElementById('search-modal'); if(!modal) return;
    const inp = modal.querySelector('input'); const out = document.getElementById('search-results');
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
