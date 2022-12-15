import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import 'normalize.css/normalize.css';
import React, { useEffect } from 'react';
import 'scss/main.scss';
import { client } from 'client';
import type { AppProps } from 'next/app';
import { AuthContextProvider, useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <AuthContextProvider>
        <FaustProvider client={client} pageProps={pageProps}>
          <Component {...pageProps} />
        </FaustProvider>
      </AuthContextProvider>
    </>
  );
}
