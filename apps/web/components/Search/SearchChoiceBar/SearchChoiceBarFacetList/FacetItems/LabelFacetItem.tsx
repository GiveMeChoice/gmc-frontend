import cn from 'classnames';
import React from 'react';
import { getLabelColor } from '../../../../../lib/labels';

interface Props {
  value: string;
  category?: string;
  selected: boolean;
  count?: number;
  onClick: () => void;
}

const LabelFacetItem: React.FC<Props> = ({
  value,
  category,
  selected,
  count,
  onClick,
}) => {
  const handleFacetClick = () => {
    if (count) {
      onClick();
    }
  };

  return (
    <div
      className={cn('group flex cursor-pointer items-center gap-x-1.5 pt-1', {
        'pointer-events-none': !count,
        'pl-1': count,
      })}
      onClick={handleFacetClick}
    >
      {count && (
        <div
          className={cn(
            `flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-zinc-900 pb-1 text-base text-black bg-${getLabelColor(
              category ? category : value
            )}`,
            {
              'bg-opacity-0 group-hover:bg-opacity-40 group-active:bg-opacity-100':
                !selected,
              'bg-opacity-100 group-hover:bg-opacity-10 group-active:bg-opacity-0':
                selected,
            }
          )}
        >
          <span
            className={cn('hidden', {
              'group-hover:flex': selected,
            })}
          >
            &times;
          </span>
        </div>
      )}
      <span
        className={cn(
          'underline-offset-2 group-hover:underline group-active:text-primary-dark-10',
          {}
        )}
      >
        {value}
        {count && (
          <span className="text-sm">
            &nbsp;(<span className="px-0.5">{`${count}`}</span>)
          </span>
        )}
      </span>
    </div>
  );
};

export default LabelFacetItem;
