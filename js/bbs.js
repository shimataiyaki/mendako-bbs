// ===== 設定 =====
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwXthMihT2LwhUXBD3IawKn2XuQh-VsfVm6F-9_3pgsMJ6dncAoxMi0ooDNVJ8raZ1vfA/exec'; // ★ここを変更
const KEY_PART1 = 'UUDDL';
const KEY_PART2 = 'RLRBA';
const ENCRYPTION_KEY = KEY_PART1 + KEY_PART2;

// ===== セッションID =====
const sessionId = sessionStorage.getItem('mendang_id') || crypto.randomUUID().slice(0, 8);
sessionStorage.setItem('mendang_id', sessionId);
const DISPLAY_NAME = `名無しさん@${sessionId}`;

// ===== ヘルプモーダル =====
const modal = document.getElementById('help-modal');
const helpBtn = document.getElementById('help-btn');
const closeBtn = document.getElementById('close-help');

helpBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
// モーダル外クリックでも閉じる（オーバーレイ部分）
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// ===== 緊急脱出（Escキー）=====
// モーダルが開いていれば閉じるだけ、閉じていれば緊急脱出
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
    } else {
      window.location.href = 'https://classroom.google.com/';
    }
  }
});

// ===== 送信 =====
document.getElementById('submit').addEventListener('click', () => {
  const msg = document.getElementById('message').value.trim();
  if (!msg) return;

  const encrypted = CryptoJS.AES.encrypt(msg, ENCRYPTION_KEY).toString();

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = GAS_URL;
  form.target = 'hidden_iframe';
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'message';
  input.value = encrypted;
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  form.remove();

  document.getElementById('message').value = '';
  setTimeout(fetchPosts, 1500);
});

// ===== データ取得と復号 =====
function fetchPosts() {
  const cb = 'cb_' + Date.now();
  window[cb] = (data) => {
    const container = document.getElementById('posts');
    container.innerHTML = '';
    if (!Array.isArray(data)) return;

    data.forEach(item => {
      try {
        const bytes = CryptoJS.AES.decrypt(item.message, ENCRYPTION_KEY);
        const plain = bytes.toString(CryptoJS.enc.Utf8);
        if (!plain) return;

        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `
          <span class="post-name">${DISPLAY_NAME}</span>
          <span class="post-time">${new Date(item.timestamp).toLocaleString()}</span>
          <div class="post-body">${escapeHtml(plain)}</div>
        `;
        container.appendChild(div);
      } catch (e) {}
    });
    delete window[cb];
  };

  const script = document.createElement('script');
  script.src = `${GAS_URL}?callback=${cb}`;
  document.body.appendChild(script);
  script.onload = () => script.remove();
}

// 簡易XSS対策
function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, c => map[c]);
}

// 初回読み込み
fetchPosts();
