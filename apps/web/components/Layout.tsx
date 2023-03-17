// import { PreviewAlert } from 'blog';
import { getUserTheme } from '../lib/theme';
import Navbar from './Navbar';
import { useUser } from './UserProvider';

const Layout = ({ preview = false, children }) => {
  const { profile } = useUser();

  return (
    <div
      id="screen"
      className={`min-h-screen bg-${
        getUserTheme(profile).base
      } z-0 border-black transition-colors duration-300 ease-in-out dark:border-white dark:text-white dark:decoration-white`}
    >
      {/* {preview && <PreviewAlert />} */}
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
