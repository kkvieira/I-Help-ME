// ═══════════════════════════════════════════════
//  main.js — PráticaVídeo homepage
// ═══════════════════════════════════════════════

// ── MENU ──
const menuTrigger = document.getElementById('menuTrigger');
const menuClose   = document.getElementById('menuClose');
const slideMenu   = document.getElementById('slideMenu');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu() {
  slideMenu.classList.add('open');
  menuOverlay.classList.add('open');
  slideMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  slideMenu.classList.remove('open');
  menuOverlay.classList.remove('open');
  slideMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

menuTrigger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ── HEADER SCROLL ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-section').forEach(el => revealObserver.observe(el));

// ── VIDEO CARD BUILDER ──
function buildVideoCard(video) {
  const catMeta = CATEGORIES[video.cat] || {};
  const card = document.createElement('a');
  card.className = 'video-card reveal';
  card.href = `watch.html?id=${video.id}`;

  card.innerHTML = `
    <div class="video-thumb">
      <div class="thumb-placeholder">${video.emoji}</div>
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

  // Observe for reveal animation
  revealObserver.observe(card);
  return card;
}

// ── POPULATE FEATURED GRID ──
function populateFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = VIDEOS.slice(0, 6);
  featured.forEach(v => grid.appendChild(buildVideoCard(v)));
}

// ── POPULATE TRENDING ROW ──
function populateTrending() {
  const row = document.getElementById('trendingRow');
  if (!row) return;
  const sorted = [...VIDEOS].sort((a, b) => b.likes - a.likes).slice(0, 8);
  sorted.forEach(v => row.appendChild(buildVideoCard(v)));
}

// ── HERO TAGS → SEARCH ──
document.querySelectorAll('.hero-tags span').forEach(tag => {
  tag.addEventListener('click', () => {
    triggerSearch(tag.textContent);
  });
});

// ── SEARCH LOGIC ──
const searchOverlay = document.getElementById('searchResults');
const searchGrid    = document.getElementById('searchGrid');
const searchQueryEl = document.getElementById('searchQuery');
const closeSearchBtn = document.getElementById('closeSearch');
const heroSearch    = document.getElementById('heroSearch');
const heroSearchBtn = document.getElementById('heroSearchBtn');
const headerSearchInput = document.getElementById('searchInput');
const headerSearchBtn   = document.getElementById('searchBtn');

function triggerSearch(query) {
  if (!query.trim()) return;
  const results = searchVideos(query.trim());
  searchQueryEl.textContent = `"${query}"`;
  searchGrid.innerHTML = '';
  if (results.length === 0) {
    searchGrid.innerHTML = '<div class="empty-state"><span>🔍</span><p>Nenhum vídeo encontrado. Tente outro termo.</p></div>';
  } else {
    results.forEach(v => searchGrid.appendChild(buildVideoCard(v)));
    // Re-observe new cards
    searchGrid.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible'); // instantly show in overlay
    });
  }
  searchOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  searchOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

closeSearchBtn.addEventListener('click', closeSearch);
searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });

heroSearchBtn.addEventListener('click', () => triggerSearch(heroSearch.value));
heroSearch.addEventListener('keydown', e => { if (e.key === 'Enter') triggerSearch(heroSearch.value); });
headerSearchBtn.addEventListener('click', () => triggerSearch(headerSearchInput.value));
headerSearchInput.addEventListener('keydown', e => { if (e.key === 'Enter') triggerSearch(headerSearchInput.value); });

// ── SMOOTH PAGE TRANSITION (links) ──
document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
  e.preventDefault();
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .25s ease';
  setTimeout(() => { window.location.href = href; }, 250);
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  populateFeatured();
  populateTrending();

  // Re-run observer for dynamically added cards
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  }, 100);
});