import cn from 'classnames';
import React from 'react';
import { FlatLabel } from '../ComparableProduct';
import { getLabelColor } from '../../../lib/labels';

interface Props {
  labels: FlatLabel[];
  spotlight: number;
  setSpotlight: (i) => void;
}

const ComparableProductLabels: React.FC<Props> = ({
  labels,
  spotlight,
  setSpotlight,
}) => {
  const handlePrevLabel = () => {
    if (spotlight !== 0) {
      setSpotlight(spotlight - 1);
    }
  };

  const handleNextLabel = () => {
    if (spotlight < labels.length - 1) {
      setSpotlight(spotlight + 1);
    }
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full justify-center divide-x-1.5 divide-secondary-dark-10 border-b-1.5 border-secondary-dark-10">
        <button
          className={cn(
            'flex aspect-video w-1/2 select-none items-center justify-center py-2',
            {
              'hover:bg-primary': spotlight !== 0,
              'bg-secondary': spotlight === 0,
            }
          )}
          disabled={spotlight === 0}
          onClick={handlePrevLabel}
        >
          <img
            draggable={false}
            src="/img/up-arrow.svg"
            alt="Left arrow"
            className={cn('w-1/4', {
              hidden: spotlight === 0,
            })}
          />
        </button>
        <button
          className={cn(
            'flex aspect-video w-1/2 select-none items-center justify-center py-2',
            {
              'hover:bg-primary': spotlight < labels.length - 1,
              'bg-secondary': spotlight === labels.length - 1,
            }
          )}
          onClick={handleNextLabel}
          disabled={spotlight === labels.length - 1}
        >
          <img
            draggable={false}
            src="/img/down-arrow.svg"
            alt="Right arrow"
            className={cn('w-1/4', {
              hidden: spotlight === labels.length - 1,
            })}
          />
        </button>
      </div>
      <div className="flex flex-col space-y-1.5 py-6">
        {labels.map((sl, i) => (
          <div
            className={cn(
              'group ml-10 flex items-center gap-x-2 whitespace-pre-wrap rounded-sm transition-all duration-300',
              {
                'cursor-pointer': spotlight !== i,
              }
            )}
            onClick={() => setSpotlight(i)}
          >
            <div
              className={cn(
                `h-4 w-4 rounded-full bg-primary transition-all duration-300 bg-${getLabelColor(
                  sl.type
                )}`
              )}
            />
            <span
              className={cn(
                'text-[13px] font-bold text-zinc-800 transition-all duration-300',
                {
                  'pl-1.5 text-[16px] font-bold underline underline-offset-[3px]':
                    spotlight === i,
                  'group-hover:pl-0.5 group-hover:underline group-hover:underline-offset-[3px]':
                    spotlight !== i,
                }
              )}
            >
              {sl.name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparableProductLabels;
