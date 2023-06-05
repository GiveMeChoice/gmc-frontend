import React from 'react';
import cn from 'classnames';

interface Props {
  status: string;
  retryCount: number;
}

const ChannelStatusChip: React.FC<Props> = ({ status, retryCount }) => {
  return (
    <div
      className={cn(
        'flex w-28 items-center justify-center rounded-full border border-zinc-600 py-1 italic',
        {
          'bg-gmc-surf-light-50': status === 'READY',
          'bg-gmc-beach': status === 'BUSY',
          'bg-gmc-heart-light-10': status === 'DOWN',
        }
      )}
      title="Channel Status + Retry Count"
    >
      <span className="text-sm">{status}</span>
      {retryCount > 0 && (
        <span className="pl-1 text-xs italic">({retryCount})</span>
      )}
    </div>
  );
};

export default ChannelStatusChip;
