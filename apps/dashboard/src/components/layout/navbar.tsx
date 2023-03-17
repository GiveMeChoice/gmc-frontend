import NavbarBottomMappings from './navbar/navbar-bottom-mappings';
import NavbarBottomSources from './navbar/navbar-bottom-sources';
import NavbarTop from './navbar/navbar-top';

const Navbar: React.FC = () => {
  return (
    <>
      <NavbarTop />
      {location.pathname.includes('/mappings') && <NavbarBottomMappings />}
      {location.pathname.includes('/product-sources') && (
        <NavbarBottomSources />
      )}
    </>
  );
};

export default Navbar;
