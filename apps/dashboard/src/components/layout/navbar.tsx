import NavbarBottomMappings from './navbar/navbar-bottom-mappings';
import NavbarBottomIntegration from './navbar/navbar-bottom-integration';
import NavbarTop from './navbar/navbar-top';

const Navbar: React.FC = () => {
  return (
    <>
      <NavbarTop />
      {location.pathname.includes('/mappings') && <NavbarBottomMappings />}
      {location.pathname.includes('/integration') && (
        <NavbarBottomIntegration />
      )}
    </>
  );
};

export default Navbar;
