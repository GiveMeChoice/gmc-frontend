import React from 'react';
import { BlogCategory } from '../../types';

interface Props {
  category: BlogCategory;
}

const CategoryPageIntro: React.FC<Props> = ({ category }) => {
  return (
    <div className="my-12 flex w-full max-w-[1300px] flex-col">
      <div
        style={{ backgroundColor: category.color }}
        className={`ml-1.5 mb-2 w-fit min-w-[80px] border-black py-2 px-[16px] text-center text-xl text-zinc-900`}
      >
        {category.title.toUpperCase()}
      </div>
      <hr className="border-accent-2 mt-1 h-0.5 w-full border-black bg-black" />
      <span className="mt-2.5 ml-1.5 text-lg">{category.description}</span>
    </div>
  );
};

export default CategoryPageIntro;
