import cn from 'classnames';
import { ProductDocument } from 'gmc-types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import EntryModal from '../Navbar/EntryModal';
import ListProductHeading from './ListProduct/ListProductHeading';
import ListProductInfoBox from './ListProduct/ListProductInfoBox';

interface Props {
  index: number;
  product: ProductDocument;
  blur?: boolean;
  isLast?: boolean;
  selectProduct: (i: number) => void;
}

const ListProduct: React.FC<Props> = ({
  index,
  product,
  blur,
  isLast,
  selectProduct,
}) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    let images = product.images.filter((img) => img.type === 'LIST');
    if (images.length === 0) {
      images = product.images;
    }
    if (images.length > 0) {
      const primary = images.find((img) => img.primary);
      setImgSrc(primary ? primary.url : images[0].url);
    }
  }, [product]);

  const handleProductClick = (e, index) => {
    e.preventDefault();
    if (!blur) {
      if (e.target.id !== 'list-product-heart') {
        selectProduct(index);
      }
    }
  };

  return (
    <div
      className={cn(
        'group relative z-0 flex min-h-[371px] w-full flex-col divide-y-1.5 divide-zinc-700  border-zinc-700 bg-white xl:w-1/2',
        {
          'border-r-1.5': index % 2 == 0,
          'border-b-1.5': !isLast,
          'cursor-default select-none': blur,
        }
      )}
    >
      {blur && (
        <div
          id="blur-item"
          className="bg-blur absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-center gap-y-4 bg-transparent backdrop-blur-sm"
        >
          {isLast && (
            <>
              <div className="brder rounded-s flex h-full w-full flex-col items-center justify-evenly gap-y-4 border-zinc-700 bg-secondary-dark-50 bg-opacity-50 p-5 text-center font-bold text-black">
                {/* <div className="-gmc-heart-light-50 flex h-full  flex-col items-center justify-evenly  gap-y-4 rounded-sm border-1.5 border-secondary-dark-30 bg-gradient-to-r from-gmc-surf-light-50 to-primary-light-50 p-4"> */}
                <Image
                  draggable={false}
                  src="/img/GMC_LOGO.svg"
                  alt="GMC Logo"
                  height="40px"
                  width="300px"
                />
                <span className="text-3xl font-bold tracking-wide text-white">
                  SIGN UP NOW TO ACCESS ALL CHOICES
                </span>
                <button
                  className="z-20 flex cursor-pointer items-center justify-start gap-x-4 rounded-full border border-zinc-900 bg-primary py-1.5 pl-2 shadow-md transition-transform duration-150 hover:scale-105 hover:bg-primary-light-10"
                  onClick={() => setSignupModalOpen(true)}
                >
                  <div className="flex aspect-square h-8 items-center justify-center rounded-full border border-black bg-white pr-0.5 pb-0.5">
                    <Image
                      draggable={false}
                      src="/img/user.svg"
                      alt="User Icon"
                      height="20px"
                      width="14px"
                    />
                  </div>
                  <span className="text-l whitespace-nowrap pl-2 pr-12 text-center">
                    CONTINUE
                  </span>
                </button>
                <span>
                  Already have an account?{' '}
                  <span
                    className="cursor-pointer font-bold text-white underline-offset-2 hover:text-primary-light-10 hover:underline"
                    onClick={() => setLoginModalOpen(true)}
                  >
                    Log in
                  </span>{' '}
                  or{' '}
                  <span
                    className="cursor-pointer font-bold text-white underline-offset-2 hover:text-primary-light-10 hover:underline"
                    onClick={() => setSignupModalOpen(true)}
                  >
                    Sign Up
                  </span>
                </span>
                {/* </div> */}
              </div>
              <EntryModal
                open={signupModalOpen}
                signUp={true}
                onClose={() => setSignupModalOpen(false)}
              />
              <EntryModal
                open={loginModalOpen}
                signUp={false}
                onClose={() => setLoginModalOpen(false)}
              />
            </>
          )}
        </div>
      )}
      <div
        className="h-full w-full"
        onClick={(e) => handleProductClick(e, index)}
      >
        <ListProductHeading index={index} title={product.title} blur={blur} />
      </div>
      <div className="flex h-[350px] w-full divide-x-1.5 divide-zinc-700">
        <div className="w-1/2">
          <ListProductInfoBox
            product={product}
            onSelectProduct={(e) => handleProductClick(e, index)}
          />
        </div>
        <div
          className={`relative flex max-h-full w-1/2 cursor-pointer flex-col items-start justify-center bg-white`}
          onClick={(e) => handleProductClick(e, index)}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="p-2 py-4">
              <img
                src={imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`}
                className={cn('', {
                  'transition-transform duration-150 group-hover:scale-[1.035]':
                    !blur,
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
