import cn from 'classnames';
import { ProductDocument } from 'gmc-types';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useUser } from '../../../Context/UserProvider';

interface Props {
  product: ProductDocument;
}

const BuyBoxLink: React.FC<Props> = ({ product }) => {
  const user = useUser();

  useEffect(() => {}, [product]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (user.user) {
    } else {
    }
  };

  return (
    <div
      id="buybox-link"
      className={cn(
        'flex h-[44px] w-[44px] cursor-pointer select-none items-center justify-center rounded-full hover:bg-secondary active:bg-secondary-dark-10'
      )}
      onClick={handleClick}
    >
      <Image src="/img/link.svg" alt="Product Link" height={30} width={30} />
    </div>
  );
};

export default BuyBoxLink;
