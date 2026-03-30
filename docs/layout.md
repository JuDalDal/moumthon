# Layout

`src/app/layout.tsx` renders `<Gnb />` fixed at top, then `{children}` below.

GNB component: `src/components/common/Gnb.tsx`
- Left: logo, links to `/`
- Center: nav links to `/hackathons`, `/ranking`, `/camp`
- Right: user avatar + dropdown

Every `page.tsx` root element must use:
```tsx
<main className="mx-auto w-full max-w-5xl px-4 py-8">
```
