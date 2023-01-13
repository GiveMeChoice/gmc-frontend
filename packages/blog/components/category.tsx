import React from 'react';
import Link from 'next/link';

interface Props {
  title: string;
  slug: string;
  color: string;
  description: string;
}

const Category: React.FC<Props> = ({ title, slug, color, description }) => {
  return (
    <Link href={`/blog/tags/${slug}`}>
      <div className="flex flex-col items-center rounded-full px-5 hover:cursor-pointer [&>h3]:hover:underline [&>div]:hover:opacity-90">
        <div
          style={{
            backgroundColor: color,
          }}
          className="mx-5 flex h-12 w-32 items-center justify-center rounded-full border border-secondary-dark-50 border-opacity-60 text-lg font-bold text-zinc-900 shadow-sm"
        >
          {title}
        </div>
        <h3 className="cursor-pointer pt-2 text-center text-base font-bold text-zinc-800 md:pt-2.5">
          {description}
        </h3>
      </div>
    </Link>
  );
};

export default Category;
