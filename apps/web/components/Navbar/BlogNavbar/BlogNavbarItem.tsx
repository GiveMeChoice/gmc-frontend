import { BlogCategory, BlogPost } from 'blog';
import cn from 'classnames';
import Link from 'next/link';
import React from 'react';
import BlogNavbarDropdown from './BlogNavbarDropdown';

interface Props {
  title: string;
  color: string;
  path?: string;
  posts: BlogPost[];
  navigating: boolean;
  onNavigate: () => void;
}

const BlogNavbarItem: React.FC<Props> = ({
  title,
  color,
  path,
  posts,
  navigating,
  onNavigate,
}) => {
  return (
    <div
      className={cn(
        `group float-left flex w-[110px] flex-col overflow-hidden transition-width duration-300 hover:bg-${color} hover:text-${
          color == 'black' ? 'white' : 'black'
        }`,
        {}
      )}
    >
      <Link className="h-full w-full" href={`/blog${path ? path : ''}`}>
        <div
          className="flex h-full w-full cursor-pointer items-center justify-center space-x-2 text-[13px] tracking-wide active:text-zinc-500"
          onClick={onNavigate}
        >
          <span>{title.toUpperCase()}</span>
        </div>
      </Link>
      <div
        className={cn(
          'pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[500px] w-screen translate-y-[47px]',
          {
            'group-hover:block': !navigating,
          }
        )}
      >
        <BlogNavbarDropdown onNavigate={onNavigate} posts={posts} />
      </div>
    </div>
  );
};

export default BlogNavbarItem;
