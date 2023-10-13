/* eslint-disable @next/next/no-img-element */
import { ImageDocument, ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
}

const ComparableProductImages: React.FC<Props> = ({ product }) => {
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
    <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
      <div className="h-full w-full p-2.5">
        <div
          className={cn(
            'flex w-full items-center justify-center dark:border-white',
            {
              'h-[304px]': images.length === 1,
              'h-64': images.length > 1,
            }
          )}
        >
          <img
            src={images.length ? images[imageIndex].url : ''}
            className={cn('max-h-full rounded-sm', {
              hidden: !loaded,
            })}
            alt="image"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex h-10 w-full items-center justify-center space-x-12 pb-2">
          <button
            className={cn(
              'rounded- flex h-9 w-14 items-center justify-center px-2',
              {
                'border- hover:bg-primary': imageIndex !== 0,
                'bg-white': imageIndex === 0,
              }
            )}
            disabled={imageIndex === 0}
            onClick={handlePrevImage}
          >
            <img
              draggable={false}
              src="/img/left-arrow.svg"
              alt="Left arrow"
              className={cn('w-7', {
                hidden: imageIndex === 0,
              })}
            />
          </button>
          <div className="flex items-center justify-center space-x-1.5">
            {Array.from(Array(images.length).keys()).map((i) => (
              <span
                className={cn(' h-4 w-4 rounded-full border border-zinc-800', {
                  'bg-white': imageIndex !== i,
                  'bg-zinc-800': imageIndex === i,
                })}
              />
            ))}
          </div>
          <button
            className={cn(
              'rounded- flex h-9 w-14 items-center justify-center px-2',
              {
                'hover:bg-primary': imageIndex < images.length - 1,
                'bg-white': imageIndex === images.length - 1,
              }
            )}
            onClick={handleNextImage}
            disabled={imageIndex === images.length - 1}
          >
            <img
              draggable={false}
              src="/img/right-arrow.svg"
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

export default ComparableProductImages;
