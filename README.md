# Lake Escape

Premium Next.js website for Lake Escape, a floating luxury hotel on Tehri Lake, Uttarakhand.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion, GSAP and Lenis
- Prisma PostgreSQL schema
- Server Actions-ready booking flow

## Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` before connecting production services:

```bash
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SITE_URL="https://lakeescape.in"
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
RESEND_API_KEY=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_META_PIXEL_ID=""
```

## Structure

- `app` routes, metadata, robots and sitemap
- `components` reusable UI and animation systems
- `lib` content, media references and utilities
- `actions` server action entry points
- `prisma` PostgreSQL data model
- `public/media` supplied Lake Escape images and video

## Deployment

Push the repository to GitHub, import it into Vercel, set environment variables, then deploy. The app is static-friendly today and ready for database-backed booking/admin modules.
