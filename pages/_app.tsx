import React from "react";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from "@tanstack/react-query";
import 'styles/global.css';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const queryClient = new QueryClient();
const cache = createCache({
  key: 'css',
  prepend: true,
});
function App({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const AppComponent = Component as any;
  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppComponent {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </CacheProvider>
  );
}
export default App;
