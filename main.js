// Sixty landing page. No dependencies.

const PRICES = {
  usd: { sym: '$', starter: [149, 124], growth: [299, 249], scale: [599, 499], setup: 499 },
  aed: { sym: 'AED ', starter: [549, 459], growth: [1099, 919], scale: [2199, 1835], setup: 1835 },
  gbp: { sym: '£', starter: [119, 99], growth: [239, 199], scale: [479, 399], setup: 399 },
};

const root = document.documentElement;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } },
};

// ---- Contact form → /api/contact (emailed to the team via Resend) ----
(() => {
  const form = $('#contactForm');
  if (!form) return;
  const status = $('#f-status');
  const submit = $('#f-submit');
  const label = submit.innerHTML;

  // Pricing buttons remember which plan was clicked.
  $$('[data-plan]').forEach((a) => a.addEventListener('click', () => {
    $('#f-plan').value = a.dataset.plan;
    const interest = a.dataset.plan === 'AI Call Agent' ? 'AI Call Agent' : 'WhatsApp AI Agent';
    const radio = form.querySelector(`input[name="interest"][value="${interest}"]`);
    if (radio) radio.checked = true;
  }));

  const say = (msg, kind) => { status.textContent = msg; status.dataset.kind = kind || ''; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const bad = !data.name?.trim() ? '#f-name'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email || '') ? '#f-email'
      : (String(data.phone || '').replace(/\D/g, '').length < 7) ? '#f-phone'
      : !data.company?.trim() ? '#f-company'
      : !data.industry ? '#f-industry' : null;
    $$('.field.err', form).forEach((f) => f.classList.remove('err'));
    if (bad) {
      $(bad).closest('.field').classList.add('err');
      $(bad).focus();
      return say('Please fill in the highlighted field.', 'error');
    }

    submit.disabled = true;
    submit.innerHTML = 'Sending…';
    say('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || 'Something went wrong. Please email management@devmatesolutions.com.');
      form.reset();
      form.classList.add('sent');
      say(`Thanks${data.name ? `, ${data.name.split(' ')[0]}` : ''}! Your message is with our team. We'll be in touch shortly.`, 'ok');
    } catch (err) {
      say(err.message === 'Failed to fetch' ? 'No connection. Please try again.' : err.message, 'error');
    } finally {
      submit.disabled = false;
      submit.innerHTML = label;
    }
  });
})();

// ---- Currency ($ / AED / £) + billing ----
// Currency drives everything: prices, and which hero chat script shows (AED→UAE, $→USA, £→UK).
const CUR_REGION = { aed: 'uae', usd: 'usa', gbp: 'uk' };
const state = { region: 'uae', cur: 'aed', bill: 'm' };
const fmt = (n) => n.toLocaleString('en-US');

function guessCurrency() {
  const saved = store.get('sm-cur');
  if (PRICES[saved]) return saved;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  if (/^Asia\/(Dubai|Muscat|Qatar|Bahrain|Kuwait|Riyadh)$/.test(tz)) return 'aed';
  if (/^Europe\/(London|Belfast|Guernsey|Isle_of_Man|Jersey)$/.test(tz)) return 'gbp';
  return 'usd';
}

function renderPrices() {
  const p = PRICES[state.cur];
  const i = state.bill === 'y' ? 1 : 0;
  $$('[data-price]').forEach((el) => {
    const k = el.dataset.price;
    if (k === 'setup') el.textContent = p.sym + fmt(p.setup);
    else if (p[k]) el.textContent = p.sym + fmt(p[k][i]);
  });
  $$('[data-billed]').forEach((el) => {
    const k = el.dataset.billed;
    el.textContent = state.bill === 'y'
      ? `${p.sym}${fmt(p[k][0] * 10)} billed yearly`
      : 'Billed monthly · cancel anytime';
  });
  $$('[data-set-cur]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setCur === state.cur)));
  $$('[data-set-bill]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setBill === state.bill)));
}

function setCurrency(c, save) {
  if (!PRICES[c]) return;
  state.cur = c;
  state.region = CUR_REGION[c];
  root.dataset.region = state.region;
  if (save) store.set('sm-cur', c);
  renderPrices();
  chat.restart();
}

$$('[data-set-cur]').forEach((b) => b.addEventListener('click', () => setCurrency(b.dataset.setCur, true)));
$$('[data-set-bill]').forEach((b) => b.addEventListener('click', () => { state.bill = b.dataset.setBill; renderPrices(); }));

// ---- Hero: 60-second dial + chat ----
const chat = (() => {
  const list = $('#chat');
  const num = $('#dialNum');
  const prog = $('.dial-prog');
  let sec = 0, timer = null, visible = true;

  const items = () => $$('li', list).filter((li) => getComputedStyle(li).display !== 'none');
  function draw() {
    num.textContent = String(Math.min(sec, 60)).padStart(2, '0');
    prog.style.strokeDasharray = `${Math.min(sec, 60)} 60`;
    items().forEach((li) => li.classList.toggle('on', Number(li.dataset.t) <= sec));
  }
  function tick() {
    sec += 1;
    if (sec > 63) sec = 0; // hold on 60 for a moment, then loop
    draw();
  }
  function start() { if (!timer && visible && !reduced) timer = setInterval(tick, 190); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); sec = reduced ? 60 : 0; draw(); start(); }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(list);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  return { restart };
})();

// ---- Reveal on scroll ----
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach((el, i) => { el.style.setProperty('--d', `${(i % 4) * 0.08}s`); io.observe(el); });

// ---- 60-second track fills as you scroll ----
const track = $('#track');
const fill = $('#trackFill');
const steps = $$('.step', track);
function onScroll() {
  const r = track.getBoundingClientRect();
  const vh = innerHeight;
  const p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.6)));
  fill.style.width = `${p * 100}%`;
  steps.forEach((s, i) => s.classList.toggle('on', p >= i / (steps.length - 1) - 0.001));
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);

// ---- Final countdown ring ----
(() => {
  const el = $('#finalNum');
  const ring = $('.final-dial');
  let n = 60, t = null;
  const draw = () => { el.textContent = String(n).padStart(2, '0'); ring.style.setProperty('--p', `${((60 - n) / 60) * 100}%`); };
  const run = () => { if (t || reduced) return; t = setInterval(() => { n = n <= 0 ? 60 : n - 1; draw(); }, 1000); };
  new IntersectionObserver(([e]) => { if (e.isIntersecting) run(); else { clearInterval(t); t = null; } }).observe(ring);
  draw();
})();

// ---- Use-case tabs ----
(() => {
  const tabs = $$('.tabs [role="tab"]');
  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $(`#${t.getAttribute('aria-controls')}`).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });
})();

// ---- Pointer glow on cards and buttons ----
if (matchMedia('(hover: hover)').matches) {
  $$('.glow').forEach((el) => el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--gx', `${e.clientX - r.left}px`);
    el.style.setProperty('--gy', `${e.clientY - r.top}px`);
  }));
  $$('.btn').forEach((el) => el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }));
}

setCurrency(guessCurrency(), false);
onScroll();
