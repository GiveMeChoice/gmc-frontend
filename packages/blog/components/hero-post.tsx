import Link from 'next/link';
import React from 'react';
import { Avatar } from './avatar';
import { CoverImage } from './cover-image';

interface Props {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  categories: any;
  slug: string;
}

export const HeroPost: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  categories,
  slug,
}) => {
  return (
    <section id="hero-post" className="mt-[55px]">
      <div className="flex w-full">
        <div className="relative w-7/12">
          <CoverImage slug={slug} title={title} image={coverImage} priority />
        </div>
        <div className="flex w-5/12 flex-col justify-center bg-black px-10 py-3 text-secondary">
          <div className="mb-4 w-fit cursor-pointer border-1.5 border-white bg-black p-1 px-1.5 text-xs text-white hover:bg-gmc-sunset hover:text-black">
            {categories[0].title.toUpperCase()}
          </div>
          <h3 className="mb-5 cursor-pointer pr-10 text-4xl font-bold hover:text-primary active:text-secondary-dark-50">
            <Link prefetch={false} href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>
          <p className="mb-4 leading-relaxed">{excerpt.substring(0, 140)}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
};
