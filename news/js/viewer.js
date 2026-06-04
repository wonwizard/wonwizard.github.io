(function () {
  const DATA_ROOT = './data';

  // URL 파라미터에서 날짜 읽기
  function getDateParam() {
    return new URLSearchParams(location.search).get('date');
  }

  // 날짜 표시 포맷: "2026년 06월 04일"
  function formatDate(dateStr) {
    const [y, m, d] = dateStr.split('-');
    return `${y}년 ${m}월 ${d}일`;
  }

  // 날짜 네비게이션 업데이트
  function updateDateNav(dates, currentDate) {
    const idx = dates.indexOf(currentDate);
    document.getElementById('date-label').textContent = formatDate(currentDate);

    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');

    // dates는 최신순 → 이전 날짜는 idx+1, 다음 날짜는 idx-1
    prevBtn.disabled = idx >= dates.length - 1;
    nextBtn.disabled = idx <= 0;

    prevBtn.onclick = () => navigate(dates[idx + 1]);
    nextBtn.onclick = () => navigate(dates[idx - 1]);
  }

  function navigate(date) {
    const url = new URL(location.href);
    url.searchParams.set('date', date);
    location.href = url.toString();
  }

  // 기사 카드 DOM 생성
  function renderCard(article) {
    const card = document.createElement('div');
    card.className = 'article-card';

    const link = document.createElement('a');
    link.className = 'article-title-row';
    link.href = article.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `
      <span class="article-title">${article.title}</span>
      <span class="article-source">${article.source}</span>
    `;

    const bulletsWrap = document.createElement('div');
    bulletsWrap.className = 'article-bullets';
    bulletsWrap.innerHTML = '';

    const ul = document.createElement('ul');
    ul.className = 'bullets-list';
    article.bullets.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
    bulletsWrap.appendChild(ul);

    card.appendChild(link);
    card.appendChild(bulletsWrap);
    return card;
  }

  // 브리핑 렌더링
  function renderBriefing(data) {
    document.getElementById('section-badge').textContent = data.category;

    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    data.articles.forEach(article => {
      feed.appendChild(renderCard(article));
    });
  }

  async function init() {
    const feed = document.getElementById('feed');

    let dates;
    try {
      const res = await fetch(`${DATA_ROOT}/index.json?v=${Date.now()}`);
      ({ dates } = await res.json());
    } catch {
      feed.innerHTML = '<p class="state-msg">데이터를 불러올 수 없습니다.</p>';
      return;
    }

    const date = getDateParam() || dates[0];

    updateDateNav(dates, date);

    try {
      const res = await fetch(`${DATA_ROOT}/briefings/${date}.json?v=${Date.now()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      renderBriefing(data);
    } catch {
      feed.innerHTML = '<p class="state-msg">해당 날짜의 브리핑이 없습니다.</p>';
    }
  }

  init();
})();
