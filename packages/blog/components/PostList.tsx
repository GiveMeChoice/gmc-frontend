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
    <div className="divide-y-1.5 divide-zinc-700 bg-secondary">
      {posts.slice(0, 10).map((post) => (
        <div className="flex w-full divide-x-1.5 divide-zinc-700">
          <div className="w-3/5 cursor-pointer">
            <CoverImage
              framed
              slug={post.slug}
              title={post.title}
              image={post.coverImage}
            />
          </div>
          <div className="flex w-2/5 flex-grow flex-col bg-white py-6 px-8 text-black">
            <Link href={`/blog/tags/${post.categories[0].slug}`}>
              <div className="h-fit w-fit bg-zinc-900">
                <div
                  style={{ backgroundColor: post.categories[0].color }}
                  className="w-fit translate-x-[1px] -translate-y-[1px] cursor-pointer border border-zinc-800 bg-black py-[6px] px-[9px] text-[11px] font-bold text-black transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 active:-translate-y-[1px] active:translate-x-[1px]"
                >
                  {post.categories[0].title.toUpperCase()}
                </div>
              </div>
            </Link>
            <h4 className="mt-3 cursor-pointer text-2xl font-bold hover:text-zinc-500 active:text-primary">
              <Link href={`/blog/${post.slug}`} prefetch={false}>
                {post.title}
              </Link>
            </h4>
            <p className="my-2 ml-0.5 text-sm leading-relaxed text-zinc-700">
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
