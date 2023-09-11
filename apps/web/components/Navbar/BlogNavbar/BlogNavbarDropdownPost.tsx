import { CoverImage, Avatar } from 'blog';
import Link from 'next/link';
import React from 'react';

interface Props {
  post: any;
}

const BlogNavbarDropdownPost: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex h-full w-full flex-col divide-y-1.5 divide-secondary-dark-10">
      <div className="w-full cursor-pointer">
        <CoverImage
          framed
          slug={post.slug}
          title={post.title}
          image={post.coverImage}
        />
      </div>
      <div className="flex h-[266px] w-full flex-grow flex-col justify-between bg-black p-7 text-white">
        <h4 className="cursor-pointer pb-3 text-[22px] font-bold hover:text-primary">
          <Link href={`/blog/${post.slug}`} prefetch={false}>
            {post.title}
          </Link>
        </h4>
        <p className="mb-4 ml-1 text-sm leading-relaxed">
          {post.excerpt.substring(0, 80)}
        </p>
        {post.author && (
          <Avatar name={post.author.name} picture={post.author.picture} />
        )}
      </div>
    </div>
  );
};

export default BlogNavbarDropdownPost;
