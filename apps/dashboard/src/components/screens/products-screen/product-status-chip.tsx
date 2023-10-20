import React from 'react';
import cn from 'classnames';

interface Props {
  status: string;
}

const ProductStatusChip: React.FC<Props> = ({ status }) => {
  return (
    <div
      className={cn(
        'min-w-28 flex w-28 items-center justify-center rounded-full border border-zinc-600 py-2 italic',
        {
          'bg-primary': status === 'LIVE',
          'bg-gmc-beach': status === 'PENDING',
          'bg-gmc-heart': status === 'EXPIRED',
        }
      )}
      title="Integration Status (is this product synced to merchant)"
    >
      <span className="text-xs font-bold">
        {status === 'LIVE' ? 'SYNCED' : status}
      </span>
    </div>
  );
};

export default ProductStatusChip;
