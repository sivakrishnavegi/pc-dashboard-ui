'use client';

import useLogout from '@/services/common/common';
import { useUserStore } from '@/store/userStore';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { logout } = useLogout();

  // Try both store + cookie
  const storeToken = useUserStore()?.token;

  const handleLogout = async () => {
    await logout();
    console.log('Logged out');
  };

  return (
    <>
      {children}
    </>
  );
};

export default SessionProvider;
