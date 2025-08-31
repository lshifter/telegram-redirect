// Конфіг: посилання на Telegram live
const TELEGRAM_LIVE = 'https://t.me/+fytZa5svbPgyMzJi';

// Прості селектори
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const store = window.localStorage;

// Анімація траси + декоративний болід
(function initTrack(){
  const path = $('#trackPath');
  if(path){
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    // програвання малювання
    requestAnimationFrame(()=> setTimeout(()=> path.style.strokeDashoffset = '0', 120));
  }
  const car = document.querySelector('.decor-car');
  if(car){
    car.animate([
      { transform: 'translateY(0) rotate(-6deg)' },
      { transform: 'translateY(-8px) rotate(6deg)' },
      { transform: 'translateY(0) rotate(-6deg)' }
    ], { duration: 3800, iterations: Infinity, easing: 'ease-in-out' });
  }
})();

// Mobile menu toggle
(function mobileMenu(){
  const burger = $('#burger');
  const nav = $('.main-nav');
  if(!burger || !nav) return;
  burger.addEventListener('click', () => {
    const open = getComputedStyle(nav).display !== 'none';
    if(open){
      nav.style.display = 'none';
      burger.setAttribute('aria-expanded', 'false');
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '60px';
      nav.style.right = '12px';
      nav.style.background = 'linear-gradient(180deg, rgba(3,6,12,0.95), rgba(3,6,12,0.98))';
      nav.style.padding = '10px';
      nav.style.borderRadius = '10px';
      burger.setAttribute('aria-expanded', 'true');
    }
  });
})();

// Подрахунок підтримок — localStorage
(function supportButtons(){
  const drivers = ['norris','leclerc','verstappen'];
  drivers.forEach(id => {
    const key = 'support_'+id;
    const cnt = parseInt(store.getItem(key) || '0', 10);
    const el = document.querySelector(`[data-count="${id}"]`);
    if(el) el.textContent = cnt;
  });

  $$('.support-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // невелика анімація
      btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 220 });

      // update count
      const id = btn.getAttribute('data-driver') || 'unknown';
      const key = 'support_' + id;
      const prev = parseInt(store.getItem(key) || '0', 10);
      store.setItem(key, String(prev + 1));
      const el = document.querySelector(`[data-count="${id}"]`);
      if(el) el.textContent = prev + 1;

      // unlock stream flag
      store.setItem('unlocked', '1');

      showToast('Підтримка зарахована ✔');
      // note: link opens in new tab thanks to target="_blank"
    });
  });
})();

// Подія: зафіксувати ставку (Safety Car)
(function bets(){
  const placeBtn = $('#placeBet');
  const status = $('#betStatus');
  if(!placeBtn) return;
  placeBtn.addEventListener('click', () => {
    const sel = document.querySelector('input[name="safetycar"]:checked');
    if(!sel){ showToast('Оберіть варіант: Так або Ні'); return; }
    store.setItem('bet_safetycar', sel.value);
    store.setItem('unlocked', '1'); // також відкриває доступ до ефіру
    status.textContent = 'Ставка збережена: ' + (sel.value === 'yes' ? 'очікується Safety Car' : 'без Safety Car');
    showToast('Ставка підтверджена ✔');
  });
})();

// Модальне вікно / трансляція
(function liveModal(){
  const openBtn = $('#openLive');
  const modal = $('#liveModal');
  const closeBtn = $('#closeLive');
  const playBtn = $('#playStream');
  const gateMsg = $('#gateMsg');
  const unlockMsg = $('#unlockMsg');

  function unlocked(){
    return store.getItem('unlocked') === '1' || !!store.getItem('bet_safetycar');
  }
  function updateGateUI(){
    if(unlocked()){
      gateMsg.hidden = true;
      unlockMsg.hidden = false;
    } else {
      gateMsg.hidden = false;
      unlockMsg.hidden = true;
    }
  }

  if(!openBtn || !modal) return;
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateGateUI();
    modal.hidden = false;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  closeBtn.addEventListener('click', () => {
    modal.hidden = true;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
  modal.addEventListener('click', (e) => {
    if(e.target === modal){
      modal.hidden = true;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  playBtn.addEventListener('click', () => {
    if(unlocked()){
      // перехід у Telegram
      window.open(TELEGRAM_LIVE, '_blank', 'noopener');
    } else {
      showToast('Підтримайте пілота або підтвердіть ставку, щоб відкрити ефір.');
    }
  });
})();

// Тости — прості повідомлення внизу
function showToast(text, duration = 2400){
  const node = document.createElement('div');
  node.textContent = text;
  node.setAttribute('role','status');
  Object.assign(node.style, {
    position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: '18px',
    background: 'rgba(0,0,0,0.78)', color: '#fff', padding: '10px 14px', borderRadius: '10px', zIndex: 9999,
    fontWeight: 700, border: '1px solid rgba(255,255,255,0.06)'
  });
  document.body.appendChild(node);
  setTimeout(() => { node.style.transition = 'opacity .3s'; node.style.opacity = '0'; setTimeout(()=> node.remove(), 300); }, duration);
}

// Accessibility: ESC closes modal
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    const modal = document.querySelector('.modal.active') || $('#liveModal');
    if(modal && !modal.hidden){
      modal.hidden = true;
      document.body.style.overflow = '';
    }
  }
});

