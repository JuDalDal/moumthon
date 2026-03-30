# Seed

초기 데이터는 모두 `src/lib/storage/seed.ts`의 `seedAll()`에서 관리한다.

`seedAll()`은 앱 마운트 시 `DataSeeder` 컴포넌트(`src/components/common/DataSeeder.tsx`)가 한 번 호출한다.
`createLocalStore.seed()`는 해당 key에 데이터가 없을 때만 실행되므로 기존 데이터를 덮어쓰지 않는다.

## localStorage key 맵

- `hackathons` — `public_hackathons.json`, idField: `slug`
- `hackathon_details` — `public_hackathon_detail.json` (extraDetails 평탄화), idField: `slug`
- `leaderboards` — `public_leaderboard.json` (extraLeaderboards 평탄화), idField: `hackathonSlug`
- `teams` — `public_teams.json`, idField: `teamCode`

## 새 초기 데이터 추가 시

1. `src/assets/data/`에 JSON 파일 추가
2. `src/lib/storage/seed.ts`의 `seedAll()`에 `createLocalStore(...).seed(...)` 추가
3. `docs/data.md`의 타입 및 파일 맵 업데이트

## 데이터 초기화 방법

localStorage를 완전히 비우거나 특정 key를 초기화하고 싶을 때:
```ts
createLocalStore("teams", "teamCode").clear()
// 이후 재방문 시 seed가 다시 실행됨
```
