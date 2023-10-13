import { IProductImage } from 'gmc-types';
import React, { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

interface Props {
  images: IProductImage[];
}

const ProductPageImage: React.FC<Props> = ({ images: initialImages }) => {
  const [heroImageIndex, setHeroImageIndex] = useState<number>(0);
  // useEffect(() => {}, [heroImageIndex]);
  const [images, setImages] = useState<IProductImage[]>(
    initialImages
      .filter((img) => img.type === 'DETAIL')
      .slice(0, 4)
      .sort((a, b) => (a.primary === b.primary ? 0 : a.primary ? -1 : 1))
  );

  return (
    <div className="flex h-full max-h-[500px] w-full divide-x-1.5 divide-zinc-700">
      <div className="flex h-full w-1/5 flex-col divide-y-1.5 divide-zinc-700">
        {images.map((img, i) => (
          <div
            className={cn('flex aspect-square h-1/4', {})}
            onMouseEnter={() => setHeroImageIndex(i)}
          >
            <div
              className={cn(
                'relative h-full w-full border-5 bg-secondary-light-30',
                {
                  'border-primary': heroImageIndex === i,
                  'border-secondary-light-30 hover:border-primary':
                    heroImageIndex !== i,
                }
              )}
            >
              <div className="relative h-full w-full">
                <Image
                  src={img.url}
                  priority
                  draggable={false}
                  className={cn('transition-all duration-300', {
                    'scale-105': heroImageIndex === i,
                    'hover:scale-105': heroImageIndex !== i,
                  })}
                  layout="fill"
                  objectFit="cover"
                  alt="hero"
                />
              </div>
            </div>
          </div>
        ))}
        {images.length < 4 && <div />}
      </div>
      <div className="relative flex h-full flex-grow cursor-zoom-in items-center p-3 px-1">
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <Image
            src={images[heroImageIndex].url}
            priority
            className="rounded-md"
            layout="responsive"
            height={450}
            width={480}
            objectFit="contain"
            objectPosition="center md:top"
            alt="hero"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPageImage;
