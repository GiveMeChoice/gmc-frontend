import React from 'react';
import { BlogPost } from '../../types';
import { Avatar } from '../avatar';
import { HeroImage } from '../hero-image';
import Link from 'next/link';
import { SquareImage } from '../square-image';

interface Props {
  post: BlogPost;
}

const PostListPost: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex min-h-[150px] w-full divide-x-1.5 divide-zinc-700 sm:h-fit">
      <div className="hidden cursor-pointer sm:block sm:w-3/5">
        <HeroImage
          framed
          slug={post.slug}
          title={post.title}
          image={post.coverImage}
        />
      </div>
      <div className="flex flex-grow flex-col justify-between gap-y-2 bg-white p-5 py-3.5 text-black sm:w-2/5 sm:justify-start sm:gap-y-4 sm:py-6 sm:px-8 md:gap-y-0">
        <Link href={`/blog/tags/${post.categories[0].slug}`}>
          <div className="hidden h-fit w-fit bg-zinc-900 sm:block">
            <div
              style={{ backgroundColor: post.categories[0].color }}
              className="w-fit translate-x-[1px] -translate-y-[1px] cursor-pointer border border-zinc-800 bg-black py-[6px] px-[9px] text-[11px] font-bold text-black transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 active:-translate-y-[1px] active:translate-x-[1px]"
            >
              {post.categories[0].title.toUpperCase()}
            </div>
          </div>
        </Link>
        <h4 className="cursor-pointer text-[14px] font-bold hover:text-zinc-500 active:text-primary sm:text-[19px] md:mt-3 md:text-2xl">
          <Link href={`/blog/${post.slug}`} prefetch={false}>
            {post.title}
          </Link>
        </h4>
        <p className="my-2 ml-0.5 hidden text-sm leading-relaxed text-zinc-700 md:block">
          {post.excerpt}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <Avatar name={post.author.name} picture={post.author.picture} />
          <Link href={`/blog/tags/${post.categories[0].slug}`}>
            <div className="h-fit w-fit bg-zinc-900 sm:hidden">
              <div
                style={{ backgroundColor: post.categories[0].color }}
                className="w-fit translate-x-[1px] -translate-y-[1px] cursor-pointer border border-zinc-800 bg-black py-[6px] px-[9px] text-[11px] font-bold text-black transition-transform duration-150"
              >
                {post.categories[0].title.toUpperCase()}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="block w-[150px] min-w-[150px] cursor-pointer sm:hidden">
        <SquareImage
          framed
          slug={post.slug}
          title={post.title}
          image={post.coverImage}
        />
      </div>
    </div>
  );
};

export default PostListPost;
