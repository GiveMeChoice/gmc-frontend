import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { UserProvider } from '../components/UserProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
