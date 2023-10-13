import { IProduct } from 'gmc-types';
import React, { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useUser } from '../UserProvider';
import EntryModal from '../Navbar/EntryModal';

interface Props {
  product: IProduct;
}

const ProductPageBuyBox: React.FC<Props> = ({ product }) => {
  const [favorited, setFavorited] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const user = useUser();

  const handleFavoriteClick = () => {
    setFavorited(!favorited);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-12 pb-10 pt-5">
      <div className="flex w-full max-w-[560px] items-center justify-between">
        <span className="pb-1.5 text-[19px] font-bold">￡{product.price}</span>
        <div className="flex gap-x-4">
          <div
            id="buybox-heart"
            className={cn(
              'select-nonetransition-all h-[42px] w-[42px] cursor-pointer stroke-zinc-700 duration-150 active:scale-[1.07]',
              {
                'fill-white stroke-zinc-800': !user.user || !favorited,
                'fill-primary': favorited && user.user,
              }
            )}
            onClick={handleFavoriteClick}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <EntryModal
            open={signUpModalOpen}
            signUp={true}
            onClose={() => setSignUpModalOpen(false)}
          />
          <div
            id="buybox-share"
            className={cn(
              'flex h-[40px] w-[40px] cursor-pointer select-none items-center justify-center rounded-full py-0.5 hover:bg-secondary active:bg-secondary-dark-10'
            )}
            onClick={handleFavoriteClick}
          >
            <Image
              src="/img/share.svg"
              alt="Share Product"
              height={34}
              width={34}
            />
          </div>
        </div>
      </div>
      <div className="active:bg-transarent z-0 mt-6  w-fit rounded-full bg-primary">
        <a
          href={product.offerUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:-translate-[6px] hover:translate--[4px] group flex h-[63px] w-full
items-center justify-between gap-x-3 rounded-full bg-black px-10 text-[16px] text-white transition-transform duration-200 ease-in-out hover:bg-zinc-700 active:translate-y-0 active:translate-x-0 active:bg-black
"
        >
          <span className="fon-bold text-[17px] tracking-wide group-active:text-primary">
            Buy Now at {product.merchantBrand.gmcBrand.name}
          </span>
          <div
            className={cn(
              'ml-2 flex h-7 w-7 items-center justify-center rounded-full'
            )}
          >
            <Image
              className=""
              draggable={false}
              src="/img/external-link.svg"
              alt="give me"
              width="26"
              height="26"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProductPageBuyBox;
