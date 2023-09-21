import React from 'react';
import { BlogPost } from '../types';
import Link from 'next/link';
import { SquareImage } from './square-image';
import { Avatar } from './avatar';

interface Props {
  post: BlogPost;
}

const PostSidebarRelatedPost: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex w-full pt-4">
      <div className="flex w-[60%] flex-col gap-y-3">
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
        <Link href={`/blog/${post.slug}`}>
          <a href={`/blog/${post.slug}`}>
            <p
              style={{ lineHeight: 1.3 }}
              className="text-[17px] font-bold hover:text-zinc-500"
            >
              {post.title}
            </p>
          </a>
        </Link>
        <Avatar {...post.author} />
      </div>
      <div className="w-[40%] pl-3.5">
        <SquareImage
          image={post.coverImage}
          title={post.title}
          slug={post.slug}
        />
      </div>
    </div>
  );
};

export default PostSidebarRelatedPost;
