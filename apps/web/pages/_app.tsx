import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { SearchProvider } from '../components/SearchProvider';
import { UserProvider } from '../components/UserProvider';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SearchProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SearchProvider>
    </UserProvider>
  );
}
