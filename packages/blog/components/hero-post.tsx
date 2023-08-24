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
    <section id="hero-post" className="mt-[49px]">
      <div className="flex w-full">
        <div className="w-7/12">
          <CoverImage slug={slug} title={title} image={coverImage} priority />
        </div>
        <div className="flex w-5/12 flex-col justify-center bg-secondary px-10 py-3 text-black">
          <h3 className="font-bld mb-5 cursor-pointer pr-10 text-4xl hover:text-secondary-dark-50  xl:text-5xl">
            <Link prefetch={false} href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>
          <div className="mb-4 ml-1.5 w-fit cursor-pointer border-1.5 border-black bg-black py-1 px-1.5 text-xs text-secondary hover:bg-primary hover:text-black">
            {categories[0].title.toUpperCase()}
          </div>
          <p className="mx-1 mb-4 leading-relaxed">
            {excerpt.substring(0, 140)}
          </p>
          <div className="ml-1">
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
        </div>
      </div>
    </section>
  );
};
