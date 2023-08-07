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
    <div className="flex w-full flex-col border-b-1.5 border-secondary-dark-10 bg-white p-7">
      {loading ? (
        <div className="flex h-[160px] w-full flex-col items-center justify-center">
          <LoadingSpinner style="h-10 fill-primary text-black" />
          <span className="p-3">Finding Products...</span>
        </div>
      ) : (
        <>
          {searchResponse.hits ? (
            <div className="flex h-full w-full flex-col space-y-8">
              <div className="flex h-2/3 w-full items-start justify-between">
                <div className="flex flex-col gap-y-6">
                  <span className="text-3xl">{`Top ${
                    searchResponse.hits >= 10 ? 10 : searchResponse.hits
                  } Choices`}</span>
                  <div className={cn('flex items-baseline gap-2 pl-1', {})}>
                    <span className="text-[16px]">Choices Available:</span>
                    <span className="text-[17px]">{searchResponse.hits}</span>
                  </div>
                </div>
                <button
                  className={cn(
                    'mt-1 flex h-9 min-w-fit items-center justify-center gap-x-2 rounded-sm border border-black px-2 pr-2.5 text-xs text-black hover:bg-primary active:bg-primary-dark-10',
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
                    className={cn('h-4 max-h-full w-auto')}
                  />
                  <span>BACK</span>
                </button>
              </div>

              <div className="flex h-11 w-full border-1.5 border-black text-sm">
                <button
                  className={cn('w-1/2 text-center', {
                    'bg-zinc-900 text-white': !searchResponse.sort,
                    'text-black hover:bg-primary active:bg-primary-light-10':
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
                    'text-black hover:bg-primary active:bg-primary-light-10':
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
            </div>
          ) : (
            <div className="flex h-[160px] items-center justify-center">
              <span className="text-2xl">No Choices Available</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchChoiceBarSummary;
