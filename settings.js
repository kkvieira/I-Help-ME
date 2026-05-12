// ═══════════════════════════════════════════════
//  settings.js — PráticaVídeo settings page
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

// ── SEARCH ──
document.getElementById('searchBtn').addEventListener('click', () => {
  const q = document.getElementById('searchInput').value.trim();
  if (q) window.location.href = `index.html#search=${encodeURIComponent(q)}`;
});

// ── SECTION NAV ──
const snavLinks = document.querySelectorAll('.snav-link');
const sections  = document.querySelectorAll('.settings-section');

function activateSection(sectionId) {
  snavLinks.forEach(l => {
    l.classList.toggle('active', l.dataset.section === sectionId);
  });
  sections.forEach(s => {
    s.classList.toggle('active', s.id === `section-${sectionId}`);
  });
}

snavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    activateSection(link.dataset.section);
    history.replaceState(null, '', `#${link.dataset.section}`);
  });
});

// ── TOAST ──
const toast = document.getElementById('toast');
function showToast(msg, duration = 3000) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── LOAD / SAVE SETTINGS ──
function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem('pv_settings') || '{}');

    // Notifications
    if (s.notifNewVideos  !== undefined) document.getElementById('notifNewVideos').checked  = s.notifNewVideos;
    if (s.notifComments   !== undefined) document.getElementById('notifComments').checked   = s.notifComments;
    if (s.notifNewsletter !== undefined) document.getElementById('notifNewsletter').checked = s.notifNewsletter;
    if (s.notifUpdates    !== undefined) document.getElementById('notifUpdates').checked    = s.notifUpdates;
    if (s.notifPush       !== undefined) document.getElementById('notifPush').checked       = s.notifPush;
    if (s.notifSound      !== undefined) document.getElementById('notifSound').checked      = s.notifSound;

    // Privacy
    if (s.privPublicProfile  !== undefined) document.getElementById('privPublicProfile').checked  = s.privPublicProfile;
    if (s.privShowHistory    !== undefined) document.getElementById('privShowHistory').checked    = s.privShowHistory;
    if (s.privSearchable     !== undefined) document.getElementById('privSearchable').checked     = s.privSearchable;
    if (s.privAnalytics      !== undefined) document.getElementById('privAnalytics').checked      = s.privAnalytics;
    if (s.privPersonalization !== undefined) document.getElementById('privPersonalization').checked = s.privPersonalization;

    // Security
    if (s.sec2FA       !== undefined) document.getElementById('sec2FA').checked       = s.sec2FA;
    if (s.secLoginAlert !== undefined) document.getElementById('secLoginAlert').checked = s.secLoginAlert;

    // Appearance
    if (s.autoplay !== undefined) document.getElementById('autoplay').checked = s.autoplay;
    if (s.theme) {
      document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
      const themeOpt = document.querySelector(`[id="theme${capitalize(s.theme)}"]`);
      if (themeOpt) themeOpt.classList.add('active');
      document.querySelector(`input[value="${s.theme}"]`)?.click?.();
    }
  } catch(e) {}
}

function saveSettings() {
  const s = {
    notifNewVideos:      document.getElementById('notifNewVideos').checked,
    notifComments:       document.getElementById('notifComments').checked,
    notifNewsletter:     document.getElementById('notifNewsletter').checked,
    notifUpdates:        document.getElementById('notifUpdates').checked,
    notifPush:           document.getElementById('notifPush').checked,
    notifSound:          document.getElementById('notifSound').checked,
    privPublicProfile:   document.getElementById('privPublicProfile').checked,
    privShowHistory:     document.getElementById('privShowHistory').checked,
    privSearchable:      document.getElementById('privSearchable').checked,
    privAnalytics:       document.getElementById('privAnalytics').checked,
    privPersonalization: document.getElementById('privPersonalization').checked,
    sec2FA:              document.getElementById('sec2FA').checked,
    secLoginAlert:       document.getElementById('secLoginAlert').checked,
    autoplay:            document.getElementById('autoplay').checked,
    theme:               document.querySelector('input[name="theme"]:checked')?.value || 'dark',
  };
  localStorage.setItem('pv_settings', JSON.stringify(s));
}

function capitalize(str) { return str ? str[0].toUpperCase() + str.slice(1) : ''; }

// ── SAVE BUTTONS ──
document.getElementById('saveNotifBtn').addEventListener('click', () => {
  saveSettings();
  showToast('✅ Preferências de notificação salvas!');
});

document.getElementById('savePrivacyBtn').addEventListener('click', () => {
  saveSettings();
  showToast('✅ Configurações de privacidade salvas!');
});

document.getElementById('saveAppearanceBtn').addEventListener('click', () => {
  saveSettings();
  showToast('✅ Aparência salva!');
});

// ── PASSWORD CHANGE ──
document.getElementById('changePassBtn').addEventListener('click', () => {
  const np = document.getElementById('newPass').value;
  const cp = document.getElementById('confirmPass').value;
  if (!np) { showToast('⚠️ Informe a nova senha.'); return; }
  if (np.length < 8) { showToast('⚠️ A senha deve ter pelo menos 8 caracteres.'); return; }
  if (np !== cp) { showToast('⚠️ As senhas não coincidem.'); return; }
  showToast('✅ Senha alterada com sucesso!');
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
});

// ── 2FA ──
document.getElementById('sec2FA').addEventListener('change', function() {
  if (this.checked) {
    showToast('🔐 2FA ativado! Configure seu aplicativo autenticador.');
  } else {
    showToast('2FA desativado.');
  }
});

// ── DELETE ACCOUNT ──
document.getElementById('deleteAccountBtn').addEventListener('click', () => {
  const confirm1 = confirm('Tem certeza? Esta ação é irreversível e removerá TODOS os seus dados.');
  if (confirm1) {
    const confirm2 = confirm('Última confirmação: todos os seus vídeos, histórico e dados serão excluídos permanentemente.');
    if (confirm2) {
      localStorage.clear();
      showToast('Conta excluída. Redirecionando…');
      setTimeout(() => { window.location.href = 'index.html'; }, 2000);
    }
  }
});

// ── REVOKE ALL SESSIONS ──
document.getElementById('revokeAllBtn').addEventListener('click', () => {
  showToast('✅ Todas as outras sessões foram encerradas.');
});

// ── CONNECTIONS ──
document.getElementById('connectGoogle').addEventListener('click', function() {
  const btn = this;
  if (btn.textContent === 'Conectar') {
    btn.textContent = 'Conectando…';
    setTimeout(() => {
      btn.textContent = 'Desconectar';
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-danger');
      btn.closest('.setting-row').querySelector('p').textContent = 'joao.oliveira@gmail.com';
      showToast('✅ Google conectado!');
    }, 1200);
  } else {
    btn.textContent = 'Conectar';
    btn.classList.remove('btn-danger');
    btn.classList.add('btn-secondary');
    btn.closest('.setting-row').querySelector('p').textContent = 'Não conectado';
  }
});

document.getElementById('connectFacebook').addEventListener('click', function() {
  showToast('Integração com Facebook em breve.');
});

document.getElementById('connectGithub').addEventListener('click', function() {
  showToast('Integração com GitHub em breve.');
});

// ── API KEY ──
document.getElementById('genApiKey').addEventListener('click', () => {
  const key = 'pv_' + Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join('');
  const box = document.getElementById('apiKeyDisplay');
  document.getElementById('apiKeyCode').textContent = key;
  box.style.display = 'flex';
  showToast('🔑 Chave de API gerada!');
});

document.getElementById('copyApiKey').addEventListener('click', () => {
  const key = document.getElementById('apiKeyCode').textContent;
  navigator.clipboard?.writeText(key);
  showToast('📋 Chave copiada!');
});

// ── THEME SELECTOR ──
document.querySelectorAll('.theme-option').forEach(opt => {
  const input = opt.querySelector('input');
  opt.addEventListener('click', () => {
    document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    input.checked = true;
    const theme = input.value;
    applyTheme(theme);
  });
});

function applyTheme(theme) {
  // Demo: just show toast (real dark/light would need CSS var overrides)
  const labels = { light: 'Tema claro', dark: 'Tema escuro', system: 'Tema do sistema' };
  showToast(`🎨 ${labels[theme] || 'Tema'} selecionado`);
}

// ── DOWNLOAD DATA ──
document.getElementById('downloadDataBtn').addEventListener('click', () => {
  const data = {
    profile: {
      name: localStorage.getItem('pv_profile_name') || 'João Oliveira',
      bio:  localStorage.getItem('pv_profile_bio')  || '',
    },
    history:  JSON.parse(localStorage.getItem('pv_history')  || '[]'),
    saved:    JSON.parse(localStorage.getItem('pv_saved')    || '[]'),
    myvideos: JSON.parse(localStorage.getItem('pv_myvideos') || '[]'),
    settings: JSON.parse(localStorage.getItem('pv_settings') || '{}'),
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'praticavideo_meus_dados.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Dados exportados com sucesso!');
});

// ── HASH NAVIGATION ──
function checkHash() {
  const hash = location.hash.replace('#', '');
  const validSections = ['account','notifications','privacy','security','connections','appearance'];
  if (validSections.includes(hash)) activateSection(hash);
}

// ── SMOOTH TRANSITION ──
document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http')) return;
  e.preventDefault();
  saveSettings();
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .25s ease';
  setTimeout(() => { window.location.href = href; }, 250);
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  checkHash();
});