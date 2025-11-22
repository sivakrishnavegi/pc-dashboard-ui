// app/unauthorized/page.tsx
'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { isLoggedIn, role } = useUserStore();

  // Map role → dashboard route
  const roleDashboard: Record<string, string> = {
    admin: '/dashboard/admin',
    user: '/dashboard/user',
    manager: '/dashboard/manager',
  };

  useEffect(() => {
    if (isLoggedIn && role) {
      const redirectPath = roleDashboard[role] || '/dashboard';
      router.replace(redirectPath);
    }
  }, [isLoggedIn, role, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center p-6">
      <ShieldAlert className="h-16 w-16 text-destructive mb-4" />

      <h1 className="text-3xl font-bold text-foreground mb-2">Access Denied</h1>
      <p className="text-muted-foreground max-w-md mb-6">
        You don’t have permission to view this page. Please contact your administrator if you
        believe this is a mistake.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
        >
          Go Home
        </Link>
        <Link
          href="/login"
          className="px-5 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition"
        >
          Login Again
        </Link>
      </div>
    </div>
  );
}
