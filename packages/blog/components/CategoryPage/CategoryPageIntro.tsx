import React from 'react';
import { BlogCategory } from '../../types';

interface Props {
  category: BlogCategory;
}

const CategoryPageIntro: React.FC<Props> = ({ category }) => {
  return (
    <div className="my-6 flex w-full max-w-[1300px] flex-col px-10 pt-8 pb-[0px] xl:px-0">
      <div
        style={{ backgroundColor: category.color }}
        className={`ml-0.5 mb-[7px] w-fit min-w-[60px] py-[9px] px-[14px] text-center text-[16px] text-zinc-900`}
      >
        {category.title.toUpperCase()}
      </div>
      <hr className="border-accent-2 mt-1 h-0.5 w-full border-black bg-black" />
      <span className="ml-0.5 mt-2 w-full text-[24px] text-gray-600">
        {category.description}
      </span>
    </div>
  );
};

export default CategoryPageIntro;
