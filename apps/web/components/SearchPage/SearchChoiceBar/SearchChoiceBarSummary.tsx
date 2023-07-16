import React from 'react';
import { LoadingSpinner } from 'ui';
import cn from 'classnames';

interface Props {
  loading: boolean;
  hits: number;
  sort: string;
  compareModeOn: boolean;
  onCompareModeChange: (on: boolean) => void;
  onSortChange: (sort: string) => void;
}

const SearchChoiceBarSummary: React.FC<Props> = ({
  loading,
  hits,
  sort,
  compareModeOn,
  onCompareModeChange,
  onSortChange,
}) => {
  return (
    <div
      className="flex max-h-fit flex-col gap-y-1 p-4"
      id="choice-bar-summary"
    >
      <div className="flex h-20 w-full justify-between">
        {loading ? (
          <div className="flex w-full justify-between pr-4">
            <span className="text-3xl">Searching...</span>
            <LoadingSpinner style="h-10 fill-primary text-black" />
          </div>
        ) : (
          <>
            {hits ? (
              <div className="flex flex-col gap-2">
                <span className="text-3xl">{`Top ${
                  hits >= 10 ? 10 : hits
                } Choices`}</span>
                <div
                  className={cn('flex items-baseline gap-2 pl-1', {
                    hidden: compareModeOn,
                  })}
                >
                  <span className="text-sm">Choices Available:</span>
                  <span>{hits}</span>
                </div>
              </div>
            ) : (
              <span className="text-2xl">No Choices Available</span>
            )}
          </>
        )}
        <button
          className={cn(
            'flex h-10 min-w-fit items-center justify-center gap-x-2 rounded-sm border-1.5 border-black py-1.5 px-2.5 text-black hover:bg-primary active:bg-primary-dark-10',
            {
              hidden: !compareModeOn,
            }
          )}
          onClick={() => onCompareModeChange(!compareModeOn)}
        >
          <img
            draggable={false}
            src="/img/left-arrow.svg"
            alt="Left arrow"
            className={cn('h-7 max-h-full w-auto')}
          />
          <span>Results</span>
        </button>
      </div>
      {/* <div className="flex w-full justify-end py-4">
                <button
                  className={cn(
                    'flex h-10 w-full items-center justify-center gap-x-3 rounded-sm border-1.5 border-black bg-white py-2 text-black hover:bg-primary active:bg-primary-dark-10',
                    {
                      hidden: compareModeOn,
                    }
                  )}
                  onClick={() => onCompareModeChange(!compareModeOn)}
                >
                  <span>Compare Top Choices</span>
                  <img
                    draggable={false}
                    src="/img/right-arrow.svg"
                    alt="Right arrow"
                    className={cn('h-7 max-h-full w-auto')}
                  />
                </button>
              </div> */}
      <div className="flex flex-col py-1.5">
        <div className="w-full pb-1 text-center text-sm">Prioritize By</div>
        <div className="flex h-10 w-full border-1.5 border-black">
          <button
            className={cn('w-1/2 text-center', {
              'bg-zinc-900 text-white': !sort,
              'text-black hover:bg-primary active:bg-primary-dark-10': sort,
            })}
            onClick={() => {
              onSortChange(null);
            }}
            disabled={!sort}
          >
            Best Match
          </button>
          <button
            className={cn('w-1/2 text-center', {
              'bg-zinc-900 text-white': sort === 'price',
              'text-black hover:bg-primary active:bg-primary-dark-10':
                sort !== 'price',
            })}
            onClick={() => {
              onSortChange('price');
            }}
            disabled={sort === 'price'}
          >
            Lowest Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchChoiceBarSummary;
