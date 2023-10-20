import { ISearchFunctionResponse } from 'gmc-types';
import React from 'react';
import cn from 'classnames';

interface Props {
  searchResponse: ISearchFunctionResponse;
  onSortChange: (param: any) => void;
}

const ChoiceBarSummarySortSwitch: React.FC<Props> = ({
  searchResponse,
  onSortChange,
}) => {
  return (
    <div className="flex h-[39px] w-full border-1.5 border-black text-sm">
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
        TOP CHOICE
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
  );
};

export default ChoiceBarSummarySortSwitch;
