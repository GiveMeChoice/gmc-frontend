import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ShopProvider } from '../components/Context/ShopProvider';
import { UserProvider } from '../components/Context/UserProvider';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ShopProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ShopProvider>
    </UserProvider>
  );
}
