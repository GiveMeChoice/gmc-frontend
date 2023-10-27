import React from 'react';
import { useShop } from '../../../Context/ShopProvider';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

const SearchResultLogo: React.FC<Props> = ({ onClick }) => {
  const shop = useShop();

  return (
    <div
      onClick={onClick}
      className="h-[42px] w-fit min-w-[240px] max-w-full overflow-hidden border-b-[2.5px] border-black px-2 pt-1 text-center"
    >
      <span className="whitespace-nowrap text-[27px] leading-[1.3]">
        {shop.request.query}
      </span>
    </div>
  );
};

export default SearchResultLogo;
