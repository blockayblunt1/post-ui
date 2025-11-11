This is the front-end for the Post Management API, built with [Next.js](https://nextjs.org) and Tailwind CSS.

## Features

- ✅ View all posts in a responsive grid layout
- ✅ Search posts by name
- ✅ Sort posts alphabetically (A-Z or Z-A)
- ✅ Create new posts with name, description, and image
- ✅ Edit existing posts
- ✅ Delete posts with confirmation
- ✅ Upload images (up to 10MB)
- ✅ Support for external image URLs
- ✅ Dark mode support
- ✅ Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:5254` (or configure `NEXT_PUBLIC_API_URL`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Create a `.env.local` file to configure the API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:5254
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `app/page.tsx` - Main page with post list and management
- `components/PostCard.tsx` - Component for displaying individual posts
- `components/PostForm.tsx` - Form component for creating/editing posts
- `lib/api.ts` - API client functions for backend communication
- `types/post.ts` - TypeScript type definitions

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
