# GitHub Pages Developer Portfolio (MVP)

`username.github.io` 형태의 GitHub Pages 배포를 기준으로 만든 단일 페이지 포트폴리오 템플릿입니다.

- 스택: 순수 `HTML + CSS + JavaScript`
- 언어: 한국어 중심 + 영어 병기
- 데이터 소스: `assets/data/site-data.json`

## 프로젝트 구조

```text
.
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  └─ main.js
│  └─ data/
│     └─ site-data.json
└─ README.md
```

## 로컬 미리보기

정적 파일이므로 로컬 서버로 열어야 `fetch`가 동작합니다.

```bash
python -m http.server 5500
```

브라우저에서 `http://localhost:5500` 접속.

## 콘텐츠 교체 방법

### 1) 프로필 정보
`assets/data/site-data.json`의 `profile` 필드를 수정합니다.

- `name`
- `tagline_ko`, `tagline_en`
- `email`
- `github`
- `location`
- `about_ko`, `about_en` (선택)

### 2) 기술 스택
`skills` 배열에 카테고리 단위로 추가/수정합니다.

```json
{
  "category": "Frontend",
  "items": ["TypeScript", "React"]
}
```

### 3) 프로젝트
`projects` 배열을 수정합니다.

필수 권장 필드:
- `title`
- `summary_ko`, `summary_en`
- `stack[]`
- `repo_url`, `demo_url`
- `highlights[]`

`repo_url` 또는 `demo_url`이 비어 있거나 URL 형식이 아니면 버튼이 자동 비활성화됩니다.

## GitHub Pages 배포 절차 (`username.github.io`)

1. GitHub에서 저장소 이름을 정확히 `username.github.io`로 생성
2. 이 프로젝트 파일을 `main` 브랜치 루트에 푸시
3. GitHub 저장소 `Settings > Pages` 진입
4. `Build and deployment`에서 `Deploy from a branch` 선택
5. `Branch: main` / `Folder: /(root)` 저장
6. 배포 완료 후 `https://username.github.io` 접속 확인

## 점검 체크리스트

- 앵커 네비게이션이 각 섹션으로 정상 이동하는지
- 이메일/GitHub/프로젝트 링크 동작 여부
- 데이터 로드 실패 시 하단 상태 메시지와 기본 샘플 데이터 fallback 동작
- 반응형 확인: 375px, 768px, 1280px
- Lighthouse 기준 성능/접근성 기본 점검

## 범위 메모

- 초기 버전에서 커스텀 도메인(`CNAME`)은 제외
- 문의 폼 백엔드 없이 이메일/깃허브 채널만 제공
- 블로그/다중 페이지/프레임워크 전환은 이후 확장 단계
