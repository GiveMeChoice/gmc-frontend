import React from 'react';
import Image from 'next/future/image';
import { urlForImage } from '../lib/sanity';
import cn from 'classnames';

interface Props {
  big?: boolean;
  name: string;
  picture: any;
}

export const Avatar: React.FC<Props> = ({ big, name, picture }) => {
  const url = urlForImage(picture).height(86).width(86).fit('crop').url();
  return (
    <div className="flex items-center gap-x-2">
      <div
        className={cn('relative h-9 w-9', {
          'h-10 w-10': big,
        })}
      >
        <Image
          loader={() => url}
          unoptimized
          src={url}
          className="rounded-full"
          height={86}
          width={86}
          alt={name}
        />
      </div>
      <div
        className={cn('font-bold', {
          'text-lg': !big,
          'text-xl': big,
        })}
      >
        {name}
      </div>
    </div>
  );
};
