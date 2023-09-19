import React from 'react';
import { LoadingSpinner } from 'ui';
import { useBlogNav } from '../../BlogNavProvider';
import BlogNavbarDropdownPost from './BlogNavbarDropdownPost';
import { BlogPost } from 'blog';

interface Props {
  posts: BlogPost[];
  onNavigate: () => void;
}

const BlogNavbarDropdown: React.FC<Props> = ({ posts, onNavigate }) => {
  const blogNav = useBlogNav();
  return (
    <div className="pointer-events-auto flex h-full min-h-[320px] w-full divide-x-1.5 divide-zinc-700 border-y-1.5 border-zinc-700 bg-white">
      {!blogNav || blogNav.loading ? (
        <div className="flex h-full min-h-[320px] w-full items-center justify-center bg-secondary">
          <LoadingSpinner style="h-16 fill-primary text-black" />
        </div>
      ) : (
        <>
          <div className="h-full w-1/4 text-black">
            <BlogNavbarDropdownPost onNavigate={onNavigate} post={posts[0]} />
          </div>
          <div className="h-full w-1/4 text-black">
            <BlogNavbarDropdownPost
              onNavigate={onNavigate}
              post={posts.length > 1 ? posts[1] : posts[0]}
            />
          </div>
          <div className="h-full w-1/4 text-black">
            <BlogNavbarDropdownPost
              onNavigate={onNavigate}
              post={posts.length > 2 ? posts[2] : posts[0]}
            />
          </div>
          <div className="h-full w-1/4 text-black">
            <BlogNavbarDropdownPost
              onNavigate={onNavigate}
              post={posts.length > 3 ? posts[3] : posts[0]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BlogNavbarDropdown;
