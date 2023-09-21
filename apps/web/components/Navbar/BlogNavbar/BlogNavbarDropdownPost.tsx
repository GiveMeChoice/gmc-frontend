import { CoverImage, Avatar, BlogPost } from 'blog';
import Link from 'next/link';
import React from 'react';

interface Props {
  post: BlogPost;
  onNavigate: () => void;
}

const BlogNavbarDropdownPost: React.FC<Props> = ({ post, onNavigate }) => {
  return (
    <div className="flex h-[520px] w-full flex-col divide-y-1.5 divide-zinc-700">
      <div className="w-full cursor-pointer">
        <CoverImage
          framed
          slug={post.slug}
          title={post.title}
          image={post.coverImage}
          onClick={onNavigate}
        />
      </div>
      <div className="flex h-[320px] w-full flex-grow flex-col justify-between gap-y-[8px] overflow-y-hidden bg-white p-6 py-7 text-black xl:h-[300px]">
        <Link href={`/blog/tags/${post.categories[0].slug}`}>
          <div className="h-fit w-fit bg-zinc-900">
            <div
              style={{ backgroundColor: post.categories[0].color }}
              className="w-fit translate-x-[1px] -translate-y-[1px] cursor-pointer border border-zinc-800 bg-black py-[6px] px-[9px] text-[11px] font-bold text-black transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 active:-translate-y-[1px] active:translate-x-[1px]"
              onClick={onNavigate}
            >
              {post.categories[0].title.toUpperCase()}
            </div>
          </div>
        </Link>
        <h4 className="cursor-pointer text-[22px] font-bold hover:text-zinc-500 active:text-primary">
          <Link href={`/blog/${post.slug}`}>
            <a href={`/blog/${post.slug}`} onClick={onNavigate}>
              {post.title}
            </a>
          </Link>
        </h4>
        <p className="ml-0.5 mb-1 text-sm leading-relaxed">{post.excerpt}</p>
        {post.author && (
          <Avatar name={post.author.name} picture={post.author.picture} />
        )}
      </div>
    </div>
  );
};

export default BlogNavbarDropdownPost;
