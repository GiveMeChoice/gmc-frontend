import Link from 'next/link';
import React from 'react';
import { Avatar } from './avatar';
import { CoverImage } from './cover-image';

interface Props {
  title: string;
  coverImage: any;
  date: Date;
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
    <section id="hero-post">
      <div className="flex w-full divide-x-1.5 divide-secondary-dark-10">
        <div className="w-7/12">
          <CoverImage slug={slug} title={title} image={coverImage} priority />
        </div>
        <div className="flex w-5/12 flex-col justify-center bg-black px-10 py-3 text-white">
          {/* <div className="mb-4 ml-1.5 w-fit cursor-pointer border-1.5 border-white bg-black py-1 px-1.5 text-xs text-secondary hover:bg-primary hover:text-black">
            {categories[0].title.toUpperCase()}
          </div> */}
          <h3 className="font-bld mb-6 cursor-pointer pr-10 text-4xl hover:text-zinc-300 active:text-primary  xl:text-5xl">
            <Link prefetch={false} href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>
          <p className="mx-1 mb-5 leading-relaxed">{excerpt}</p>
          <div className="ml-1">
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
        </div>
      </div>
    </section>
  );
};
