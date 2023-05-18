import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useApollo } from '@/api/apolloClient';
import { ApolloProvider } from '@apollo/client';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
