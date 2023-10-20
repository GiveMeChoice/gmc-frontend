import React from 'react';
import cn from 'classnames';

interface Props {
  compareModeOn: boolean;
  removeCompareMode: () => void;
}

const ChoiceBarSummaryBackButton: React.FC<Props> = ({
  compareModeOn,
  removeCompareMode,
}) => {
  return (
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
  );
};

export default ChoiceBarSummaryBackButton;
