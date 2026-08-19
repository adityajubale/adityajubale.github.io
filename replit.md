# Aditya Ubale Portfolio

A polished personal portfolio for Aditya Ubale, a full-stack software engineer focused on Angular, Node.js, ERP systems, and analytics automation.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/aditya-portfolio/src/App.tsx` — portfolio content, sections, navigation, filters, theme behavior, and interactions
- `artifacts/aditya-portfolio/src/index.css` — portfolio visual system, responsive layouts, motion, and theme tokens
- `artifacts/aditya-portfolio/index.html` — page metadata and document shell
- `attached_assets/Pasted--DOCTYPE-html-html-lang-en-data-theme-dark-head-meta-ch_1786962654704.txt` — original portfolio source content

## Architecture decisions

- The portfolio is a frontend-only single-page experience because its content is static and does not need a server or database.
- The visual direction intentionally moves away from the original neon-heavy template toward a Cellar-inspired editorial engineering identity: warm paper surfaces, oxblood accents, serif display typography, and restrained studio-like composition.
- The original uploaded HTML remains the source of truth for personal facts, projects, skills, metrics, and contact details.
- Navigation, project filtering, theme switching, scroll progress, and the contact mail action are implemented as real client-side interactions.

## Product

- Responsive personal portfolio with a high-impact hero and clear engineering positioning
- About, services, experience, skills, projects, and contact sections
- Project and skill filtering
- Desktop navigation plus a mobile bottom dock
- Light/dark theme toggle with local persistence
- Accessible mailto contact form

## User preferences

- Keep the portfolio stylish, polished, and meaningfully different from the original design.

## Gotchas

- Run the portfolio through the managed `artifacts/aditya-portfolio: web` workflow so `PORT` and `BASE_PATH` are provided.
- Keep personal facts and project claims aligned with the uploaded source unless Aditya provides updated details.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
