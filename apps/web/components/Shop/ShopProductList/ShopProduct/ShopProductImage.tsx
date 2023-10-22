import { ImageDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  images: ImageDocument[];
}

const ShopProductImage: React.FC<Props> = ({ images }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    let listImages = images.filter((img) => img.type === 'LIST');
    if (listImages.length === 0) {
      listImages = listImages;
    }
    if (listImages.length > 0) {
      const primary = listImages.find((img) => img.primary);
      setImageUrl(primary ? primary.url : listImages[0].url);
    }
  }, [images]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="overflow-hidden border-y-1.5 border-secondary">
        <Image
          src={imageUrl}
          priority
          draggable={false}
          layout="fill"
          objectFit="cover"
          alt="hero"
        />
      </div>
    </div>
  );
};

export default ShopProductImage;
