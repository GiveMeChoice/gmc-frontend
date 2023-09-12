import Link from 'next/link';
import React from 'react';
import { Avatar } from './avatar';
import { CoverImage } from './cover-image';

interface Props {
  title?: boolean;
  posts: any[];
}

export const PostSuggestions: React.FC<Props> = ({ title, posts }) => (
  <div className="flex w-full flex-wrap divide-x-1.5 divide-secondary-dark-10 border-t-1.5 border-secondary-dark-10 bg-black">
    {posts.map(
      ({ title, coverImage, date, excerpt, author, categories, slug }) => (
        <div className="min-h-full w-1/3 border-b-1.5 border-secondary-dark-10">
          <div className="cursor-pointer">
            <CoverImage framed slug={slug} title={title} image={coverImage} />
          </div>
          <div className="flex w-full flex-col justify-center bg-black p-10 text-secondary">
            <div className="mb-4 ml-0.5 w-fit cursor-pointer border-1.5 border-white bg-black p-1 px-1.5 text-xs text-white hover:bg-gmc-sunset hover:text-black">
              {categories[0].title.toUpperCase()}
            </div>
            <h3 className="mb-5 cursor-pointer pr-10 text-2xl font-bold hover:text-primary active:text-secondary-dark-50">
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
