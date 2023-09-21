import React from 'react';
import { BlogCategory } from '../../types';

interface Props {
  category: BlogCategory;
}

const CategoryPageIntro: React.FC<Props> = ({ category }) => {
  return (
    <div className="mb-4 mt-6 flex w-full max-w-[1100px] flex-col items-center px-10 pt-5 pb-[18px] xl:px-0">
      <div
        style={{ backgroundColor: category.color }}
        className={`text- w-fit min-w-[60px] border-1.5 border-zinc-800 bg-zinc-900 py-[10px] px-[28px] text-center text-[18px] font-bold text-zinc-900`}
      >
        {category.title.toUpperCase()}
      </div>
      <span className="w-3/5 px-6 pt-6 pb-5 text-center text-[20px] font-bold text-gray-600">
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
