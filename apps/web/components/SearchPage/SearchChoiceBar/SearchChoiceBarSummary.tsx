import React from 'react';
import { LoadingSpinner } from 'ui';
import cn from 'classnames';

interface Props {
  loading: boolean;
  hits: number;
  compareModeOn: boolean;
  onCompareModeChange: (on: boolean) => void;
}

const SearchChoiceBarSummary: React.FC<Props> = ({
  loading,
  hits,
  compareModeOn,
  onCompareModeChange,
}) => {
  return (
    <div className="flex h-1/4 flex-col" id="choice-bar-summary">
      {loading ? (
        <div className="flex w-full justify-between pr-4">
          <span className="text-2xl">Searching...</span>
          <LoadingSpinner style="h-8 fill-primary text-black" />
        </div>
      ) : (
        <>
          {hits ? (
            <div className="flex flex-col gap-2">
              <span className="text-2xl">{`Top ${
                hits >= 10 ? 10 : hits
              } Choices`}</span>
              <span className="pl-1 text-sm">{`Total Results: ${hits}`}</span>
              <div className="flex w-full justify-center py-4">
                <button
                  className={cn(
                    'flex w-full items-center justify-center rounded-sm border-2 border-black py-1.5',
                    {
                      'bg-white text-black hover:bg-secondary active:bg-secondary-dark-20':
                        compareModeOn,
                      'bg-zinc-900 text-white hover:bg-zinc-800 active:text-primary':
                        !compareModeOn,
                    }
                  )}
                  onClick={() => onCompareModeChange(!compareModeOn)}
                >
                  {compareModeOn ? (
                    <>View All Choices&nbsp;&nbsp;</>
                  ) : (
                    <>Compare Top Choices&nbsp;&nbsp;</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <span className="text-2xl">No Choices Available</span>
          )}
        </>
      )}
    </div>
  );
};

export default SearchChoiceBarSummary;
