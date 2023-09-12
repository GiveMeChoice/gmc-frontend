import { CoverImage, Avatar } from 'blog';
import Link from 'next/link';
import React from 'react';

interface Props {
  post: any;
  onNavigate: () => void;
}

const BlogNavbarDropdownPost: React.FC<Props> = ({ post, onNavigate }) => {
  return (
    <div className="flex h-full w-full flex-col divide-y-1.5 divide-secondary-dark-10">
      <div className="w-full cursor-pointer">
        <CoverImage
          framed
          slug={post.slug}
          title={post.title}
          image={post.coverImage}
          onClick={onNavigate}
        />
      </div>
      <div className="flex h-[320px] w-full flex-grow flex-col justify-between bg-black p-7 text-white xl:h-[300px]">
        <h4 className="cursor-pointer pb-3 text-[22px] font-bold hover:text-primary">
          <Link href={`/blog/${post.slug}`}>
            <a href={`/blog/${post.slug}`} onClick={onNavigate}>
              {post.title}
            </a>
          </Link>
        </h4>
        <p className="mb-4 ml-1 text-sm leading-relaxed">{post.excerpt}</p>
        {post.author && (
          <Avatar name={post.author.name} picture={post.author.picture} />
        )}
      </div>
    </div>
  );
};

export default BlogNavbarDropdownPost;
