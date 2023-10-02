import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ProductDocument } from 'gmc-types';
import { useUser } from '../../../UserProvider';
import EntryModal from '../../../Navbar/EntryModal';

interface Props {
  product: ProductDocument;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const InfoBoxHeart: React.FC<Props> = ({
  product,
  modalOpen,
  setModalOpen,
}) => {
  const [favorited, setFavorited] = useState(false);
  const user = useUser();

  useEffect(() => {
    setFavorited(false);
  }, [product]);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (user.user) {
      setFavorited(!favorited);
    } else {
      setModalOpen(true);
    }
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <div
        id="buybox-heart"
        className={cn(
          'list-heart h-11 w-11 cursor-pointer select-none fill-white stroke-zinc-800 transition-all duration-100 active:scale-[1.07]',
          {
            'fill-gmc-heart active:fill-gmc-heart-light-10':
              favorited && user.user,
            ' active:fill-gmc-heart-light-10': !favorited && user.user,
          }
        )}
        onClick={handleClick}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="list-heart"
        >
          <path
            className="list-heart"
            d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <EntryModal
        open={modalOpen}
        signUp={true}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default InfoBoxHeart;
