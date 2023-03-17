import Link from 'next/link';
import React from 'react';

const DiscoverFooter: React.FC = () => {
  return (
    <div className="fixed bottom-0 mb-8 flex flex-col items-center">
      <span className="mb-8 text-sm">Discover</span>
      <Link href="#">
        <span className="cursor-pointer text-xl underline underline-offset-2 hover:text-primary">
          Organic Skincare
        </span>
      </Link>
      <Link href="#">
        <span className="cursor-pointer text-xl underline underline-offset-2 hover:text-primary">
          Palm Oil Free Chocolate
        </span>
      </Link>
      <Link href="#">
        <span className="cursor-pointer text-xl underline underline-offset-2 hover:text-primary">
          Rainforest friendly Coffee
        </span>
      </Link>
      <Link href="#">
        <span className="cursor-pointer text-xl underline underline-offset-2 hover:text-primary">
          Pre-Owned Clothing
        </span>
      </Link>
    </div>
  );
};

export default DiscoverFooter;
