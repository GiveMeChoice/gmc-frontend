import React from 'react';
import { BlogCategory } from '../../types';

interface Props {
  category: BlogCategory;
}

const CategoryPageIntro: React.FC<Props> = ({ category }) => {
  return (
    <div className="mb-4 mt-14 flex w-full max-w-[1100px] flex-col items-center px-10 pt-8 pb-[18px] xl:px-0">
      <div
        style={{ backgroundColor: category.color }}
        className={`text- boder w-fit min-w-[60px] border-zinc-900 bg-zinc-900 py-[12px] px-[27px] text-center text-[18px] text-zinc-900`}
      >
        {category.title.toUpperCase()}
      </div>
      <span className="mb-2 w-3/5 px-6 pt-6 pb-5 text-center text-[19px] text-gray-600">
        {category.description}
      </span>
      <hr
        style={{
          backgroundColor: category.color,
          borderColor: category.color,
        }}
        className="h-[5px] w-full border-zinc-800 bg-zinc-800"
      />
    </div>
  );
};

export default CategoryPageIntro;
