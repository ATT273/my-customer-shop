# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Expo SDK 56 app (React Native 0.85, React 19.2, TypeScript strict), scaffolded from `create-expo-app`. It runs on iOS, Android, and web. It is still close to the starter template (Home/Explore tabs), so expect app-specific features to be built on top of it.

## Commands

- `npm install`: install dependencies
- `npm start` (`expo start`): dev server; `npm run android` / `npm run ios` / `npm run web` open a specific platform
- `npm run lint` (`expo lint`): ESLint (configured by Expo on first run)
- `npx tsc --noEmit`: type check
- `npm run reset-project`: moves `src/` and `scripts/` into `example/` and creates a blank `src/app`. **This is destructive to the current app code; do not run it unless asked.**

There is no test runner set up yet. Jest is not installed.

## Architecture

- **Routing**: expo-router file-based routing in `src/app/` (entry `expo-router/entry`). `app.json` turns on `typedRoutes` and `reactCompiler`, so typed `href`s are checked and manual memoization (`useMemo`/`useCallback`) is usually unnecessary.
  - The root `_layout.tsx` is a `Stack`. Tab screens live in the `(tabs)` group (`(tabs)/_layout.tsx` renders `AppTabs`); detail screens such as `product/[id].tsx` sit outside it so they push over the tab bar.
- **Platform-split files**: `.web.tsx` / `.web.ts` files override their native counterparts at bundle time. Change both when you change behavior. Examples:
  - `components/app-tabs.tsx` uses `NativeTabs` from `expo-router/unstable-native-tabs`; `app-tabs.web.tsx` builds a custom top tab bar with `expo-router/ui` (`Tabs`/`TabList`/`TabTrigger`). A new tab screen must be registered in **both** files.
  - `hooks/use-color-scheme.web.ts` returns `'light'` until hydration, because web output is static (`web.output: "static"`).
- **Styling**: NativeWind v4 (Tailwind CSS v3). Style with `className`; the palette is in `tailwind.config.js` (`foreground`, `muted`, `background`, `element`, `selected`, `link`), and each color needs its `dark:` pair, e.g. `bg-element dark:bg-element-dark`. Shared layout classes are in `shared/styles.ts` (`SharedClasses`). `global.css` holds the Tailwind directives and web font variables and is imported in the root `_layout.tsx`. `expo-image`'s `Image` doesn't take `className`, so it keeps a `StyleSheet` style.
- **Theming**: `constants/theme.ts` defines `Colors` (light/dark), `Spacing`, `Fonts`, `MaxContentWidth`, and `BottomTabInset`. Use `ThemedText` / `ThemedView` (`type` / `themeColor` props) rather than hard-coded colors. `Colors` / `useTheme()` are for props that need a raw color (`tintColor`, `placeholderTextColor`); keep `Colors` in sync with `tailwind.config.js`. Color scheme `'unspecified'` falls back to `light`.
- **Path aliases** (`tsconfig.json`): `@/*` → `src/*`, `@/assets/*` → `assets/*`.
