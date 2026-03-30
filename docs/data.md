# Data

## localStorage store

`createLocalStore` from `@/lib/storage` — 특정 key에 대한 CRUD API를 반환.
모든 메서드는 `{ data, error: null }` 또는 `{ data: null, error: string }` Result 타입을 반환.

```ts
import { createLocalStore } from "@/lib/storage"
import type { Team } from "@/types"

const teamStore = createLocalStore<Team>("teams", "teamCode")

// 전체 조회
const { data, error } = teamStore.getAll()

// 단건 조회
const { data, error } = teamStore.getById("T-ALPHA")

// 생성
const { data, error } = teamStore.create({ teamCode: "T-NEW", ... })

// 수정
const { data, error } = teamStore.update("T-ALPHA", { isOpen: false })

// 삭제
const { data, error } = teamStore.remove("T-ALPHA")

// 초기 데이터 주입 (데이터 없을 때만 실행됨)
teamStore.seed(mockTeams)
```

API가 생기면 이 store를 fetch 호출로 교체하면 됩니다.

## React hook (컴포넌트에서 데이터 읽기/쓰기)

`createLocalStoreHook` from `@/hooks/useLocalStore` — store를 React state와 연결.
`items` 상태가 localStorage와 동기화되며, CRUD 호출 시 즉시 리렌더됩니다.

hook 정의 (리소스당 한 번):
```ts
import { createLocalStoreHook } from "@/hooks/useLocalStore"
import type { Team } from "@/types"
import mockTeams from "@/assets/data/public_teams.json"

export const useTeamStore = createLocalStoreHook<Team>("teams", "teamCode", {
  initialData: mockTeams as Team[],  // localStorage가 비어있을 때 seed
})
```

컴포넌트에서 사용:
```ts
const { items, create, update, remove, get } = useTeamStore()

// 목록 읽기 — items는 React state, localStorage 변경 시 자동 반영
items

// 단건 조회 — Result 타입 반환
const { data, error } = get("T-ALPHA")

// 생성
const { data, error } = create({ teamCode: "T-NEW", ... })

// 수정
const { data, error } = update("T-ALPHA", { isOpen: false })

// 삭제
const { data, error } = remove("T-ALPHA")
```

---

All data comes from `src/assets/data/`. Import directly in server components. Do not fetch or use useEffect until an API exists.

```ts
import hackathons from "@/assets/data/public_hackathons.json"
```

File → page mapping:
- `public_hackathons.json` → `/hackathons`
- `public_hackathon_detail.json` → `/hackathons/[slug]`
- `public_leaderboard.json` → `/hackathons/[slug]`
- `public_teams.json` → `/camp`

## Types

```ts
type Hackathon = {
  slug: string
  title: string
  status: "upcoming" | "ongoing" | "ended"
  tags: string[]
  thumbnailUrl: string
  period: { timezone: string; submissionDeadlineAt: string; endAt: string }
  links: { detail: string; rules: string; faq: string }
}

type HackathonDetail = {
  slug: string
  title: string
  sections: {
    overview: { summary: string; teamPolicy: { allowSolo: boolean; maxTeamSize: number } }
    info: { notice: string[]; links: { rules: string; faq: string } }
    eval: { metricName: string; description: string; limits?: { maxRuntimeSec: number; maxSubmissionsPerDay: number } }
    schedule: { timezone: string; milestones: { name: string; at: string }[] }
    prize?: { items: { place: string; amountKRW: number }[] }
    teams: { campEnabled: boolean; listUrl: string }
    submit: { allowedArtifactTypes: string[]; submissionUrl: string; guide: string[] }
    leaderboard: { publicLeaderboardUrl: string; note: string }
  }
}

type Leaderboard = {
  hackathonSlug: string
  updatedAt: string
  entries: {
    rank: number
    teamName: string
    score: number
    submittedAt: string
    scoreBreakdown?: Record<string, number>
  }[]
}

type Team = {
  teamCode: string
  hackathonSlug: string
  name: string
  isOpen: boolean
  memberCount: number
  lookingFor: string[]
  intro: string
  contact: { type: "link"; url: string }
  createdAt: string
}
```
