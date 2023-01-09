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
      <div className="border mb-4 flex cursor-pointer flex-col items-center  rounded-md border-secondary-dark-10 p-4 shadow-sm">
        <div
          style={{
            backgroundColor: color,
          }}
          className="border mx-5 flex h-12 w-32 items-center justify-center rounded-full border-zinc-400 text-lg shadow-sm"
        >
          {title}
        </div>
        <div>
          <h3 className="cursor-pointer pt-2 text-lg hover:underline">
            {description}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default Category;
