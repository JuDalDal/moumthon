# Components

## Creation workflow

Before creating any component, ask: "shadcn 컴포넌트를 사용할까요?"

If yes:
1. `npx shadcn@latest add <name>` → installs into `src/components/ui/`
2. Create a wrapper in `src/components/common/` that re-exports or wraps the ui/ component
3. Export from `src/components/common/index.ts`

If no:
- Build directly in `src/components/common/` using Tailwind + cva

If the component contains business logic, domain state, or feature-specific behavior:
- Place in `src/components/feature/<feature>/` instead of common/
- `<feature>`는 해당 컴포넌트가 사용되는 페이지 이름을 따른다.

```
src/components/feature/
├── Header.tsx                  → 앱 전역에서 쓰이는 feature 컴포넌트
├── hackathons/                 → /hackathons, /hackathons/[slug] 전용
│   └── HackathonCard.tsx
├── camp/                       → /camp, /camp/new 전용
│   └── TeamCard.tsx
└── ranking/                    → /ranking 전용
    └── LeaderboardTable.tsx
```

특정 페이지에서만 쓰이는 컴포넌트는 반드시 해당 페이지 이름의 폴더 아래에 만든다.
두 페이지 이상에서 쓰이게 되면 `src/components/common/`으로 올린다.

Never import from `@/components/ui` directly in pages or feature components. Always go through `@/components/common`.

## Available common components
All from `@/components/common`.

`Button` — variant: default | outline | secondary | ghost | destructive | link / size: default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg
`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` — shadcn card parts, accept `className`
`Badge` — variant: default | secondary | destructive | outline | ghost | link
`Avatar` — props: `src?`, `alt?`, `fallback?` (initials, max 2 chars), size: sm | default | lg. Also exports: `AvatarGroup`, `AvatarGroupCount`, `AvatarBadge`
`Input` — props: `label?`, `hint?`, `error?` + standard input attrs. Wraps shadcn Input with Field from @base-ui/react for a11y.
