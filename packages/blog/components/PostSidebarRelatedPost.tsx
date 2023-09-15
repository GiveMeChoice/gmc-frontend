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
    <div className="flex w-full px-1 pt-4">
      <div className="flex w-[60%] flex-col gap-y-4">
        <Link href={`/blog/tags/${post.categories[0].slug}`}>
          <div
            style={{ backgroundColor: post.categories[0].color }}
            className="w-fit cursor-pointer border-black bg-black py-[6px] px-[9px] text-[11px] text-black hover:text-zinc-500 active:text-secondary"
          >
            {post.categories[0].title.toUpperCase()}
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
      <div className="w-[40%] pl-3">
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
