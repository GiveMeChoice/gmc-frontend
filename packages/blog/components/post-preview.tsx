import React from 'react';
import { Avatar } from '../components/avatar';
import { Date } from '../components/date';
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
  <div>
    <div className="mb-5">
      <CoverImage slug={slug} title={title} image={coverImage} />
    </div>
    <h3 className="mb-3 text-3xl leading-snug">
      <Link href={`/blog/${slug}`} className="hover:underline">
        {title}
      </Link>
    </h3>
    <PostCategories categories={categories} />
    <div
      className={cn('mb-4 text-lg', {
        'mt-2': categories,
      })}
    >
      <Date dateString={date} />
    </div>
    <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
    {author && <Avatar name={author.name} picture={author.picture} />}
  </div>
);
