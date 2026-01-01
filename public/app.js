(function () {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  const btn = document.getElementById('btn-send-data');
  const logEl = document.getElementById('log');

  function log(msg) {
    if (logEl) {
      logEl.textContent += msg + '\n';
    } else {
      console.log(msg);
    }
  }

  if (!tg) {
    log('Telegram WebApp obyekti topilmadi. Bu sahifani Telegram ichidan oching.');
    return;
  }

  tg.ready();
  log('Telegram WebApp tayyor.');

  if (btn) {
    btn.addEventListener('click', () => {
      const payload = {
        type: 'test_from_webapp',
        ts: Date.now()
      };
      try {
        tg.sendData(JSON.stringify(payload));
        log('sendData yuborildi: ' + JSON.stringify(payload));
      } catch (e) {
        log('sendData xato: ' + e.message);
      }
    });
  }
})();
