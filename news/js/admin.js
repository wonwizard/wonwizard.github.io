(function () {
  const STORAGE_KEY = 'smk_gh_config';

  // ── Config ──────────────────────────────────────────────
  function loadConfig() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  }
  function saveConfig(cfg) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  }

  // ── Toast ────────────────────────────────────────────────
  let toastTimer;
  function showToast(msg, type = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.className = 'toast'; }, 3000);
  }

  // ── GitHub API ───────────────────────────────────────────
  async function ghRequest(method, path, body, pat) {
    const res = await fetch(`https://api.github.com${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${pat}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
    return data;
  }

  async function getFileSha(owner, repo, branch, filePath, pat) {
    try {
      const data = await ghRequest('GET', `/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, null, pat);
      return data.sha;
    } catch {
      return null; // 파일이 없으면 null (새 파일 생성)
    }
  }

  async function putFile(owner, repo, branch, filePath, content, message, pat) {
    const sha = await getFileSha(owner, repo, branch, filePath, pat);
    const body = {
      message,
      branch,
      content: btoa(unescape(encodeURIComponent(content))),
    };
    if (sha) body.sha = sha;
    return ghRequest('PUT', `/repos/${owner}/${repo}/contents/${filePath}`, body, pat);
  }

  // ── GitHub API: 파일 내용 읽기 ───────────────────────────
  async function getFileContent(owner, repo, branch, filePath, pat) {
    const data = await ghRequest('GET', `/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, null, pat);
    return JSON.parse(decodeURIComponent(escape(atob(data.content.replace(/\n/g, '')))));
  }

  // ── State ────────────────────────────────────────────────
  let articles = []; // [{ title, source, url, bullets: [] }]

  function emptyArticle() {
    return { title: '', source: '', url: '', bullets: [''] };
  }

  // ── 날짜 선택 시 기존 데이터 로드 ────────────────────────
  async function loadBriefingForDate(date) {
    const cfg = loadConfig();
    if (!cfg.pat) return; // 설정 없으면 스킵

    const statusEl = document.getElementById('publish-status');
    statusEl.textContent = '불러오는 중...';

    try {
      const { owner, repo, branch, pat } = cfg;
      const data = await getFileContent(owner, repo, branch, `news/data/briefings/${date}.json`, pat);

      // 카테고리 반영
      document.getElementById('field-category').value = data.category || 'AI';

      // 기사 목록 반영
      articles = data.articles.map(a => ({
        title: a.title || '',
        source: a.source || '',
        url: a.url || '',
        bullets: a.bullets && a.bullets.length ? a.bullets : [''],
      }));
      renderArticles();
      statusEl.textContent = `${date} 데이터 로드됨`;
    } catch (err) {
      // 해당 날짜 데이터 없음 → 빈 폼으로 초기화
      articles = [emptyArticle()];
      renderArticles();
      statusEl.textContent = '새 브리핑';
    }
  }

  // ── Render articles ──────────────────────────────────────
  function renderArticles() {
    const list = document.getElementById('articles-list');
    list.innerHTML = '';
    articles.forEach((art, idx) => {
      list.appendChild(buildArticleCard(art, idx));
    });
  }

  function buildArticleCard(art, idx) {
    const card = document.createElement('div');
    card.className = 'article-card';

    // Header
    const header = document.createElement('div');
    header.className = 'article-card-header';
    header.innerHTML = `
      <span class="article-card-title ${art.title ? '' : 'empty'}">
        ${art.title || '(제목 없음)'}
      </span>
      <button class="btn btn-danger" style="margin-left:8px;padding:4px 10px;font-size:12px" data-delete="${idx}">삭제</button>
    `;
    header.querySelector('[data-delete]').addEventListener('click', (e) => {
      e.stopPropagation();
      articles.splice(idx, 1);
      renderArticles();
    });
    header.addEventListener('click', () => {
      const body = card.querySelector('.article-card-body');
      body.classList.toggle('open');
    });

    // Body
    const body = document.createElement('div');
    body.className = 'article-card-body open';

    const fields = document.createElement('div');
    fields.className = 'card-fields';

    function inputField(placeholder, key) {
      const input = document.createElement('input');
      input.type = key === 'url' ? 'url' : 'text';
      input.placeholder = placeholder;
      input.value = art[key] || '';
      input.addEventListener('input', () => {
        art[key] = input.value;
        const titleEl = header.querySelector('.article-card-title');
        if (key === 'title') {
          titleEl.textContent = input.value || '(제목 없음)';
          titleEl.className = 'article-card-title' + (input.value ? '' : ' empty');
        }
      });
      return input;
    }

    fields.appendChild(inputField('제목', 'title'));
    fields.appendChild(inputField('출처 (예: aitimes.kr)', 'source'));
    fields.appendChild(inputField('URL (https://...)', 'url'));

    // Bullets
    const bulletsSection = document.createElement('div');
    bulletsSection.className = 'bullets-section';
    bulletsSection.innerHTML = '<div class="bullets-label">핵심 내용 불릿</div>';

    function renderBullets() {
      // 기존 bullet-row 전부 제거 후 재렌더
      bulletsSection.querySelectorAll('.bullet-row').forEach(el => el.remove());
      const addBtn = bulletsSection.querySelector('.add-bullet-btn');

      art.bullets.forEach((text, bi) => {
        const row = document.createElement('div');
        row.className = 'bullet-row';

        const ta = document.createElement('textarea');
        ta.value = text;
        ta.placeholder = `불릿 ${bi + 1}`;
        ta.addEventListener('input', () => { art.bullets[bi] = ta.value; });

        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-ghost';
        delBtn.textContent = '✕';
        delBtn.style.flexShrink = '0';
        delBtn.addEventListener('click', () => {
          if (art.bullets.length === 1) return;
          art.bullets.splice(bi, 1);
          renderBullets();
        });

        row.appendChild(ta);
        row.appendChild(delBtn);
        bulletsSection.insertBefore(row, addBtn);
      });
    }

    const addBulletBtn = document.createElement('button');
    addBulletBtn.className = 'add-bullet-btn';
    addBulletBtn.textContent = '+ 불릿 추가';
    addBulletBtn.addEventListener('click', () => {
      art.bullets.push('');
      renderBullets();
    });
    bulletsSection.appendChild(addBulletBtn);
    renderBullets();

    fields.appendChild(bulletsSection);
    body.appendChild(fields);
    card.appendChild(header);
    card.appendChild(body);
    return card;
  }

  // ── Modal ────────────────────────────────────────────────
  function openModal() {
    const cfg = loadConfig();
    document.getElementById('modal-owner').value = cfg.owner || '';
    document.getElementById('modal-repo').value = cfg.repo || '';
    document.getElementById('modal-branch').value = cfg.branch || 'main';
    document.getElementById('modal-pat').value = cfg.pat || '';
    document.getElementById('modal-overlay').classList.remove('hidden');
  }
  function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  }

  // ── Publish ──────────────────────────────────────────────
  async function publish() {
    const cfg = loadConfig();
    if (!cfg.owner || !cfg.repo || !cfg.pat) {
      showToast('GitHub 설정을 먼저 입력해주세요.', 'error');
      openModal();
      return;
    }

    const date = document.getElementById('field-date').value;
    if (!date) { showToast('날짜를 선택해주세요.', 'error'); return; }

    const validArticles = articles.filter(a => a.title && a.url);
    if (validArticles.length === 0) { showToast('기사를 1개 이상 입력해주세요.', 'error'); return; }

    const publishBtn = document.getElementById('btn-publish');
    const statusEl = document.getElementById('publish-status');
    publishBtn.disabled = true;
    statusEl.textContent = '발행 중...';

    try {
      const { owner, repo, branch, pat } = cfg;

      // 1. briefing JSON 저장
      const briefing = {
        date,
        category: document.getElementById('field-category').value || 'AI',
        articles: validArticles.map(a => ({
          title: a.title,
          source: a.source,
          url: a.url,
          bullets: a.bullets.filter(b => b.trim()),
        })),
      };
      const briefingPath = `news/data/briefings/${date}.json`;
      await putFile(owner, repo, branch, briefingPath,
        JSON.stringify(briefing, null, 2),
        `briefing: ${date}`, pat);

      // 2. index.json 업데이트
      let dates = [];
      try {
        const idxData = await ghRequest('GET', `/repos/${owner}/${repo}/contents/news/data/index.json?ref=${branch}`, null, pat);
        const existing = JSON.parse(decodeURIComponent(escape(atob(idxData.content.replace(/\n/g, '')))));
        dates = existing.dates || [];
      } catch { /* 없으면 새로 생성 */ }

      if (!dates.includes(date)) {
        dates.unshift(date);
        dates.sort((a, b) => b.localeCompare(a));
      }
      await putFile(owner, repo, branch, 'news/data/index.json',
        JSON.stringify({ dates }, null, 2),
        `index: add ${date}`, pat);

      showToast(`${date} 브리핑 발행 완료!`, 'success');
      statusEl.textContent = `마지막 발행: ${date}`;
    } catch (err) {
      showToast(`발행 실패: ${err.message}`, 'error');
      statusEl.textContent = '';
    } finally {
      publishBtn.disabled = false;
    }
  }

  // ── Init ─────────────────────────────────────────────────
  function init() {
    // 오늘 날짜 기본값 설정 후 데이터 로드 시도
    const today = new Date().toISOString().slice(0, 10);
    document.getElementById('field-date').value = today;

    // 날짜 변경 시 해당 날짜 데이터 로드
    document.getElementById('field-date').addEventListener('change', (e) => {
      loadBriefingForDate(e.target.value);
    });

    // 초기 로드 (기사 없으면 빈 폼 표시)
    articles = [emptyArticle()];
    renderArticles();
    loadBriefingForDate(today);

    // 이벤트
    document.getElementById('btn-add-article').addEventListener('click', () => {
      articles.push(emptyArticle());
      renderArticles();
    });

    document.getElementById('btn-settings').addEventListener('click', openModal);
    document.getElementById('btn-publish').addEventListener('click', publish);
    document.getElementById('modal-cancel').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal-overlay')) closeModal();
    });

    document.getElementById('modal-save').addEventListener('click', () => {
      const owner = document.getElementById('modal-owner').value.trim();
      const repo = document.getElementById('modal-repo').value.trim();
      const branch = document.getElementById('modal-branch').value.trim() || 'main';
      const pat = document.getElementById('modal-pat').value.trim();
      if (!owner || !repo || !pat) {
        showToast('owner, repo, PAT는 필수입니다.', 'error');
        return;
      }
      saveConfig({ owner, repo, branch, pat });
      closeModal();
      showToast('설정이 저장되었습니다.', 'success');
    });

    // 설정 미입력 시 자동으로 모달 열기
    const cfg = loadConfig();
    if (!cfg.pat) openModal();
  }

  init();
})();
