# Vite + Pug + Sass Starter

![Vite](https://img.shields.io/badge/Vite-%5E8.0-blue?style=flat-square)
![Pug](https://img.shields.io/badge/Pug-Templates-brown?style=flat-square)
![Sass](https://img.shields.io/badge/Sass-Indented-pink?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Production-oriented multi-page starter built with Vite, Pug and Sass, using plain JavaScript modules.

## Features

- Multi-page architecture with Vituum + Pug.
- Sass indented syntax (`.sass`) with a maintainable folder structure.
- Plain JavaScript (`.js`, ESM).
- Testing with Vitest + Testing Library.
- ESLint, Stylelint and Prettier configured for day-to-day work.
- Husky + lint-staged pre-commit checks.
- Rollup visualizer report generated during production build.
- Alias `@` mapped to `src/`.

## Requirements

- Node.js 24+
- npm

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest --run",
  "test:watch": "vitest --watch",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "lint:sass": "stylelint \"src/**/*.sass\"",
  "lint:sass:fix": "stylelint \"src/**/*.sass\" --fix",
  "prepare": "husky"
}
```

## Project Structure

```txt
src/
  pages/            # Pug entry pages
  layouts/          # Shared Pug layouts
  includes/         # Pug partials/components
  scripts/
    main.js
    helpers.js
  styles/
    main.sass
    0-config/
    1-tools/
    2-base/
    4-sections/
    5-layouts/
```

## Bundle Analysis

`npm run build` also generates a visualizer report (`stats.html`) through `rollup-plugin-visualizer`.
