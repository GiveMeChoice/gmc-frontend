import React from 'react';

interface Props {
  title: string;
}

const ProductPageTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="w-full p-4 text-center md:px-8 md:py-7">
      <span className="text-[20px] font-normal leading-[1.3] md:text-[26px]">
        {title}
      </span>
    </div>
  );
};

export default ProductPageTitle;
