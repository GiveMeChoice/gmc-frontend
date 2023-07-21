import cn from 'classnames';
import { SearchFunctionResponseDto } from 'gmc-types';
import React from 'react';
import { LoadingSpinner } from 'ui';

interface Props {
  loading: boolean;
  searchResponse: SearchFunctionResponseDto;
  compareModeOn: boolean;
  onCompareModeChange: (on: boolean) => void;
  onSortChange: (sort: string) => void;
}

const SearchChoiceBarSummary: React.FC<Props> = ({
  loading,
  searchResponse,
  compareModeOn,
  onCompareModeChange,
  onSortChange,
}) => {
  return (
    <div className="flex max-h-fit flex-col gap-y-7 bg-secondary p-7">
      <div className="flex h-20 w-full justify-between">
        {loading ? (
          <div className="flex w-full justify-between pr-4">
            <span className="text-3xl">Searching...</span>
            <LoadingSpinner style="h-10 fill-primary text-black" />
          </div>
        ) : (
          <>
            {searchResponse.hits ? (
              <div className="flex flex-col gap-y-4">
                <span className="text-2xl">{`Top ${
                  searchResponse.hits >= 10 ? 10 : searchResponse.hits
                } Choices`}</span>
                <div className={cn('flex items-baseline gap-2 pl-1', {})}>
                  <span className="text-sm">Total Choices Available:</span>
                  <span>{searchResponse.hits}</span>
                </div>
              </div>
            ) : (
              <span className="text-2xl">No Choices Available</span>
            )}
          </>
        )}
        <button
          className={cn(
            'flex h-9 min-w-fit items-center justify-center gap-x-2 rounded-sm border border-black px-2 pr-2.5 text-sm text-black hover:bg-primary active:bg-primary-dark-10',
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
            className={cn('h-5 max-h-full w-auto')}
          />
          <span>View All</span>
        </button>
      </div>
      {/* <span className="bold w-full px-2 pt-2 pb-6 text-xl italic">{`" ${searchResponse.query.toUpperCase()} "`}</span> */}
      {searchResponse.hits ? (
        <div className="flex h-9 w-full border-1.5 border-black text-sm">
          <button
            className={cn('w-1/2 text-center', {
              'bg-zinc-900 text-white': !searchResponse.sort,
              'text-black hover:bg-primary-light-30 active:bg-primary-light-10':
                searchResponse.sort,
            })}
            onClick={() => {
              onSortChange(null);
            }}
            disabled={!searchResponse.sort}
          >
            BEST MATCH
          </button>
          <button
            className={cn('w-1/2 text-center', {
              'bg-zinc-900 text-white': searchResponse.sort === 'price',
              'text-black hover:bg-primary-light-30 active:bg-primary-light-10':
                searchResponse.sort !== 'price',
            })}
            onClick={() => {
              onSortChange('price');
            }}
            disabled={searchResponse.sort === 'price'}
          >
            LOWEST PRICE
          </button>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default SearchChoiceBarSummary;
