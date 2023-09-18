import { SearchFunctionResponseDto } from 'gmc-types';
import { useRouter } from 'next/router';
import React from 'react';
import { LoadingSpinner } from 'ui';
import ChoiceBarSummarySortSwitch from './SearchChoiceBarSummary/ChoiceBarSummarySortSwitch';

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
    <div className="flex min-h-[200px] w-full flex-col  border-secondary-dark-10 bg-white px-8 pt-6">
      {loading ? (
        // <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
        //   <LoadingSpinner style="h-14 fill-primary text-black" />
        //   <span className="text-2xl">Searching...</span>
        // </div>
        <span className="pl-1.5 pb-8 text-4xl">Searching...</span>
      ) : (
        <>
          {searchResponse.hits ? (
            <div className="flex h-full w-full flex-col gap-y-4">
              <span className="pl-1.5 pb-8 text-4xl">
                {searchResponse.hits} Results
              </span>
              {/* <ChoiceBarSummaryBackButton compareModeOn={compareModeOn} removeCompareMode={removeCompareMode} /> */}
              {/* <div className="">
                <ChoiceBarSummaryViewSwitch
                  compareModeOn={compareModeOn}
                  toggleCompareMode={removeCompareMode}
                />
              </div> */}
              <div className="">
                <div className="m-1">
                  {/* <span className="text-sm">Sort By:</span> */}
                </div>
                <ChoiceBarSummarySortSwitch
                  searchResponse={searchResponse}
                  onSortChange={onSortChange}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center">
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
