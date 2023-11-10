import Link from 'next/link';
import React from 'react';
import { Avatar } from './avatar';
import { useRouter } from 'next/router';
import { HeroImage } from './hero-image';
import { SuggestedPostImage } from './suggested-post-image';
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
  const router = useRouter();
  return (
    <section id="hero-post">
      <div className="flex w-full flex-col items-center border-x-1.5 border-t-1.5 border-zinc-700 md:flex-row md:items-stretch">
        <div className="hidden w-[60%] border-r-1.5 border-zinc-700 xl:block">
          <HeroImage slug={slug} title={title} image={coverImage} priority />
        </div>
        <div className="hidden border-r-1.5 border-zinc-700 md:block md:w-[60%] xl:hidden">
          <SuggestedPostImage
            slug={slug}
            title={title}
            image={coverImage}
            priority
          />
        </div>
        <div className="w-full border-x-1.5 border-zinc-700 bg-secondary md:hidden xl:hidden">
          <CoverImage slug={slug} title={title} image={coverImage} priority />
        </div>
        <div className="pr16 flex w-full flex-col justify-center border-t-1.5 border-zinc-700 bg-secondary px-12 py-8 pb-10 text-black md:w-1/2 md:border-0 md:py-12">
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
          <h3
            style={{ lineHeight: 1.2 }}
            className="normal mb-6 mt-3 cursor-pointer text-[32px] font-bold hover:text-zinc-500 active:text-primary md:pr-10 xl:text-[44px]"
          >
            <Link prefetch={false} href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>
          <p className="mx-1 mb-7 text-base leading-relaxed xl:text-lg">
            {excerpt}
          </p>
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
