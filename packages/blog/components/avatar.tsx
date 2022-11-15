import React from 'react';
import Image from 'next/future/image';
import { urlForImage } from '../lib/sanity';

interface Props {
  name: string;
  picture: any;
}

export const Avatar: React.FC<Props> = ({ name, picture }) => {
  const url = urlForImage(picture).height(96).width(96).fit('crop').url();
  return (
    <div className="flex items-center">
      <div className="relative mr-4 h-12 w-12">
        <Image
          loader={() => url}
          unoptimized
          src={url}
          className="rounded-full"
          height={96}
          width={96}
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};
