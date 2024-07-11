'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers

// /pages/_app.tsx
// import type { AppProps } from 'next/app';
// import { SessionProvider } from 'next-auth/react';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import '../styles/globals.css'; // Adjust the path as necessary

// const queryClient = new QueryClient();

// function Providers({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SessionProvider session={session}>
//         <Component {...pageProps} />
//       </SessionProvider>
//     </QueryClientProvider>
//   );
// }

// export default Providers;