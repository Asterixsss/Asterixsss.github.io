/* Навигация главной страницы: iframe загружает выбранный раздел. */
(function () {
  if (window.self !== window.top) {
    document.documentElement.classList.add('in-iframe');
    window.parent.postMessage({ page: window.location.pathname.split('/').pop() }, '*');
  }
})();
(function () {
  const frame = document.getElementById('content-frame');
  const navLinks = document.querySelectorAll('.main-nav a[data-page]');
  const nav = document.getElementById('main-nav');
  if (!frame || !navLinks.length) return;
  function setActive(page) {
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === page));
  }
  function loadPage(page) {
    frame.src = page; setActive(page);
    if (nav) nav.classList.remove('open');
  }
  window.loadPage = loadPage;
  window.addEventListener('message', e => { if (e.data && e.data.page) setActive(e.data.page); });
})();

/* Данные стихотворного раздела. */
(function () {
  const links = document.querySelectorAll('.poem-nav-link');
  const title = document.getElementById('poem-display-title');
  const meta = document.getElementById('poem-display-meta');
  const text = document.getElementById('poem-display-text');
  if (!title) return;
  const poems = [
    { title: '1. «Украина»', meta: '1922–1930 · тема родины и истории', text: 'Поэма и стихотворный цикл, к которым Багрицкий возвращался в разные годы. В этих текстах личное переживание соединяется с историческим масштабом.' },
    { title: '2. «Одесса»', meta: '1924 / позднейшие редакции', text: 'Образ южного города связан с морем, портом, шумной улицей и памятью о месте, где формировался поэт. Одесская интонация — одна из важных черт его раннего творчества.' },
    { title: '3. «Птицелов»', meta: '1918; позднейшая редакция — 1926', text: 'Романтическая поэма с необычными образами и ощущением движения. Название сразу задаёт мир природы, наблюдения и приключения.' },
    { title: '4. «Контрабандисты»', meta: '1927', text: 'Морская романтика, риск и стремительный сюжет. Произведение стало одним из известных текстов Багрицкого; его образность хорошо передаёт южный колорит.' },
    { title: '5. «Дума про Опанаса»', meta: '1926', text: 'Поэма о человеке, оказавшемся внутри исторического перелома. В центре — конфликт личного выбора и времени.' },
    { title: '6. «Смерть пионерки»', meta: '1932', text: 'Одна из наиболее известных поэм позднего периода. Текст отражает идеологические и художественные противоречия советской литературы начала 1930-х годов.' }
  ];
  function showPoem(i) {
    const p = poems[i]; if (!p) return;
    title.textContent = p.title; meta.textContent = p.meta; text.textContent = p.text;
    links.forEach((a, n) => a.classList.toggle('active-poem', n === i));
  }
  links.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); showPoem(i); }));
  showPoem(0);
})();

/* Фильтры произведений по категориям. */
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.quote-card');
  if (!buttons.length) return;
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active')); btn.classList.add('active');
    cards.forEach(card => { card.style.display = btn.dataset.filter === 'all' || card.dataset.category === btn.dataset.filter ? '' : 'none'; });
  }));
})();

/* Вкладки галереи. */
(function () {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.gallery-tab-panel');
  if (!buttons.length) return;
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
    panels.forEach(panel => { panel.style.display = panel.id === 'tab-' + btn.dataset.tab ? '' : 'none'; });
  }));
})();

/* Демонстрационная проверка формы. */
const submit = document.getElementById('cf-submit');
if (submit) submit.addEventListener('click', function () {
  let valid = true;
  const name = document.getElementById('cf-name');
  const email = document.getElementById('cf-email');
  const message = document.getElementById('cf-message');
  const consent = document.getElementById('cf-consent');
  document.querySelectorAll('.form-error-msg').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  if (!name.value.trim()) { document.getElementById('err-name').style.display = 'block'; name.classList.add('input-error'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { document.getElementById('err-email').style.display = 'block'; email.classList.add('input-error'); valid = false; }
  if (message.value.trim().length < 10) { document.getElementById('err-message').style.display = 'block'; message.classList.add('input-error'); valid = false; }
  if (!consent.checked) { document.getElementById('err-consent').style.display = 'block'; valid = false; }
  if (valid) { document.getElementById('form-area').style.display = 'none'; document.getElementById('form-success').style.display = 'block'; }
});
