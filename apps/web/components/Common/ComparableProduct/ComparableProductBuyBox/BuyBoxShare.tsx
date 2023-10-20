import cn from 'classnames';
import { ProductDocument } from 'gmc-types';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useUser } from '../../../Context/UserProvider';

interface Props {
  product: ProductDocument;
}

const BuyBoxShare: React.FC<Props> = ({ product }) => {
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
      id="buybox-share"
      className={cn(
        'flex h-[44px] w-[44px] cursor-pointer select-none items-center justify-center rounded-full hover:bg-secondary active:bg-secondary-dark-10'
      )}
      onClick={handleClick}
    >
      <Image src="/img/share.svg" alt="Share Product" height={26} width={26} />
    </div>
  );
};

export default BuyBoxShare;
