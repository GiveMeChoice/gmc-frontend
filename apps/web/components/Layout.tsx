// import { PreviewAlert } from 'blog';
import { PreviewAlert } from 'blog';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ preview = false, children }) => {
  const router = useRouter();
  return (
    <div
      id="screen"
      className={`z-0 flex min-h-screen flex-col justify-between`}
    >
      {preview && <PreviewAlert />}
      {router.pathname !== '/' && router.pathname !== '/access' && <Navbar />}
      <main className={cn('', { 'mt-22': router.pathname !== '/' })}>
        {children}
      </main>
      {router.pathname !== '/smearch' && router.pathname !== '/access' && (
        <Footer />
      )}
    </div>
  );
};

export default Layout;
