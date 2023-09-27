import { ImageDocument, ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
}

const CompareProductImage: React.FC<Props> = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState<ImageDocument[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setImageIndex(0);
    setImages(product.images.filter((img) => img.type === 'DETAIL'));
  }, [product]);

  const handlePrevImage = () => {
    if (imageIndex !== 0) {
      setLoaded(false);
      setImageIndex(imageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (imageIndex < images.length - 1) {
      setLoaded(false);
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <div className="bgsecondary flex h-[327px] w-full flex-col items-center justify-center">
      <div className="h-full w-full">
        <div
          className={cn(
            '-z-10 flex h-full w-full items-center justify-center dark:border-white',
            {
              'h-[327px]': images.length === 1,
              'h-[273px]': images.length > 1,
            }
          )}
        >
          <img
            src={images.length ? images[imageIndex].url : ''}
            className={cn('border--1.5 border-zinc-700', {
              'h-[327px]': images.length === 1,
              'h-[273px]': images.length > 1,
              hidden: !loaded,
            })}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex h-[64px] w-full items-center justify-center space-x-12 border-t border-secondary bg-white pt-1 pb-1.5">
          <button
            className={cn(
              'flex aspect-square h-full items-center justify-center rounded-full border-zinc-700',
              {
                ' hover:bg-secondary active:bg-primary': imageIndex !== 0,
                '': imageIndex === 0,
              }
            )}
            disabled={imageIndex === 0}
            onClick={handlePrevImage}
          >
            <img
              draggable={false}
              src="/img/angle-left.svg"
              alt="Left arrow"
              className={cn('w-7', {
                hidden: imageIndex === 0,
              })}
            />
          </button>
          <div className="flex items-center justify-center space-x-1.5">
            {Array.from(Array(images.length).keys()).map((i) => (
              <span
                className={cn(
                  'h-[15px] w-[15px] rounded-full border border-zinc-800',
                  {
                    'bg-white': imageIndex !== i,
                    'bg-zinc-800': imageIndex === i,
                  }
                )}
              />
            ))}
          </div>
          <button
            className={cn(
              'flex aspect-square h-full items-center justify-center rounded-full border-zinc-700',
              {
                'hover:bg-secondary active:bg-primary':
                  imageIndex < images.length - 1,
                'bg-white': imageIndex === images.length - 1,
              }
            )}
            onClick={handleNextImage}
            disabled={imageIndex === images.length - 1}
          >
            <img
              draggable={false}
              src="/img/angle-right.svg"
              alt="Right arrow"
              className={cn('w-7', {
                hidden: imageIndex === images.length - 1,
              })}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default CompareProductImage;
