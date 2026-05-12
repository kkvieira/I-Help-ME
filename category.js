// ═══════════════════════════════════════════════
//  category.js — PráticaVídeo library page
// ═══════════════════════════════════════════════

// ── MENU (shared) ──
const menuTrigger = document.getElementById('menuTrigger');
const menuClose   = document.getElementById('menuClose');
const slideMenu   = document.getElementById('slideMenu');
const menuOverlay = document.getElementById('menuOverlay');
function openMenu()  { slideMenu.classList.add('open'); menuOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { slideMenu.classList.remove('open'); menuOverlay.classList.remove('open'); document.body.style.overflow = ''; }
menuTrigger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ── HEADER SCROLL ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── SEARCH ──
document.getElementById('searchBtn').addEventListener('click', () => {
  const q = document.getElementById('searchInput').value.trim();
  if (q) window.location.href = `index.html#search=${encodeURIComponent(q)}`;
});
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) window.location.href = `index.html#search=${encodeURIComponent(q)}`;
  }
});

// ── REVEAL OBSERVER ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.1 });

// ── VIDEO CARD ──
function buildVideoCard(video) {
  const catMeta = CATEGORIES[video.cat] || {};
  const card = document.createElement('a');
  card.className = 'video-card reveal';
  card.href = `watch.html?id=${video.id}`;
  card.innerHTML = `
    <div class="video-thumb">
      <div class="thumb-placeholder">
        ${video.thumb ? `<img src="${video.thumb}" alt="${video.title}" style="width:100%; height:100%; object-fit:cover;">` : video.emoji}
      </div>
      <span class="video-duration">${video.duration}</span>
      <span class="video-cat-chip ${catMeta.accentClass || ''}">${catMeta.label || video.cat}</span>
      <div class="play-hover">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.5)"/>
          <polygon points="9,7 19,12 9,17" fill="white"/>
        </svg>
      </div>
    </div>
    <div class="video-card-body">
      <p class="video-card-title">${video.title}</p>
      <div class="video-card-meta">
        <span>${video.author}</span>
        <span class="dot">${video.views}</span>
        <span class="dot">${video.date}</span>
        <span class="diff-badge diff-${video.difficulty}">${diffLabel(video.difficulty)}</span>
      </div>
    </div>
  `;
  revealObserver.observe(card);
  return card;
}

// ── MAIN ──
const params = new URLSearchParams(window.location.search);
const cat    = params.get('cat') || 'todos';
const catMeta = CATEGORIES[cat] || { label: 'Todos', icon: '🎬', desc: 'Todos os vídeos', bg: '#0f0e0c' };

let currentVideos = [];
let visibleCount  = 9;
let activeFilter  = 'todos';
let activeSort    = 'recent';

function applyFiltersAndSort() {
  let vids = cat === 'todos' ? [...VIDEOS] : VIDEOS.filter(v => v.cat === cat);
  if (activeFilter !== 'todos') vids = vids.filter(v => v.difficulty === activeFilter);
  if (activeSort === 'popular') vids.sort((a, b) => b.likes - a.likes);
  else if (activeSort === 'az') vids.sort((a, b) => a.title.localeCompare(b.title));
  currentVideos = vids;
}

function renderGrid() {
  const grid = document.getElementById('libraryGrid');
  grid.innerHTML = '';
  const toShow = currentVideos.slice(0, visibleCount);
  if (toShow.length === 0) {
    grid.innerHTML = '<div class="empty-state"><span>😕</span><p>Nenhum vídeo encontrado com este filtro.</p></div>';
  } else {
    toShow.forEach((v, i) => {
      const card = buildVideoCard(v);
      card.style.transitionDelay = `${(i % 9) * 0.06}s`;
      grid.appendChild(card);
    });
  }
  document.getElementById('loadMoreBtn').style.display =
    visibleCount >= currentVideos.length ? 'none' : 'inline-block';

  // Trigger reveal
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }, 50);
}

function initPage() {
  // Hero
  document.getElementById('catHeroIcon').textContent   = catMeta.icon || '🎬';
  document.getElementById('catHeroTitle').textContent  = catMeta.label || 'Todos';
  document.getElementById('catHeroDesc').textContent   = catMeta.desc  || '';
  document.getElementById('catBreadcrumb').textContent = catMeta.label || 'Todos';
  document.title = `${catMeta.label || 'Todos'} — PráticaVídeo`;

  if (cat !== 'todos') {
    const total = VIDEOS.filter(v => v.cat === cat).length;
    document.getElementById('catVideoCount').textContent = `${total} vídeos disponíveis`;
    document.body.classList.add(catMeta.bodyClass || '');
    document.querySelector('.cat-hero').style.setProperty('--cat-bg', catMeta.bg || '#0f0e0c');
    document.querySelector('.cat-hero').style.setProperty('--cat-emoji', `'${catMeta.emoji}'`);
  } else {
    document.getElementById('catVideoCount').textContent = `${VIDEOS.length} vídeos disponíveis`;
  }

  // Mark active menu item
  document.querySelectorAll('.menu-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.includes(`cat=${cat}`)) a.classList.add('active');
  });

  applyFiltersAndSort();
  renderGrid();

  // Filters
  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      visibleCount = 9;
      applyFiltersAndSort();
      renderGrid();
    });
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', e => {
    activeSort = e.target.value;
    visibleCount = 9;
    applyFiltersAndSort();
    renderGrid();
  });

  // Load more
  document.getElementById('loadMoreBtn').addEventListener('click', () => {
    visibleCount += 9;
    renderGrid();
  });
}

// ── SMOOTH PAGE TRANSITION ──
document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http')) return;
  e.preventDefault();
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .25s ease';
  setTimeout(() => { window.location.href = href; }, 250);
});

document.addEventListener('DOMContentLoaded', initPage);