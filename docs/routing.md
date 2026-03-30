# Routing

## Pages
- `/` → `src/app/page.tsx`
- `/hackathons` → `src/app/hackathons/page.tsx`
- `/hackathons/[slug]` → `src/app/hackathons/[slug]/page.tsx`
- `/ranking` → `src/app/ranking/page.tsx`
- `/camp` → `src/app/camp/page.tsx`
- `/camp/new` → `src/app/camp/new/page.tsx`

## Navigation
Do not guess hrefs. Use this map only.
- GNB logo → `/`
- GNB 해커톤 → `/hackathons`
- GNB 랭킹 → `/ranking`
- GNB 캠프 → `/camp`
- `/hackathons` 카드 클릭 → `/hackathons/[slug]`
- `/camp` 팀 만들기 버튼 → `/camp/new`
- `/camp/new` 생성 완료 → `/camp`
