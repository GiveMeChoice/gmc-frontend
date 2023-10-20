import React from 'react';
import cn from 'classnames';

interface Props {
  indexed: boolean;
}

const ProductIndexedChip: React.FC<Props> = ({ indexed }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center whitespace-nowrap rounded-full border border-zinc-600 px-3 py-2 italic',
        {
          'w-24 bg-primary': indexed,
          'w-32 bg-gmc-beach': !indexed,
        }
      )}
      title="Product Available on www.givemechoice.com?"
    >
      <span className="text-xs font-bold">
        {indexed ? 'LIVE' : 'NOT AVAILABLE'}
      </span>
    </div>
  );
};

export default ProductIndexedChip;
