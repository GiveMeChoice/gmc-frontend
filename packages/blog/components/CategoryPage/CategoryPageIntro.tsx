import React from 'react';
import { BlogCategory } from '../../types';

interface Props {
  category: BlogCategory;
}

const CategoryPageIntro: React.FC<Props> = ({ category }) => {
  return (
    <div className="my-5 flex w-3/4 max-w-[1300px] flex-col items-center px-10 pt-8 pb-[18px] xl:px-0">
      <div
        style={{ backgroundColor: category.color }}
        className={`mb-[12px] w-fit min-w-[60px] py-[9px] px-[14px] text-center text-[18px] text-zinc-900`}
      >
        {category.title.toUpperCase()}
      </div>
      <span className="mb-3 w-3/4 py-3 px-6 text-center text-[22px] text-gray-600">
        {category.description}
      </span>
      <hr className="border-accent-2 mb-2 h-[2.5px] w-full border-black bg-black" />
    </div>
  );
};

export default CategoryPageIntro;
