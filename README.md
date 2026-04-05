This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
moumthon
├─ AGENTS.md
├─ CLAUDE.md
├─ components.json
├─ docs
│  ├─ components.md
│  ├─ data.md
│  ├─ layout.md
│  ├─ playwright.md
│  ├─ routing.md
│  ├─ seed.md
│  └─ styling.md
├─ e2e
│  ├─ camp.spec.ts
│  ├─ example.spec.ts
│  ├─ hackathon-detail.spec.ts
│  ├─ main.spec.ts
│  └─ ranking.spec.ts
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ playwright.config.ts
├─ postcss.config.mjs
├─ README.md
├─ src
│  ├─ app
│  │  ├─ camp
│  │  │  ├─ new
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ hackathons
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]
│  │  │     ├─ layout.tsx
│  │  │     ├─ leaderboard
│  │  │     │  └─ page.tsx
│  │  │     ├─ page.tsx
│  │  │     ├─ submit
│  │  │     │  └─ [milestone]
│  │  │     │     └─ page.tsx
│  │  │     └─ [section]
│  │  │        └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ mypage
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ rankings
│  │  │  └─ page.tsx
│  │  ├─ team
│  │  │  ├─ new
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  └─ test
│  │     └─ page.tsx
│  ├─ assets
│  │  └─ data
│  │     ├─ my.json
│  │     ├─ my_notifications.json
│  │     ├─ public_hackathons.json
│  │     ├─ public_hackathon_detail.json
│  │     ├─ public_leaderboard.json
│  │     ├─ public_submissions.json
│  │     ├─ public_teams.json
│  │     ├─ public_team_members.json
│  │     └─ public_users.json
│  ├─ components
│  │  ├─ common
│  │  │  ├─ Avatar.tsx
│  │  │  ├─ Badge.tsx
│  │  │  ├─ Button.tsx
│  │  │  ├─ Card.tsx
│  │  │  ├─ DataSeeder.tsx
│  │  │  ├─ Header
│  │  │  │  ├─ Breadcrumb.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ Nav.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ Input.tsx
│  │  │  ├─ Pagination.tsx
│  │  │  └─ RankBadge.tsx
│  │  ├─ feature
│  │  │  ├─ .keep.md
│  │  │  ├─ CtaButton.tsx
│  │  │  ├─ hackathons
│  │  │  │  ├─ HackathonCard.tsx
│  │  │  │  ├─ HackathonDetailClient.tsx
│  │  │  │  ├─ HackathonDetailNav.tsx
│  │  │  │  ├─ HackathonEvalSection.tsx
│  │  │  │  ├─ HackathonLeaderboardView.tsx
│  │  │  │  ├─ HackathonOverviewSection.tsx
│  │  │  │  ├─ HackathonPrizeSection.tsx
│  │  │  │  ├─ HackathonScheduleSection.tsx
│  │  │  │  ├─ HackathonSectionHeading.tsx
│  │  │  │  ├─ HackathonSubmitSection.tsx
│  │  │  │  ├─ HackathonTeamsSection.tsx
│  │  │  │  ├─ LeaderboardClient.tsx
│  │  │  │  └─ SubmitClient.tsx
│  │  │  ├─ mypage
│  │  │  │  └─ MypageClient.tsx
│  │  │  ├─ ranking
│  │  │  │  └─ RankingClient.tsx
│  │  │  └─ team
│  │  │     ├─ MyTeamCard.tsx
│  │  │     └─ TeamCard.tsx
│  │  └─ ui
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     └─ input.tsx
│  ├─ hooks
│  │  └─ useLocalStore.ts
│  ├─ lib
│  │  ├─ formatDate.ts
│  │  ├─ hackathonStatus.ts
│  │  ├─ rankingUtils.ts
│  │  ├─ storage
│  │  │  ├─ index.ts
│  │  │  └─ seed.ts
│  │  └─ utils.ts
│  ├─ stores
│  │  ├─ hackathonDetailStore.ts
│  │  └─ memberStore.ts
│  └─ types
│     ├─ hackathon.ts
│     ├─ hackathonDetail.ts
│     └─ team.ts
└─ tsconfig.json

```