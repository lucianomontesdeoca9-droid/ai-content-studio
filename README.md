# Web App

This repository is now configured as a Next.js starter app with Tailwind CSS.

## Structure

- `app/layout.tsx` — root layout and global page wrapper
- `app/page.tsx` — homepage landing page
- `app/globals.css` — Tailwind base styles and global styling
- `components/` — reusable UI pieces like navbar and sidebar
- `package.json` — Next.js, Tailwind y Supabase
- `tailwind.config.js` — Tailwind content y tema
- `postcss.config.js` — PostCSS plugin configuration
- `lib/supabaseClient.ts` — cliente Supabase para autenticar usuarios
- `lib/aiService.ts` — servicio de IA reusable para generación de contenido
- `app/login/page.tsx` — página de inicio de sesión
- `app/register/page.tsx` — página de registro
- `app/dashboard/*` — rutas protegidas del dashboard

## Getting Started

Create a `.env.local` file from `.env.example` and add your Supabase and OpenAI credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-api-key
```

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Then open:

- `/login` — iniciar sesión
- `/register` — registrarse
- `/dashboard` — área protegida
