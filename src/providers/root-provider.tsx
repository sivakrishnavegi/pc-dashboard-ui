'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
         {children}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default RootProvider;
