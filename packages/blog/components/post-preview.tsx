import React from 'react';
import { Avatar } from '../components/avatar';
import { PostDate } from './date';
import { CoverImage } from './cover-image';
import Link from 'next/link';
import PostCategories from './post-categories';
import cn from 'classnames';

interface Props {
  title: string;
  coverImage: any;
  date: string;
  excerpt: any;
  author: any;
  categories: any;
  slug: string;
}

export const PostPreview: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  categories,
  slug,
}) => (
  <div className="rounded-sm border border-secondary-dark-20 shadow-sm">
    <div className="mb-1.5 cursor-pointer">
      <CoverImage framed slug={slug} title={title} image={coverImage} />
    </div>
    <div className="flex w-full flex-grow flex-col justify-between px-5 pt-2 pb-4 md:px-6">
      <div>
        <h3 className="mb-3 cursor-pointer text-3xl leading-snug hover:underline hover:decoration-2 hover:underline-offset-2">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <PostCategories categories={categories} />
        <div
          className={cn('mb-4 text-lg', {
            'mt-2': categories,
          })}
        >
          <PostDate dateString={date} />
        </div>
        <p className="mb-4 text-lg leading-relaxed text-zinc-700">{excerpt}</p>
      </div>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  </div>
);
