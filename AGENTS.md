# Project Structure Guide for Agents

## Overview

This is a Next.js project using the App Router, TypeScript, and CSS Modules (no Tailwind).

## Directory Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # React components
│   ├── common/       # Reusable, shared components (buttons, inputs, modals, etc.)
│   └── feature/      # Feature-specific components tied to a particular domain
├── hooks/            # Custom React hooks
├── libs/             # Utility functions and third-party integrations
│   └── storage/      # Storage utilities (localStorage, sessionStorage, cookies, etc.)
├── stores/           # Global state management (e.g., Zustand stores)
└── assets/           # Static assets (images, icons, fonts, etc.)
```

## Directory Conventions

### `src/app/`
Next.js App Router. Contains `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and other route files. Each subdirectory represents a route segment.

### `src/components/common/`
Generic, reusable UI components with no dependency on specific business logic. These should be self-contained and usable anywhere in the project.

Examples: `Button`, `Input`, `Modal`, `Card`

### `src/components/feature/`
Components scoped to a specific feature or domain. These may depend on stores, hooks, or libs related to their feature.

Organize by feature subdirectory:
```
components/feature/
└── auth/
    ├── LoginForm.tsx
    └── LoginForm.module.css
```

### `src/hooks/`
Custom React hooks. Each hook file should be named `use<Name>.ts`.

Examples: `useAuth.ts`, `useModal.ts`, `useFetch.ts`

### `src/libs/`
Utility functions, helpers, and third-party library wrappers.

#### `src/libs/storage/`
Abstractions over browser storage APIs (localStorage, sessionStorage, cookies). Export typed getter/setter functions rather than accessing storage APIs directly.

### `src/stores/`
Global state stores. Use one file per domain/feature store.

Examples: `authStore.ts`, `uiStore.ts`

### `src/assets/`
Static assets imported directly into components. Large or public-facing assets should go in the `/public` directory instead.

## Styling

Use CSS Modules exclusively. Each component should have a co-located `.module.css` file.

```
Button.tsx
Button.module.css
```

Do not use Tailwind or inline styles.
