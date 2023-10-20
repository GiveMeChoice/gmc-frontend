import React from 'react';

interface Props {
  title: string;
}

const BlogNavbarPostTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex h-full flex-grow items-center justify-center">
      <span className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap text-center text-[15px] font-normal">
        {title}
      </span>
    </div>
  );
};

export default BlogNavbarPostTitle;
