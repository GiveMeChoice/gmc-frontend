import { CoverImage, Avatar, BlogPost } from 'blog';
import Link from 'next/link';
import React from 'react';

interface Props {
  post: BlogPost;
  onNavigate: () => void;
}

const BlogNavbarDropdownPost: React.FC<Props> = ({ post, onNavigate }) => {
  return (
    <div className="flex h-full w-full flex-col divide-y-1.5 divide-zinc-700">
      <div className="w-full cursor-pointer">
        <CoverImage
          framed
          slug={post.slug}
          title={post.title}
          image={post.coverImage}
          onClick={onNavigate}
        />
      </div>
      <div className="flex h-[320px] w-full flex-grow flex-col gap-y-[15px] overflow-y-hidden bg-white p-6 text-black xl:h-[300px]">
        <Link href={`/blog/tags/${post.categories[0].slug}`}>
          <div
            style={{ backgroundColor: post.categories[0].color }}
            className="ml-0.5 w-fit cursor-pointer border-black bg-black py-[6px] px-[9px] text-[11px] text-black hover:text-zinc-600 active:text-secondary"
            onClick={onNavigate}
          >
            {post.categories[0].title.toUpperCase()}
          </div>
        </Link>
        <h4 className="cursor-pointer text-[22px] font-bold hover:text-zinc-500 active:text-primary">
          <Link href={`/blog/${post.slug}`}>
            <a href={`/blog/${post.slug}`} onClick={onNavigate}>
              {post.title}
            </a>
          </Link>
        </h4>
        <p className="ml-0.5 text-sm leading-relaxed">{post.excerpt}</p>
        {/* {post.author && (
          <Avatar name={post.author.name} picture={post.author.picture} />
        )} */}
      </div>
    </div>
  );
};

export default BlogNavbarDropdownPost;
