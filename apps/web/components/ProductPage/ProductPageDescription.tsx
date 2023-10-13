import React from 'react';

interface Props {
  description: string;
}

const ProductPageDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className="flex h-[420px] w-full flex-col gap-y-1 space-y-2 overflow-hidden overflow-ellipsis py-8 px-14 text-[15px] leading-[1.5]">
      <div className="w-full font-bold">Product Description</div>
      <p className="max-h-full overflow-ellipsis">
        {description.replace(/\uFFFD/g, '')}
      </p>
    </div>
  );
};

export default ProductPageDescription;
