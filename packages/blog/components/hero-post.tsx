import Link from 'next/link';
import React from 'react';
import { Avatar } from './avatar';
import { CoverImage } from './cover-image';
import { Date } from './date';
import PostCategories from './post-categories';

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
    <section>
      <div className="mb-8 cursor-pointer md:mb-12">
        <CoverImage slug={slug} title={title} image={coverImage} priority />
      </div>
      <div className="mb-8 md:mb-12 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 cursor-pointer text-4xl leading-tight decoration-2 hover:underline hover:underline-offset-4 lg:text-6xl">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <div className="mb-4  md:block">
            <PostCategories categories={categories} />
          </div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
      <hr className="border-accent-2 mb-12 w-full border-secondary-dark-20" />
    </section>
  );
};
