/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Keep in sync with `Colors` in src/constants/theme.ts (still used for non-style props like tintColor).
      // Pair each class with its `dark:` variant, e.g. `bg-background dark:bg-background-dark`.
      colors: {
        foreground: { DEFAULT: '#000000', dark: '#ffffff' },
        muted: { DEFAULT: '#60646C', dark: '#B0B4BA' },
        background: { DEFAULT: '#ffffff', dark: '#000000' },
        element: { DEFAULT: '#F0F0F3', dark: '#212225' },
        selected: { DEFAULT: '#E0E1E6', dark: '#2E3135' },
        link: '#3c87f7',
      },
      maxWidth: {
        // `MaxContentWidth` in src/constants/theme.ts
        content: '800px',
      },
    },
  },
  plugins: [],
};
