import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ProductDocument } from 'gmc-types';

interface Props {
  product: ProductDocument;
}

const ComparableBuyBoxHeart: React.FC<Props> = ({ product }) => {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(false);
  }, [product]);

  const handleClick = () => {
    setFavorited(!favorited);
  };

  return (
    <div
      className={cn(
        'h-12 w-12 cursor-pointer select-none active:scale-[1.04]',
        {
          'fill-gmc-heart stroke-black active:fill-gmc-heart-light-10':
            favorited,
          'fill-white stroke-black hover:fill-gmc-heart-light-50  active:fill-gmc-heart-light-10':
            !favorited,
        }
      )}
      onClick={handleClick}
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
  );
};

export default ComparableBuyBoxHeart;
