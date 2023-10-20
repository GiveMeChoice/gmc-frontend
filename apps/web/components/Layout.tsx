// import { PreviewAlert } from 'blog';
import { PreviewAlert } from 'blog';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Footer from './Layout/Footer';
import Navbar from './Layout/Navbar';

const Layout = ({ preview = false, children }) => {
  const router = useRouter();
  return (
    <div
      id="screen"
      className={`z-0 flex min-h-screen w-full flex-col justify-between overflow-x-hidden`}
    >
      {preview && <PreviewAlert />}
      {router.pathname !== '/' && router.pathname !== '/access' && <Navbar />}
      <main
        className={cn('overflow-x-hidden', {
          'mt-22': router.pathname !== '/',
        })}
      >
        {children}
      </main>
      {router.pathname !== '/access' && <Footer />}
    </div>
  );
};

export default Layout;
