# Wahafy — agency website

The Wahafy studio site: what Wahafy is, Standard vs Premium services, a
showcase of the Pearl & Bloom and Dune & Bean pilot builds, and a lead
capture form.

Built with Vite + React + Tailwind CSS + Framer Motion. Design system
(colors, type pairing, layout pattern) generated from the
[UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
design-intelligence database.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static `dist/` folder, deployable anywhere (this project is set
up for Vercel — the `/api` folder ships as serverless functions alongside
the static build automatically).

## Lead form backend

The "Get my free demo" form posts to `/api/lead`, which forwards to a
Google Apps Script Web App. See `apps-script/README.md` for the five-minute
setup (create a Sheet, paste `apps-script/Code.gs`, deploy, set
`LEAD_WEBHOOK_URL` in Vercel).
