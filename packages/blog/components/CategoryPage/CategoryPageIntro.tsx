import React from 'react';
import { BlogCategory } from '../../types';

interface Props {
  category: BlogCategory;
}

const CategoryPageIntro: React.FC<Props> = ({ category }) => {
  return (
    <div style={{ backgroundColor: category.color }} className="w-full">
      <div className="bg-opacity- flex flex-col items-center bg-white px-10 pt-10 pb-8 xl:px-0">
        <div
          style={{ backgroundColor: category.color }}
          className={`w-fit min-w-[60px] border-1.5 border-b-2 border-l-2.5 border-black bg-white py-[10px] px-[26px] text-center text-[20px] font-bold leading-[1.5] tracking-wider text-black`}
        >
          {category.title.toUpperCase()}
        </div>

        <span className="w-3/5 max-w-[600px] px-6 pt-5 pb-5 text-center text-[17px] font-bold text-black">
          {category.description}
        </span>
        <hr
          style={{
            backgroundColor: category.color,
            borderColor: category.color,
          }}
          className="h-[4px] w-full max-w-[800px] border-zinc-900 bg-zinc-900"
        />
      </div>
    </div>
  );
};

export default CategoryPageIntro;
