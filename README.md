# Portfolio Website

A modern, minimalist portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Black minimalist design** with elegant typography
- **Animated background** with flowing cyan/blue wireframe waves
- **3D layered project cards** with hover effects and glow
- **Responsive grid layout** (3 columns → 2 columns → 1 column)
- **Smooth scroll animations** powered by Framer Motion
- **Admin panel** at `/admin` for managing projects
- **localStorage** for data persistence

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js ecosystem (@react-three/fiber, @react-three/drei)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Pages

- `/` - Main portfolio page with project showcase
- `/admin` - Admin panel for managing projects (add, edit, delete)

## Project Structure

```
app/
├── page.tsx          # Main portfolio page
├── admin/
│   └── page.tsx      # Admin panel
├── layout.tsx        # Root layout
└── globals.css       # Global styles

components/
├── ProjectCard.tsx          # Project card with 3D effect
├── AnimatedBackground.tsx   # Animated wireframe background
└── Footer.tsx               # Footer with LinkedIn link

lib/
├── projects.ts       # Dummy project data (temporary)
└── localStorage.ts   # localStorage utilities

types/
└── index.ts          # TypeScript interfaces
```

## Admin Panel Usage

1. Navigate to `/admin`
2. Fill in the form to add a new project:
   - Title (required)
   - Description (required)
   - Image URL (optional)
   - Project Link (optional)
   - Tags (click "Add" or press Enter)
3. Click "Add Project" to save
4. Manage existing projects with Edit/Delete buttons

## Data Storage

Currently using localStorage for data persistence. Projects are stored in the browser and will persist across sessions. To migrate to a database later, update the functions in `lib/localStorage.ts`.

## Design Notes

- The design follows the proto.png reference with:
  - Deep black background (#000000)
  - Layered white cards with rounded corners (2rem radius)
  - Cyan/blue animated wireframe background
  - Elegant "Portfolio" heading with wide letter spacing
  - LinkedIn footer with CTA text

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
