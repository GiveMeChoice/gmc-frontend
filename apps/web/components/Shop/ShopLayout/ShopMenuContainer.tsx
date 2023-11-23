import { HeroImage } from 'blog/components/hero-image';
import React from 'react';

const ShopMenuContainer: React.FC = ({ children }) => {
  return (
    <div className="hidden w-[340px] min-w-[340px] max-w-[340px] flex-col md:flex">
      {children}
    </div>
  );
};

export default ShopMenuContainer;
