import React from 'react';

interface Props {
  description: string;
}

const CompareProductDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className="max-h- flex w-full flex-col gap-y-2 space-y-2 overflow-auto p-6 px-8 text-[14px]">
      <div className="w-full font-bold">Product Description</div>
      {description.replace(/\uFFFD/g, '')}
    </div>
  );
};

export default CompareProductDescription;
