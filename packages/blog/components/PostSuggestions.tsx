import Link from 'next/link';
import React from 'react';
import { Avatar } from './avatar';
import { CoverImage } from './cover-image';
import { BlogPost } from '../types';

interface Props {
  title?: boolean;
  posts: BlogPost[];
}

export const PostSuggestions: React.FC<Props> = ({ title, posts }) => (
  <div className="flex w-full flex-wrap divide-x-1.5 divide-zinc-700 border-t-1.5 border-zinc-700">
    {posts.map(
      ({ title, coverImage, date, excerpt, author, categories, slug }) => (
        <div className="min-h-full w-1/3 divide-y-1.5 divide-zinc-700 border-b-1.5 border-zinc-700">
          <div className="cursor-pointer">
            <CoverImage framed slug={slug} title={title} image={coverImage} />
          </div>
          <div className="flex w-full flex-col justify-center bg-white p-10 text-black">
            <Link href={`/blog/tags/${categories[0].slug}`}>
              <div
                style={{ backgroundColor: categories[0].color }}
                className="ml-0.5 mb-4 w-fit cursor-pointer border-black bg-black py-[6px] px-[9px] text-[11px] text-black hover:text-zinc-500 active:text-secondary"
              >
                {categories[0].title.toUpperCase()}
              </div>
            </Link>
            <h3 className="mb-5 cursor-pointer pr-10 text-2xl font-bold hover:text-zinc-500 active:text-primary">
              <Link prefetch={false} href={`/blog/${slug}`}>
                {title}
              </Link>
            </h3>
            <p className="mb-5 ml-0.5 text-sm leading-relaxed">{excerpt}</p>
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
        </div>
      )
    )}
  </div>
);
