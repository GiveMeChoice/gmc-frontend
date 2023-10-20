import { BlogCategory, BlogPost } from 'blog';
import cn from 'classnames';
import Link from 'next/link';
import React from 'react';
import BlogNavbarDropdown from './BlogNavbarDropdown';

interface Props {
  title: string;
  path?: string;
  posts: BlogPost[];
  navigating: boolean;
  onNavigate: () => void;
}

const BlogNavbarItem: React.FC<Props> = ({
  title,
  path,
  posts,
  navigating,
  onNavigate,
}) => {
  return (
    <>
      <Link className="h-full w-full" href={`/blog${path ? path : ''}`}>
        <div
          className={cn(
            'flex h-full w-full min-w-[110px] cursor-pointer items-center justify-center space-x-2 px-6 text-[13px] font-bold tracking-wider   active:text-zinc-600',
            {}
          )}
          onClick={onNavigate}
        >
          <span className="whitespace-nowrap">{title}</span>
        </div>
      </Link>
      <div
        className={cn(
          'pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[500px] w-screen translate-y-[45px]',
          {
            'group-hover:block': !navigating,
          }
        )}
      >
        <BlogNavbarDropdown onNavigate={onNavigate} posts={posts} />
      </div>
    </>
  );
};

export default BlogNavbarItem;
