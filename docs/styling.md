# Styling

Tailwind utility classes only. Never use CSS Modules or inline `style={{}}`.

Class merging: always use `cn()` from `@/lib/utils`.
Multi-variant components: use `cva` from `class-variance-authority`.

```tsx
const variants = cva("base classes", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary-700",
      outline: "border border-border hover:bg-muted",
    },
    size: { sm: "h-7 px-2.5 text-xs", md: "h-9 px-4 text-sm" },
  },
  defaultVariants: { variant: "primary", size: "md" },
})
```

## REQUIRED before any UI work: read `src/app/globals.css`
All color tokens are defined there. Never hardcode color values.

## Tailwind v4 theme 등록 (`globals.css` — `@theme inline`)

`tailwind.config.ts`는 사용하지 않는다. Tailwind v4에서는 모든 토큰을 `globals.css`의 `@theme inline` 블록에서 관리한다.

새 CSS 변수를 추가했다면, `@theme inline`에 `--color-*` 형태로 등록해야 Tailwind 클래스로 사용할 수 있다.

```css
/* globals.css */
:root {
  --my-token: oklch(0.6 0.15 200);
}
@theme inline {
  --color-my-token: var(--my-token);
}
/* 이후 → bg-my-token, text-my-token 으로 사용 가능 */
```

IDE의 CSS linter가 `@theme`을 unknown at-rule로 경고할 수 있으나 빌드 에러가 아니므로 무시한다.

## 사용 가능한 토큰 클래스

**Primary scale** — `globals.css`의 `--primary-h`, `--primary-c`로 제어:
- `bg-primary` / `text-primary-foreground` — primary actions
- `bg-primary-100` / `text-primary-700` — soft backgrounds, labels
- `text-primary-600` — links, active states
- `bg-primary-50` — very subtle tints

To change the brand color, edit only `--primary-h` and `--primary-c` in `globals.css`. Never edit scale steps directly.

**Semantic tokens** — 다크모드 자동 대응, surfaces에 우선 사용:
- `bg-background` — page surface
- `bg-card` / `text-card-foreground` — card surface
- `bg-muted` / `text-muted-foreground` — subtle bg / caption text
- `bg-secondary` / `text-secondary-foreground` — secondary actions
- `bg-accent` / `text-accent-foreground` — hover, highlight
- `border-border` — dividers
- `ring-ring` — focus rings
- `text-destructive` / `bg-destructive/10` — errors
- `bg-input` — form input background
