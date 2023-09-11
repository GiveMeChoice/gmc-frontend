import React from 'react';
import { LoadingSpinner } from 'ui';
import { useBlogNav } from '../../BlogNavProvider';
import BlogNavbarDropdownPost from './BlogNavbarDropdownPost';

interface Props {
  posts: any[];
  onNavigate: () => void;
}

const BlogNavbarDropdown: React.FC<Props> = ({ posts, onNavigate }) => {
  const blogNav = useBlogNav();
  return (
    <div className="pointer-events-auto flex h-full min-h-[100px] w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
      {!blogNav || blogNav.loading ? (
        <LoadingSpinner style="h-10 fill-primary" />
      ) : (
        <>
          <div className="h-full w-1/4 text-black">
            <BlogNavbarDropdownPost onNavigate={onNavigate} post={posts[0]} />
          </div>
          <div className="h-full w-1/4 text-black">
            <BlogNavbarDropdownPost onNavigate={onNavigate} post={posts[1]} />
          </div>
          <div className="h-full w-1/4 text-black">
            <BlogNavbarDropdownPost onNavigate={onNavigate} post={posts[2]} />
          </div>
          <div className="h-full w-1/4 text-black">
            <BlogNavbarDropdownPost
              onNavigate={onNavigate}
              post={posts[3] ? posts[3] : posts[2]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BlogNavbarDropdown;
