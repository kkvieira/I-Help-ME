// ═══════════════════════════════════════════════
//  profile.js — PráticaVídeo profile page
// ═══════════════════════════════════════════════

// ── MENU ──
const menuTrigger = document.getElementById('menuTrigger');
const menuClose   = document.getElementById('menuClose');
const slideMenu   = document.getElementById('slideMenu');
const menuOverlay = document.getElementById('menuOverlay');
function openMenu()  { slideMenu.classList.add('open'); menuOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { slideMenu.classList.remove('open'); menuOverlay.classList.remove('open'); document.body.style.overflow = ''; }
menuTrigger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeModal(); } });

// ── HEADER SCROLL ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

// ── SEARCH ──
document.getElementById('searchBtn').addEventListener('click', () => {
  const q = document.getElementById('searchInput').value.trim();
  if (q) window.location.href = `index.html#search=${encodeURIComponent(q)}`;
});

// ── VIDEO CARD BUILDER ──
function buildVideoCard(video) {
  const catMeta = CATEGORIES[video.cat] || {};
  const card = document.createElement('a');
  card.className = 'video-card';
  card.href = `watch.html?id=${video.id}`;
  card.style.animation = 'fadeIn .35s ease both';
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
        <span class="diff-badge diff-${video.difficulty}">${diffLabel(video.difficulty)}</span>
      </div>
    </div>
  `;
  return card;
}

// ── TABS ──
document.querySelectorAll('.ptab').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(`tab-${tabId}`);
    if (panel) panel.classList.add('active');

    // Handle URL anchor for upload
    if (tabId === 'upload') history.replaceState(null, '', '#upload');
    else history.replaceState(null, '', location.pathname);
  });
});

// Check anchor on load
function checkAnchor() {
  if (location.hash === '#upload') {
    const tab = document.querySelector('[data-tab="upload"]');
    if (tab) tab.click();
    setTimeout(() => {
      document.getElementById('tab-upload').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
}

// ── HISTORY ──
function loadHistory() {
  const grid = document.getElementById('watchedGrid');
  const ids = JSON.parse(localStorage.getItem('pv_history') || '[]');
  const videos = ids.map(id => getVideoById(id)).filter(Boolean);

  grid.innerHTML = '';
  document.getElementById('watchedCount').textContent = videos.length;

  if (videos.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <span>🎬</span>
        <p>Você ainda não assistiu nenhum vídeo.</p>
        <a href="index.html" class="btn-primary">Explorar vídeos</a>
      </div>`;
    return;
  }
  videos.forEach(v => grid.appendChild(buildVideoCard(v)));
}

document.getElementById('clearHistoryBtn').addEventListener('click', () => {
  if (confirm('Deseja limpar todo o histórico de visualizações?')) {
    localStorage.removeItem('pv_history');
    loadHistory();
  }
});

// ── SAVED ──
function loadSaved() {
  const grid = document.getElementById('savedGrid');
  const ids = JSON.parse(localStorage.getItem('pv_saved') || '[]');
  const videos = ids.map(id => getVideoById(id)).filter(Boolean);

  grid.innerHTML = '';
  document.getElementById('savedCount').textContent = videos.length;

  if (videos.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <span>🔖</span>
        <p>Nenhum vídeo salvo ainda.</p>
        <a href="index.html" class="btn-primary">Descobrir vídeos</a>
      </div>`;
    return;
  }
  videos.forEach(v => grid.appendChild(buildVideoCard(v)));
}

// ── MY VIDEOS ──
function loadMyVideos() {
  const grid = document.getElementById('myVideosGrid');
  const myVids = JSON.parse(localStorage.getItem('pv_myvideos') || '[]');
  grid.innerHTML = '';
  document.getElementById('videoCount').textContent = myVids.length;

  if (myVids.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <span>🎥</span>
        <p>Você ainda não publicou nenhum vídeo.</p>
        <button class="btn-primary" id="goUploadBtn2">Enviar primeiro vídeo</button>
      </div>`;
    document.getElementById('goUploadBtn2')?.addEventListener('click', () => {
      document.querySelector('[data-tab="upload"]').click();
    });
    return;
  }
  myVids.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-card';
    const catMeta = CATEGORIES[v.cat] || {};
    card.innerHTML = `
      <div class="video-thumb">
        <div class="thumb-placeholder">🎬</div>
        <span class="video-cat-chip ${catMeta.accentClass || ''}">${catMeta.label || v.cat}</span>
      </div>
      <div class="video-card-body">
        <p class="video-card-title">${v.title}</p>
        <div class="video-card-meta">
          <span class="diff-badge diff-${v.difficulty}">${diffLabel(v.difficulty)}</span>
          <span class="dot">Pendente de revisão</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── EDIT PROFILE ──
const editModal = document.getElementById('editModal');
function openModal()  { editModal.style.display = 'flex'; }
function closeModal() { editModal.style.display = 'none'; }

document.getElementById('editProfileBtn').addEventListener('click', openModal);
document.getElementById('editModalClose').addEventListener('click', closeModal);
document.getElementById('cancelEditBtn').addEventListener('click', closeModal);
editModal.addEventListener('click', e => { if (e.target === editModal) closeModal(); });

document.getElementById('saveProfileBtn').addEventListener('click', () => {
  const name = document.getElementById('editName').value.trim();
  const bio  = document.getElementById('editBio').value.trim();
  if (name) {
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileAvatar').textContent = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    localStorage.setItem('pv_profile_name', name);
  }
  if (bio) {
    document.getElementById('profileBio').textContent = bio;
    localStorage.setItem('pv_profile_bio', bio);
  }
  closeModal();
  showToast('Perfil atualizado com sucesso!');
});

// ── UPLOAD FORM ──
const dropzone = document.getElementById('dropzone');
const videoFileInput = document.getElementById('videoFileInput');
const dropzonePreview = document.getElementById('dropzonePreview');
const dropzoneContent = dropzone.querySelector('.dropzone-content');
const fileNameEl = document.getElementById('fileName');

function showFilePreview(name) {
  fileNameEl.textContent = name;
  dropzoneContent.style.display = 'none';
  dropzonePreview.style.display = 'flex';
}
function clearFile() {
  videoFileInput.value = '';
  dropzoneContent.style.display = '';
  dropzonePreview.style.display = 'none';
}

videoFileInput.addEventListener('change', e => {
  if (e.target.files[0]) showFilePreview(e.target.files[0].name);
});
document.getElementById('removeFile').addEventListener('click', clearFile);

// Drag and drop
dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('drag-over'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('video/')) showFilePreview(file.name);
});

// Thumbnail preview
document.getElementById('thumbInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const preview = document.getElementById('thumbPreview');
    preview.src = ev.target.result;
    preview.style.display = 'block';
    document.getElementById('thumbPlaceholder').style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// Title char count
const titleInput = document.getElementById('videoTitleInput');
const titleCount = document.getElementById('titleCount');
titleInput.addEventListener('input', () => { titleCount.textContent = `${titleInput.value.length}/100`; });

// Upload form submit
document.getElementById('uploadForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('videoTitleInput').value.trim();
  const cat   = document.getElementById('videoCategory').value;
  const diff  = document.getElementById('videoDifficulty').value;
  const desc  = document.getElementById('videoDescInput').value.trim();

  if (!title || !cat || !desc) { showToast('Preencha todos os campos obrigatórios.'); return; }

  const newVid = { title, cat, difficulty: diff, desc, date: new Date().toLocaleDateString('pt-BR') };
  const myVids = JSON.parse(localStorage.getItem('pv_myvideos') || '[]');
  myVids.push(newVid);
  localStorage.setItem('pv_myvideos', JSON.stringify(myVids));

  document.getElementById('uploadForm').style.display = 'none';
  document.getElementById('uploadSuccess').style.display = 'block';
  loadMyVideos();
});

document.getElementById('newUploadBtn')?.addEventListener('click', () => {
  document.getElementById('uploadSuccess').style.display = 'none';
  document.getElementById('uploadForm').style.display = 'block';
  document.getElementById('uploadForm').reset();
  clearFile();
  titleCount.textContent = '0/100';
});

document.getElementById('goUploadBtn')?.addEventListener('click', () => {
  document.querySelector('[data-tab="upload"]').click();
});

// ── LOAD PROFILE DATA ──
function loadProfile() {
  const savedName = localStorage.getItem('pv_profile_name');
  const savedBio  = localStorage.getItem('pv_profile_bio');
  if (savedName) {
    document.getElementById('profileName').textContent = savedName;
    document.getElementById('profileAvatar').textContent = savedName.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    document.getElementById('editName').value = savedName;
  }
  if (savedBio) {
    document.getElementById('profileBio').textContent = savedBio;
    document.getElementById('editBio').value = savedBio;
  }
}

// ── TOAST ──
function showToast(msg) {
  let t = document.getElementById('globalToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'globalToast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── SMOOTH TRANSITION ──
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

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  loadHistory();
  loadSaved();
  loadMyVideos();
  checkAnchor();
});