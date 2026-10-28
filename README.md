# Arun Paul — Wildlife & Travel Photo Journal

A cinematic photography portfolio starter built with Next.js App Router, TypeScript, Tailwind CSS v4, Motion for React, Lucide, and embedded Sanity Studio.

## Requirements

- Node.js 20.9+ (Node 22 LTS recommended)
- npm
- A Sanity account/project for CMS publishing

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The homepage works with demonstration images before Sanity is configured. Replace demo images with your own licensed photographs before publishing.

## Configure Sanity

1. Create a project at https://www.sanity.io/manage.
2. Copy the project ID into `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`.
3. Set `NEXT_PUBLIC_SANITY_DATASET=production`.
4. Restart the development server.
5. Open http://localhost:3000/studio and sign in.
6. In the Sanity project API settings, add your local and deployed website origins as needed.

Schemas for homepage slides, photographs, and stories are included. The homepage currently uses local demo data; the next integration step is to query `heroSlide` documents and map their Sanity image assets to the slider props.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint

## Notes

- Hero autoplay pauses on hover, focus, hidden tabs, and reduced-motion preference.
- Demo photographs are loaded from Unsplash. Replace with photographs you own or have permission to publish.
- Update the sample Instagram and email links in `components/layout/site-footer.tsx`.
- Review all copy, image descriptions, contact details, and licensing terms before launch.
