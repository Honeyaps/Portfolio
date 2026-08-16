# Hemant Portfolio

React + Vite + Tailwind portfolio site.

```
hemant-portfolio/
├── api/
│   └── contact.js       # Vercel serverless function for the contact form
├── public/               # static assets (favicon, images)
├── src/
│   ├── components/       # all page sections (Hero, About, Skills, Projects, etc.)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build       # outputs to dist/
npm run preview     # preview the production build locally
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output dir `dist` (auto-detected).
4. Deploy. The contact form works out of the box via the bundled `api/contact.js` serverless function - no separate backend needed for this repo to fully work.

> Note: this repo already ships its own `/api/contact` serverless function, so it doesn't depend on the separate `portfolio-server` repo. Keep the standalone server only if you plan to reuse it elsewhere (e.g. a different frontend, or you want emails sent from a long-running Node process).
