// import { PreviewAlert } from 'blog';
import { PreviewAlert } from 'blog';
import { getUserTheme } from '../lib/theme';
import Navbar from './Navbar';
import { useUser } from './UserProvider';
import { useRouter } from 'next/router';

const Layout = ({ preview = false, children }) => {
  const { profile } = useUser();
  const router = useRouter();

  return (
    <div
      id="screen"
      className={`h-screen bg-${
        getUserTheme(profile).base
      } z-0 flex flex-col transition-colors duration-300 ease-in-out dark:border-white dark:text-white dark:decoration-white`}
    >
      {preview && <PreviewAlert />}
      {router.pathname !== '/' && <Navbar />}
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
