// import { PreviewAlert } from 'blog';
import { PreviewAlert } from 'blog';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import { useEffect } from 'react';

const Layout = ({ preview = false, children }) => {
  const router = useRouter();
  return (
    <div id="screen" className={`z-0 flex h-screen flex-col`}>
      {preview && <PreviewAlert />}
      {router.pathname !== '/' && router.pathname !== '/access' && <Navbar />}
      <main className={cn('', { 'mt-22': router.pathname !== '/' })}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
