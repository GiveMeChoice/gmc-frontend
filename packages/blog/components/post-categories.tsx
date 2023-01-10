import React from 'react';
import cn from 'classnames';

interface Props {
  categories: any;
}

const PostCategories: React.FC<Props> = ({ categories }) => (
  <div className="flex flex-wrap space-x-1 space-y-1 text-sm">
    {categories &&
      categories.map((category: any, i: number) => (
        <a
          key={i}
          href={`/blog/tags/${category.slug}`}
          title={category.description || category.title}
          style={{
            backgroundColor: category.color.value,
          }}
          className={cn(
            'shadow-s h-7 rounded-2xl border border-secondary-dark-30 border-opacity-50 px-2.5 pt-0.5 pb-1 hover:opacity-90',
            {
              'my-1': (i = 1),
            }
          )}
        >
          {category.title}
        </a>
      ))}
  </div>
);

export default PostCategories;
