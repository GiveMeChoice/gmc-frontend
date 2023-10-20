import Link from 'next/link';
import React from 'react';

const DiscoverFooter: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-evenly text-[21px]">
      <div className="flex flex-col items-center">
        <Link href="/shop/search?q=Organic+Skincare">
          <span className="group cursor-pointer underline underline-offset-2 hover:decoration-gmc-berry active:decoration-secondary-dark-40">
            <span className="group-hover:text-gmc-berry">Organic</span>{' '}
            <span className="group-hover:text-secondary-dark-40">Skincare</span>
          </span>
        </Link>
        <Link href="/shop/search?q=Palm+Oil+Free+Chocolate">
          <span className="group cursor-pointer underline underline-offset-2 hover:decoration-gmc-heart active:decoration-secondary-dark-40">
            <span className="group-hover:text-gmc-heart">Palm Oil Free</span>{' '}
            <span className="group-hover:text-secondary-dark-40">
              Chocolate
            </span>
          </span>
        </Link>
        <Link href="/shop/search?q=Rainforest-Friendly+Coffee">
          <span className="group cursor-pointer underline underline-offset-2 hover:decoration-gmc-surf active:decoration-secondary-dark-40">
            <span className="group-hover:text-gmc-surf">
              Rainforest-Friendly
            </span>{' '}
            <span className="group-hover:text-secondary-dark-40">Coffee</span>
          </span>
        </Link>
        <Link href="/shop/search?q=Pre-Owned+Clothing">
          <span className="group cursor-pointer underline underline-offset-2 hover:decoration-gmc-soil active:decoration-secondary-dark-40">
            <span className="group-hover:text-gmc-soil">Pre-Owned </span>
            <span className="group-hover:text-secondary-dark-40">Clothing</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DiscoverFooter;
