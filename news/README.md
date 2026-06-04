# Studio Meta-K 브리핑

GitHub Pages로 운영되는 AI 뉴스 일일 브리핑 웹앱. 서버/DB 없이 정적 파일만으로 동작합니다.

- **공개 페이지**: `https://wonwizard.github.io/news/`
- **관리자 페이지**: `https://wonwizard.github.io/news/admin/`

---

## 구조

```
news/
├── index.html              # 공개 뉴스피드
├── admin/index.html        # 관리자 편집 페이지
├── css/style.css
├── js/
│   ├── viewer.js           # 공개 페이지 렌더링
│   └── admin.js            # 편집 및 발행 로직
└── data/
    ├── index.json          # 발행된 날짜 목록
    └── briefings/
        └── YYYY-MM-DD.json # 날짜별 브리핑 데이터
```

---

## 데이터 포맷

`data/briefings/YYYY-MM-DD.json`

```json
{
  "date": "2026-06-04",
  "category": "AI",
  "articles": [
    {
      "title": "기사 제목",
      "source": "aitimes.kr",
      "url": "https://...",
      "bullets": [
        "핵심 내용 첫 번째",
        "핵심 내용 두 번째"
      ]
    }
  ]
}
```

---

## 관리자 사용법

### 1. 최초 설정

`/news/admin/` 접속 시 GitHub 설정 모달이 자동으로 열립니다.

| 항목 | 값 |
|------|----|
| owner | `wonwizard` |
| repo | `wonwizard.github.io` |
| branch | `main` |
| PAT | GitHub Personal Access Token (`repo` scope) |

입력한 정보는 **브라우저 localStorage에만 저장**되며 외부로 전송되지 않습니다.  
설정 변경은 상단 **⚙ 설정** 버튼으로 언제든 가능합니다.

### 2. PAT 발급 방법

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **Generate new token** → `repo` 스코프 체크 → 생성

### 3. 브리핑 작성 및 발행

1. 날짜 선택 → 해당 날짜의 기존 데이터가 있으면 자동으로 불러옴
2. 카테고리 확인 (기본값: `AI`)
3. **기사 추가** 버튼으로 기사 입력 (제목, 출처, URL, 불릿)
4. **발행** 클릭 → GitHub에 JSON 커밋 → 수 초 내 공개 페이지에 반영

### 4. 기사 수정 / 삭제

- 날짜 선택 시 기존 데이터를 자동 로드
- 각 기사 카드에서 내용 수정 후 **발행**하면 덮어씀
- 기사 카드 우측 **삭제** 버튼으로 개별 기사 제거 후 재발행

---

## 로컬 개발

빌드 없음. 로컬 HTTP 서버 실행 후 브라우저에서 확인:

```bash
npx serve .
# 또는
python -m http.server 8080
```

> `file://` 프로토콜에서는 `fetch()`가 동작하지 않으므로 로컬 서버 필수.

---

## 배포

`wonwizard.github.io` 레포의 `news/` 디렉토리에 파일을 push하면 자동 반영됩니다.

```bash
# release/news/ 파일을 wonwizard.github.io/news/ 에 복사 후
git add news/
git commit -m "update: news briefing"
git push
```
