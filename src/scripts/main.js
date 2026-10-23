// ===== CONFIGURACIÓN =====
const CONFIG = { whatsapp: '59100000000', redirectIfMinor: 'https://google.com' };

// ===== Tema (vista previa: ?tema=rosa o ?tema=violeta) =====
const TEMAS = ['azul', 'rosa', 'violeta'];
const tema = new URLSearchParams(location.search).get('tema');
if (TEMAS.includes(tema)) document.documentElement.dataset.theme = tema;

// ===== Verificación +18 =====
const gate = document.getElementById('gate');
const store = (v) => { try { return v ? sessionStorage.setItem('bf-age', v) : sessionStorage.getItem('bf-age'); } catch { return null; } };
const openSite = () => { gate.hidden = true; document.body.classList.remove('locked'); };
if (store() === 'ok') openSite(); else document.getElementById('age-yes').focus();
document.getElementById('age-yes').addEventListener('click', () => { store('ok'); openSite(); });
document.getElementById('age-no').addEventListener('click', () => {
  document.getElementById('gate-title').textContent = 'Acceso denegado';
  document.getElementById('gate-text').textContent = 'Este sitio es solo para mayores de 18 años.';
  document.getElementById('gate-btns').remove();
  setTimeout(() => { location.href = CONFIG.redirectIfMinor; }, 2500);
});

// ===== Acordeón =====
document.querySelectorAll('.acc-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.acc-btn').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    btn.setAttribute('aria-expanded', String(!open));
  });
});

// ===== Animación al scroll =====
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  els.forEach((e) => io.observe(e));
} else els.forEach((e) => e.classList.add('in'));

// ===== Brillo que sigue al cursor / dedo =====
document.querySelectorAll('.glass').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// ===== Parallax de la flor del hero =====
const root = document.documentElement;
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { root.style.setProperty('--sy', scrollY); ticking = false; });
}, { passive: true });

// ===== Galería (lightbox) =====
const box = document.getElementById('lightbox');
document.querySelectorAll('.tile').forEach((tile) => {
  tile.addEventListener('click', () => {
    const src = tile.dataset.src;
    if (!src) return;
    const img = box.querySelector('img');
    img.src = src; img.alt = tile.dataset.title;
    box.showModal();
  });
});
box?.addEventListener('click', (e) => { if (e.target === box) box.close(); });

// ===== Formulario (conectar a Formspree, Netlify Forms o tu API) =====
document.getElementById('form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const f = ev.target, msg = document.getElementById('form-msg');
  const ok = f.nombre.value.trim() && /^\S+@\S+\.\S+$/.test(f.email.value) && f.mensaje.value.trim();
  if (!ok) { msg.textContent = 'Completa tu nombre, un email válido y un mensaje.'; return; }
  // TODO: enviar los datos al servidor aquí
  msg.textContent = 'Mensaje enviado. Te responderemos en breve.';
  f.reset();
});

// ===== WhatsApp =====
document.querySelectorAll('[data-wa]').forEach((a) => { a.href = a.href.replace('59100000000', CONFIG.whatsapp); });
