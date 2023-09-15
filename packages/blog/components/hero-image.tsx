import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '../lib/sanity';

interface Props {
  framed?: boolean;
  title?: string;
  slug?: string;
  image?: any;
  priority?: boolean;
  onClick?: (slug: string) => void;
}

export const HeroImage: React.FC<Props> = ({
  framed,
  title,
  slug,
  image: source,
  priority,
  onClick,
}) => {
  const url = urlForImage(source).height(1200).width(1800).url();
  const image = source?.asset?._ref ? (
    <div
      className={cn('shadow-small', {
        'hover:shadow-medium cursor-pointer transition-shadow duration-200':
          slug,
      })}
    >
      <Image
        className={cn('w-full', {})}
        layout="responsive"
        width={1800}
        height={1200}
        unoptimized
        loader={() => url}
        alt={`Cover Image for ${title}`}
        src={url}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/blog/${slug}`} aria-label={title}>
          <a
            href={`/blog/${slug}`}
            onClick={() => (onClick ? onClick(slug) : null)}
          >
            {image}
          </a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};
