# Tailwind CSS v4+ Setup for Next.js (2024+)

This guide documents the correct setup for Tailwind CSS v4+ in a Next.js (App Router) project, using the new v4+ configuration style. This approach is required for Shadcn UI compatibility and matches your working setup.

---

## 1. Install Tailwind CSS, PostCSS, and @tailwindcss/postcss
```bash
npm install -D tailwindcss postcss @tailwindcss/postcss
```
> **Note:** As of Tailwind CSS v4+, you do NOT need to install `autoprefixer` separately. Tailwind now includes autoprefixing by default.

## 2. Create/Update PostCSS config as ESM (`postcss.config.mjs`)
Create a file named `postcss.config.mjs` in your project root:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
> Do not use `postcss.config.js` (CJS) for Tailwind v4+ projects.

## 3. Configure Tailwind for Next.js
Edit `tailwind.config.js` to ensure it exports a valid config (CommonJS is still used):
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 4. Import Tailwind in your global CSS (v4+ style)
At the top of your `app/globals.css` (or equivalent), use the new `@import` syntax:
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```
- Do **not** use `@tailwind base;` etc. in v4+ projects.
- You can add additional custom properties, layers, or themes as needed below the imports.

## 5. Add your theme and color variables (optional, for Shadcn UI)
Example: (see your actual `app/globals.css` for full details)
```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  /* ...more variables... */
}

.dark {
  --background: oklch(0.145 0 0);
  /* ...more variables... */
}
```

## 6. Start your development server
```bash
npm run dev
```

## 7. Verify Tailwind CSS works
Add a Tailwind class (e.g., `bg-blue-500 text-white p-4 rounded`) to a component (such as the top-level `<div>` in `app/page.tsx`).

If you see the background color and styles applied, your Tailwind v4+ setup is correct—even without `autoprefixer`.

---
**References:**
- [Tailwind CSS Next.js Guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Tailwind CSS v4 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Shadcn UI Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4)

This file documents the correct v4+ setup for reproducibility and Shadcn UI compatibility. No code is executed by this file.
