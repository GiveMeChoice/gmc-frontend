import NavbarBottomMappings from './navbar/navbar-bottom-mappings';
import NavbarBottomIntegration from './navbar/navbar-bottom-integration';
import NavbarTop from './navbar/navbar-top';
import NavbarBottomConfig from './navbar/navbar-bottom-config';

const Navbar: React.FC = () => {
  return (
    <>
      <NavbarTop />
      {location.pathname.includes('/mappings') && <NavbarBottomMappings />}
      {location.pathname.includes('/integration') && (
        <NavbarBottomIntegration />
      )}
      {location.pathname.includes('/config') && <NavbarBottomConfig />}
    </>
  );
};

export default Navbar;
