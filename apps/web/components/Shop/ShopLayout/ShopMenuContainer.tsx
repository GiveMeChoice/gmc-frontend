import { HeroImage } from 'blog/components/hero-image';
import React from 'react';

const ShopMenuContainer: React.FC = ({ children }) => {
  return (
    <div className="hidden w-[340px] min-w-[340px] max-w-[340px] flex-col md:flex">
      <div className="h-fit w-full border-b-1.5 border-zinc-700">
        <HeroImage
          image={
            //   {
            //   _type: 'image',
            //   asset: {
            //     _ref: 'image-b3dfcda3ef08dccc190536a64029804ca5bbf652-6531x4354-jpg',
            //     _type: 'reference',
            //   },
            // }
            {
              _type: 'image',
              asset: {
                _ref: 'image-7fc8eb7108931907c24bef09739c49b1a50b30a8-2500x2500-jpg',
                _type: 'reference',
              },
            }
          }
        />
      </div>
      {children}
    </div>
  );
};

export default ShopMenuContainer;
