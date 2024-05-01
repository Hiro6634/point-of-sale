# Point of Sale

This project is intended to learn about full stack development with de final objective to provide a tool for Japanese Association Burzaco in a sales in yours events

## Installation

```pnpm create vite@latest```


### tailwind css

```pnpm install -D tailwindcss postcss autoprefixer```

```pnpm tailwindcss init -p```

Setup tailwind config file ```tailwind.config.js```


```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Add the Tailwind directives to your CSS
Add the ``` `@tailwind` ``` directives for each of Tailwind's layers of your ``` `./src/index.css` ``` file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Routing

``` pnpm install react-router-dom localforage match-sorter sort-by ```
