// src/components/ClientQueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface ClientQueryProviderProps {
  children: ReactNode;
}

const ClientQueryProvider: React.FC<ClientQueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {children}
    </QueryClientProvider>
  );
}

export default ClientQueryProvider;
