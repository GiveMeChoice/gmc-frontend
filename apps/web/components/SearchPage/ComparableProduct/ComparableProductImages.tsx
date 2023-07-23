import { ImageDocument, ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
}

const ComparableProductImages: React.FC<Props> = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState<ImageDocument[]>([]);

  useEffect(() => {
    setImageIndex(0);
    setImages(product.images.filter((img) => img.type === 'DETAIL'));
  }, [product]);

  const handlePrevImage = () => {
    if (imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
      <div className="h-full w-full p-2.5">
        <div className="flex h-64 w-full items-center justify-center dark:border-white">
          <img
            src={images.length ? images[imageIndex].url : ''}
            className="max-h-64 rounded-lg"
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full justify-center space-x-1.5 pb-2.5">
            {Array.from(Array(images.length).keys()).map((i) => (
              <span
                className={cn(
                  'h-2.5 w-2.5 rounded-full border-1.5 border-zinc-900',
                  {
                    'bg-white': imageIndex !== i,
                    'bg-zinc-900': imageIndex === i,
                  }
                )}
              />
            ))}
          </div>
          <div className="flex w-full justify-center divide-x-1.5 divide-secondary-dark-10 border-t-1.5 border-secondary-dark-10">
            <button
              className={cn('flex w-1/2 items-center justify-center py-2', {
                'hover:bg-primary': imageIndex !== 0,
                'bg-secondary': imageIndex === 0,
              })}
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
            <button
              className={cn('flex w-1/2 items-center justify-center py-2', {
                'hover:bg-primary': imageIndex < images.length - 1,
                'bg-secondary': imageIndex === images.length - 1,
              })}
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
        </div>
      )}
    </div>
  );
};

export default ComparableProductImages;
