# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# React project with vite and tailwindcss
## Create Project
``` pnpm create vite@latest my-project -- --template react```
``` cd  my-project```

## tailwind css
``` pnpm install -D tailwindcss postcss autoprefixer```

```pnpm tailwindcss init -p```

Setup tailwind config file ```tailwind.config.js```

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 
```

### Add the Tailwind directives to your CSS
Add the ``` `@tailwind` ``` directives for each of Tailwind's layers of your ``` `./src/index.css` ``` file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Routing
```
pnpm install react-router-dom
```
