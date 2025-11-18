// app/not-found.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <h1 className="text-[5rem] font-extrabold text-muted-foreground mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-sm text-muted-foreground mb-6 text-center max-w-xs">
        The page you are looking for does not exist or may have been moved.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-input bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          Go to Home
        </Link>

        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2 text-sm font-medium text-foreground shadow hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
