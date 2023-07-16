import React from 'react';
import cn from 'classnames';

interface Props {
  status: string;
}

const ProductStatusChip: React.FC<Props> = ({ status }) => {
  return (
    <div
      className={cn(
        'flex w-28 items-center justify-center rounded-full border border-zinc-600 py-1 italic',
        {
          'bg-primary': status === 'LIVE',
          'bg-gmc-beach': status === 'PENDING',
          'bg-gmc-heart': status === 'EXPIRED',
        }
      )}
      title="Channel Status + Retry Count"
    >
      <span className="text-sm">{status}</span>
    </div>
  );
};

export default ProductStatusChip;
