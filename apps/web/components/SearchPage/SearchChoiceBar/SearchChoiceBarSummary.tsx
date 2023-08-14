import cn from 'classnames';
import { SearchFunctionResponseDto } from 'gmc-types';
import { useRouter } from 'next/router';
import React from 'react';
import { LoadingSpinner } from 'ui';

interface Props {
  loading: boolean;
  searchResponse: SearchFunctionResponseDto;
  compareModeOn: boolean;
  removeCompareMode: () => void;
  onSortChange: (sort: string) => void;
}

const SearchChoiceBarSummary: React.FC<Props> = ({
  loading,
  searchResponse,
  compareModeOn,
  removeCompareMode,
  onSortChange,
}) => {
  const router = useRouter();
  return (
    <div className="flex min-h-[180px] w-full flex-col  border-secondary-dark-10 bg-white p-7">
      {loading ? (
        <div className="flex w-full flex-col items-center justify-center space-y-6">
          <span className="text-2xl">Searching...</span>
          <LoadingSpinner style="h-12 fill-primary text-black" />
        </div>
      ) : (
        <>
          {searchResponse.hits ? (
            <div className="flex h-full w-full flex-col space-y-8">
              <div className="flex h-2/3 w-full items-start justify-between">
                <div className="flex flex-col gap-y-8">
                  <span className="pl-1.5 text-4xl">
                    {searchResponse.hits} Results
                  </span>
                </div>
                <button
                  className={cn(
                    'mt-1 flex h-9 min-w-fit items-center justify-center gap-x-2 rounded-sm border border-black px-2.5 text-sm text-black hover:bg-primary active:bg-primary-dark-10',
                    {
                      hidden: !compareModeOn,
                    }
                  )}
                  onClick={() => removeCompareMode()}
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

              <div className="flex h-14 w-full border-1.5 border-black text-sm">
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
              {router.query.q && (
                <span className="text-2xl">No Choices Found</span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchChoiceBarSummary;
