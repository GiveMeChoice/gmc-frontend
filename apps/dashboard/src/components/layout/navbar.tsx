import NavbarBottom from './navbar/navbar-bottom';
import NavbarTop from './navbar/navbar-top';

const Navbar: React.FC = () => {
  return (
    <>
      <NavbarTop />
      {location.pathname.includes('/mappings') && <NavbarBottom />}
    </>
  );
};

export default Navbar;
