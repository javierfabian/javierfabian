(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const menuBtn = document.getElementById('menuBtn');
  const links = document.getElementById('navLinks');

  // Modo oscuro: recuerda la elección o usa la del sistema
  let saved = null;
  try { saved = localStorage.getItem('tema'); } catch (e) {}
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function aplicarTema(t) {
    root.dataset.theme = t;
    themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
  aplicarTema(saved || (prefiereOscuro ? 'dark' : 'light'));

  themeBtn.addEventListener('click', () => {
    const nuevo = root.dataset.theme === 'dark' ? 'light' : 'dark';
    aplicarTema(nuevo);
    try { localStorage.setItem('tema', nuevo); } catch (e) {}
  });

  // Menú móvil
  function cerrarMenu() {
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '☰';
  }
  menuBtn.addEventListener('click', () => {
    const abierto = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', abierto);
    menuBtn.textContent = abierto ? '✕' : '☰';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrarMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarMenu(); });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
