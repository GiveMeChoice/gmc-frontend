import Link from 'next/link';
import React from 'react';
import { Avatar } from './avatar';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  return (
    <section id="hero-post">
      <div className="flex w-full divide-x-1.5 divide-zinc-700 border-t-1.5 border-zinc-700">
        <div className="w-[60%]">
          <HeroImage slug={slug} title={title} image={coverImage} priority />
        </div>
        <div className="flex w-1/2 flex-col justify-center bg-secondary p-12 pr-16 text-black">
          {/* {!router.asPath.includes('/tags/') && ( */}
          <Link href={`/blog/tags/${categories[0].slug}`}>
            <div className="h-fit w-fit bg-zinc-900">
              <div
                style={{ backgroundColor: categories[0].color }}
                className="w-fit translate-x-[1px] -translate-y-[1px] cursor-pointer border border-zinc-800 bg-black py-[7px] px-[10px] text-[11px] font-bold text-black transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 active:-translate-y-[1px] active:translate-x-[1px]"
              >
                {categories[0].title.toUpperCase()}
              </div>
            </div>
          </Link>
          {/* )} */}
          <h3
            style={{ lineHeight: 1.2 }}
            className="normal mb-6 mt-3 cursor-pointer pr-10 text-[44px] font-bold hover:text-zinc-500 active:text-primary"
          >
            <Link prefetch={false} href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>
          <p className="mx-1 mb-7 text-lg leading-relaxed">{excerpt}</p>
          <div className="ml-1">
            {author && (
              <Avatar name={author.name} picture={author.picture} big />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
