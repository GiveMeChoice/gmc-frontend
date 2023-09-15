import React from 'react';
import { BlogPost } from '../types';
import { CoverImage } from './cover-image';
import Link from 'next/link';
import { Avatar } from './avatar';

interface Props {
  posts: BlogPost[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="divide-y-1.5 divide-secondary-dark-10 bg-secondary">
      {posts.slice(0, 10).map((post) => (
        <div className="flex w-full divide-x-1.5 divide-secondary-dark-10">
          <div className="w-3/5 cursor-pointer">
            <CoverImage
              framed
              slug={post.slug}
              title={post.title}
              image={post.coverImage}
            />
          </div>
          <div className="flex w-2/5 flex-grow flex-col bg-black py-6 px-8 text-white">
            <Link href={`/blog/tags/${post.categories[0].slug}`}>
              <div
                style={{ backgroundColor: post.categories[0].color }}
                className="mb-3 ml-0.5 w-fit cursor-pointer border-black bg-black py-[6px] px-[9px] text-[11px] text-black hover:text-zinc-500 active:text-secondary"
              >
                {post.categories[0].title.toUpperCase()}
              </div>
            </Link>
            <h4 className="cursor-pointer text-2xl font-bold hover:text-zinc-300 active:text-primary">
              <Link href={`/blog/${post.slug}`} prefetch={false}>
                {post.title}
              </Link>
            </h4>
            <p className="my-2 ml-0.5 text-sm leading-relaxed text-zinc-200">
              {post.excerpt}
            </p>
            <div className="mt-2">
              <Avatar name={post.author.name} picture={post.author.picture} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
