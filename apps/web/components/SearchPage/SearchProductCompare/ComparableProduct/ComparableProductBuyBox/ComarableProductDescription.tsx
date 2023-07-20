import React from 'react';

interface Props {
  description: string;
}

const ComparableProductDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className="flex h-full w-full flex-col space-y-2 p-6">
      {/* <div className="w-full text-center text-sm  underline">
        Product Description
      </div> */}
      <div className="max-h flex flex-col p-3 py-1 text-sm">{description}</div>
    </div>
  );
};

export default ComparableProductDescription;
