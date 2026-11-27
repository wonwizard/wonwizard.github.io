# Gemini Watermark Remover — 정적 배포본

Gemini 이미지와 Veo 영상의 눈에 보이는 워터마크를 브라우저에서 처리하는 웹 도구입니다. HTML, CSS, JavaScript와 로컬 리소스로 구성되어 있으며 서버에서 Node.js나 npm을 실행할 필요가 없습니다.

## GitHub Pages 배포

1. GitHub에 저장소를 만듭니다.
2. **이 폴더 안의 파일과 하위 폴더 전체**를 저장소 최상위에 업로드합니다. 저장소를 열었을 때 `index.html`과 `README.md`가 바로 보여야 합니다.
3. 저장소의 **Settings → Pages**에서 배포 방식을 **Deploy from a branch**로 선택합니다.
4. 업로드한 브랜치(보통 `main`)와 **/ (root)**를 선택하고 저장합니다.
5. 배포가 완료되면 Pages 설정에 표시되는 웹사이트 주소로 접속합니다.

일반적인 프로젝트 주소는 `https://사용자명.github.io/저장소명/`입니다. 리소스는 상대 경로로 연결되어 있어 저장소 이름에 맞춰 코드를 변경할 필요가 없습니다. `.nojekyll`도 함께 업로드하세요.

> `github-deploy` 폴더 자체를 저장소 안에 넣는 대신, **폴더 안의 내용물**을 저장소 최상위에 넣으세요. 저장소를 생성하거나 원격 업로드하는 작업은 이 배포본에 포함되지 않습니다.

## 일반 웹서버 배포

이 폴더의 내용물을 웹서버의 공개 디렉터리에 업로드하면 됩니다. 루트 또는 하위 폴더에 배포할 수 있습니다. 하위 폴더 주소는 `https://example.com/remover/`처럼 끝에 `/`를 붙여 접속하세요.

## 파일 구성

```text
.
├── index.html           # 웹페이지 시작 파일
├── assets/              # 실행 JavaScript, CSS, 이미지, 폰트
├── css/                 # 추가 스타일
├── fonts/               # 로컬 폰트
├── favicon*             # 브라우저 아이콘
├── *chrome*.png         # 모바일 아이콘
├── apple-touch-icon.png
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── llms.txt
├── .nojekyll            # GitHub Pages에서 정적 파일 그대로 제공
└── README.md
```

`assets/`의 파일 이름과 폴더 구조를 그대로 유지하세요. 이 폴더는 빌드가 끝난 배포본이므로 `package.json`, `node_modules`, 개발 서버가 필요하지 않습니다.

## 사용 환경

- JavaScript를 허용한 최신 브라우저에서 사용하세요.
- 영상 처리는 WebCodecs 지원과 HTTPS가 필요합니다. Chrome 또는 Edge에서 사용하는 것을 권장합니다.
- `index.html`을 더블클릭하는 `file://` 방식 대신 배포된 웹사이트 주소로 접속하세요.
- 이미지와 영상 처리는 브라우저 안에서 수행됩니다.
- 제거 대상은 눈에 보이는 워터마크이며, 보이지 않는 SynthID는 제거하지 않습니다.

## 공개 운영 시 수정할 정보

현재 검색 메타데이터에는 원본 사이트 주소가 남아 있습니다. 본인 사이트로 운영할 때 아래 항목을 실제 배포 주소와 운영 정보에 맞게 수정하세요.

- `index.html`: canonical, Open Graph 및 Twitter 이미지·주소, JSON-LD
- `robots.txt`, `sitemap.xml`, `llms.txt`: 사이트 주소 및 소개

기존 화면의 외부 링크도 운영 목적에 맞는지 확인하세요. 실행에 필요한 라이브러리·아이콘·폰트는 로컬 파일에 포함되어 있습니다.

## 수정 및 재배포

이 폴더는 배포 파일만 포함합니다. 기능을 수정할 때는 별도로 보관한 원본 프로젝트에서 작업한 뒤 개발 컴퓨터에서 `npm run build`를 실행하세요. 생성된 `dist/` 내용물로 배포 파일을 교체하고 GitHub에 반영하면 됩니다. 서버에서는 빌드할 필요가 없습니다.

## 원본 및 저작권 안내

- 원본 프로젝트: [dearabhin/gemini-watermark-remover](https://github.com/dearabhin/gemini-watermark-remover)
- 원본 개발자: Abhin Krishna
- 원본 프로젝트의 `package.json`에는 MIT 라이선스로 명시되어 있습니다. 이 배포본에는 원본 LICENSE 파일이 포함되어 있지 않으므로, 재배포 시 원본 라이선스 전문과 저작권 고지를 확인해 포함하세요.
- 포함된 라이브러리의 저작권·라이선스 고지를 유지하세요.

## 검증 범위

정적 빌드와 배포 파일의 로컬 참조 경로를 검사했습니다. 실제 배포 환경에서 이미지 처리와 영상 인코딩까지 확인한 상태는 아닙니다.
