import Link from 'next/link';
import React from 'react';
import { Avatar } from './avatar';
import { CoverImage } from './cover-image';
import { HeroImage } from './hero-image';

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
        <div className="w-[60%]">
          <HeroImage slug={slug} title={title} image={coverImage} priority />
        </div>
        <div className="flex w-1/2 flex-col justify-center bg-black p-12 pr-16 text-white">
          {/* <div className="mb-4 ml-1.5 w-fit cursor-pointer border-1.5 border-white bg-black py-1 px-1.5 text-xs text-secondary hover:bg-primary hover:text-black">
            {categories[0].title.toUpperCase()}
          </div> */}
          <h3
            style={{ letterSpacing: 1.1, lineHeight: 1.22 }}
            className="normal mb-6 cursor-pointer pr-10 text-[44px] font-bold hover:text-zinc-300 active:text-primary"
          >
            <Link prefetch={false} href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>
          <p className="mx-1 mb-7 text-lg leading-relaxed">{excerpt}</p>
          <div className="ml-1">
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
        </div>
      </div>
    </section>
  );
};
