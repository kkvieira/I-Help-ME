// ═══════════════════════════════════════════════
//  watch.js — I Help ME video player page
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ── HEADER SCROLL ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

// ── STATE ──
const params = new URLSearchParams(window.location.search);
const videoId = params.get('id');
const video   = getVideoById(videoId);

// ── REAL VIDEO PLAYER ──
const videoPlayer = document.getElementById('videoPlayer');
const playOverlay = document.getElementById('playOverlay');
const playerControls = document.getElementById('playerControls');
let totalSecs = 0; // Will be updated by videoPlayer.duration

// Helper functions
function parseDuration(str) {
  const parts = str.split(':').map(Number);
  return parts.length === 3 ? parts[0]*3600 + parts[1]*60 + parts[2] : parts[0]*60 + parts[1];
}
function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
  return `${m}:${s.toString().padStart(2,'0')}`;
}

// Functions to control playback
function startPlayback() {
  playOverlay.style.display = 'none';
  playerControls.classList.add('active');
  document.getElementById('playerWrap').classList.add('active');
  videoPlayer.play();
}

function pausePlayback() {
  videoPlayer.pause();
}

function togglePlayPause() {
  if (videoPlayer.paused) {
    startPlayback();
  } else {
    pausePlayback();
  }
}

function seekBy(offset) {
  if (!videoPlayer.duration) return;
  const nextTime = Math.min(Math.max(0, videoPlayer.currentTime + offset), videoPlayer.duration);
  videoPlayer.currentTime = nextTime;
  if (videoPlayer.paused) {
    startPlayback();
  }
}

// Update play/pause icon based on video state
function updatePlayIcon() {
  const icon = document.getElementById('playIcon');
  if (!icon) return;
  if (videoPlayer.paused) {
    icon.innerHTML = '<polygon points="5,3 19,12 5,21"/>'; // Play icon
  } else {
    icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'; // Pause icon
  }
}

// Event listeners for the real video player
videoPlayer.addEventListener('play', () => {
  updatePlayIcon();
  playOverlay.style.display = 'none';
  playerControls.classList.add('active');
  document.getElementById('playerWrap').classList.add('active');
});
videoPlayer.addEventListener('pause', updatePlayIcon);
videoPlayer.addEventListener('ended', () => {
  updatePlayIcon();
      // Auto-advance to next in queue
      const nextLink = document.querySelector('.queue-item:not(.playing)');
      if (nextLink) {
        setTimeout(() => {
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity .25s ease';
          setTimeout(() => { window.location.href = nextLink.href; }, 250);
        }, 1200);
      }
    }
);

videoPlayer.addEventListener('timeupdate', () => {
  const progress = videoPlayer.duration ? (videoPlayer.currentTime / videoPlayer.duration) * 100 : 0;
  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('progressRange').value = progress;
  document.getElementById('timeDisplay').textContent = `${formatTime(videoPlayer.currentTime)} / ${formatTime(videoPlayer.duration)}`;
});

videoPlayer.addEventListener('loadedmetadata', () => {
  totalSecs = videoPlayer.duration;
  document.getElementById('timeDisplay').textContent = `0:00 / ${formatTime(totalSecs)}`;
  // Set initial volume
  videoPlayer.volume = document.getElementById('volRange').value / 100;
});

videoPlayer.addEventListener('volumechange', () => {
  const muteBtn = document.getElementById('muteBtn');
  if (muteBtn) {
    muteBtn.textContent = videoPlayer.muted || videoPlayer.volume === 0 ? '🔇' : '🔊';
  }
  document.getElementById('volRange').value = videoPlayer.muted ? 0 : videoPlayer.volume * 100;
});


// ── SAVE TO HISTORY ──
function saveToHistory(vid) {
  try {
    const history = JSON.parse(localStorage.getItem('pv_history') || '[]');
    const filtered = history.filter(id => id !== vid.id);
    filtered.unshift(vid.id);
    localStorage.setItem('pv_history', JSON.stringify(filtered.slice(0, 50)));
  } catch(e) {}
}

// ── POPULATE PAGE ──
function populatePage() {
  if (!video) {
    document.querySelector('.watch-layout').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1; padding: 6rem 2rem;">
        <span>❌</span>
        <p>Vídeo não encontrado.</p>
        <a href="index.html" class="btn-primary">Voltar ao início</a>
      </div>`;
    return;
  }

  const catMeta = CATEGORIES[video.cat] || {};
  document.title = `${video.title} — I Help ME`;

  // Set video source and poster
  if (video.videoFile) {
    videoPlayer.src = video.videoFile;
  } else {
    console.warn(`Video ${video.id} does not have a videoFile specified.`);
  }
  videoPlayer.poster = video.thumb || ''; // Use the thumb as poster

  // Breadcrumb
  const breadCat = document.getElementById('watchBreadCat');
  breadCat.textContent = catMeta.label || video.cat;
  breadCat.href = `category.html?cat=${video.cat}`;
  document.getElementById('watchBreadTitle').textContent = video.title.slice(0, 40) + (video.title.length > 40 ? '…' : '');

  // Meta overlay
  document.getElementById('playerMetaOverlay').innerHTML = `
    <span class="video-cat-chip ${catMeta.accentClass || ''}" style="margin-bottom:.3rem;display:inline-block;">${catMeta.label}</span>
    <div style="font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;">${video.title}</div>
  `;

  // Category badge
  const badge = document.getElementById('videoCatBadge');
  badge.textContent = catMeta.label || video.cat;
  badge.className = `video-cat-badge ${catMeta.accentClass || ''}`;

  // Title
  document.getElementById('videoTitle').textContent = video.title;

  // Author
  document.getElementById('authorAvatar').textContent = video.authorInitials;
  document.getElementById('authorName').textContent   = video.author;
  document.getElementById('authorSubs').textContent   = `${Math.floor(Math.random()*90+10)}K inscritos`;

  // Stats
  document.getElementById('likeCount').textContent = video.likes.toLocaleString('pt-BR');
  document.getElementById('videoViews').textContent = `${video.views} visualizações`;
  document.getElementById('videoDate').textContent  = `Publicado ${video.date}`;

  // Description
  document.getElementById('videoDesc').innerHTML = video.desc.replace(/\n/g, '<br>');

  // Timeline
  const timeline = document.getElementById('contentTimeline');
  video.timeline.forEach(item => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `<span class="timeline-time">${item.time}</span><span class="timeline-text">${item.text}</span>`;
    el.addEventListener('click', () => {
      const parts = item.time.split(':').map(Number); // Assuming MM:SS or HH:MM:SS
      const seekTime = parts.length === 3 ? parts[0]*3600 + parts[1]*60 + parts[2] : parts[0]*60 + parts[1];
      videoPlayer.currentTime = seekTime;
      startPlayback(); // Ensure video plays after seeking
    });
    timeline.appendChild(el);
  });

  // Tags
  const tagsList = document.getElementById('videoTags');
  video.tags.forEach(tag => {
    const el = document.createElement('span');
    el.className = 'tag-item';
    el.textContent = `#${tag}`;
    el.addEventListener('click', () => { window.location.href = `index.html#search=${encodeURIComponent(tag)}`; });
    tagsList.appendChild(el);
  });

  // Queue
  const queueList  = document.getElementById('queueList');
  const queueVideos = VIDEOS.filter(v => v.id !== video.id && v.cat === video.cat);
  const allOthers   = VIDEOS.filter(v => v.id !== video.id && v.cat !== video.cat);
  const queue       = [...queueVideos, ...allOthers].slice(0, 12);

  queue.forEach((v, i) => {
    const catM = CATEGORIES[v.cat] || {};
    const item = document.createElement('a');
    item.className = 'queue-item';
    item.href = `watch.html?id=${v.id}`;
    item.innerHTML = ` 
      <div class="queue-thumb">
        <img src="${v.thumb || ''}" alt="${v.title}" style="width:100%; height:100%; object-fit:cover;">
        ${!v.thumb ? `<div class="queue-thumb-placeholder">${v.emoji}</div>` : ''}
      </div>
      <div class="queue-info">
        <span class="queue-num">${i + 1}</span>
        <p class="queue-title">${v.title}</p>
        <p class="queue-meta">${v.author} · ${v.duration}</p>
      </div>
    `;
    queueList.appendChild(item);
  });

  // Player controls
  document.getElementById('bigPlayBtn').addEventListener('click', startPlayback);
  videoPlayer.addEventListener('click', (e) => { // Click on video itself to play/pause
    if (e.target.closest('#bigPlayBtn')) return;
    togglePlayPause();
  });

  document.getElementById('progressRange').addEventListener('input', e => {
    const seekTime = (parseFloat(e.target.value) / 100) * videoPlayer.duration;
    videoPlayer.currentTime = seekTime;
  });

  document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);

  document.getElementById('volRange').addEventListener('input', e => {
    videoPlayer.volume = parseFloat(e.target.value) / 100;
    videoPlayer.muted = false; // Unmute if volume is adjusted
  });

  document.getElementById('muteBtn').addEventListener('click', function() {
    videoPlayer.muted = !videoPlayer.muted;
  });

  document.getElementById('speedSelect').addEventListener('change', e => {
    videoPlayer.playbackRate = parseFloat(e.target.value);
  });

  document.getElementById('rewindBtn').addEventListener('click', () => seekBy(-10));
  document.getElementById('forwardBtn').addEventListener('click', () => seekBy(10));

  document.getElementById('fullscreenBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      videoPlayer.requestFullscreen?.(); // Request fullscreen on the video element
    } else {
      document.exitFullscreen?.();
    }
  });

  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlayPause();
    }
    if (e.code === 'ArrowLeft') {
      e.preventDefault();
      seekBy(-10);
    }
    if (e.code === 'ArrowRight') {
      e.preventDefault();
      seekBy(10);
    }
  });

  // Like button (existing logic)
  const likeBtn = document.getElementById('likeBtn');
  const savedLikes = JSON.parse(localStorage.getItem('pv_likes') || '[]');
  if (savedLikes.includes(video.id)) likeBtn.classList.add('liked');

  likeBtn.addEventListener('click', () => {
    const currentLikes = JSON.parse(localStorage.getItem('pv_likes') || '[]');
    const idx = currentLikes.indexOf(video.id);
    const count = document.getElementById('likeCount');
    if (idx === -1) {
      currentLikes.push(video.id);
      likeBtn.classList.add('liked');
      count.textContent = (video.likes + 1).toLocaleString('pt-BR');
    } else {
      currentLikes.splice(idx, 1);
      likeBtn.classList.remove('liked');
      count.textContent = video.likes.toLocaleString('pt-BR');
    }
    localStorage.setItem('pv_likes', JSON.stringify(currentLikes));
  });

  // Save button (existing logic)
  const saveBtn = document.getElementById('saveBtn');
  const savedVideos = JSON.parse(localStorage.getItem('pv_saved') || '[]');
  if (savedVideos.includes(video.id)) saveBtn.innerHTML = saveBtn.innerHTML.replace('Salvar', 'Salvo ✓');

  saveBtn.addEventListener('click', () => {
    const s = JSON.parse(localStorage.getItem('pv_saved') || '[]');
    const i = s.indexOf(video.id);
    if (i === -1) {
      s.push(video.id);
      saveBtn.innerHTML = saveBtn.innerHTML.replace('Salvar', 'Salvo ✓');
    } else {
      s.splice(i, 1);
      saveBtn.innerHTML = saveBtn.innerHTML.replace('Salvo ✓', 'Salvar');
    }
    localStorage.setItem('pv_saved', JSON.stringify(s));
  });

  // Share button (existing logic)
  document.getElementById('shareBtn').addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({ title: video.title, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  });

  // Save to history (existing logic)
  saveToHistory(video);
}

// ── SMOOTH TRANSITION ── (existing logic)
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

// ── INIT ── (existing logic)
document.addEventListener('DOMContentLoaded', populatePage);