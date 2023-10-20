import cn from 'classnames';
import React from 'react';

interface Props {
  compareModeOn;
  toggleCompareMode: () => void;
}

const ChoiceBarSummaryViewSwitch: React.FC<Props> = ({
  compareModeOn,
  toggleCompareMode,
}) => {
  return (
    <div className="flex h-[58px] w-full border-1.5 border-black text-[15px] leading-tight">
      <button
        className={cn('w-1/2 text-center', {
          'bg-zinc-900 text-white': !compareModeOn,
          'text-black hover:bg-primary active:bg-primary-light-10':
            compareModeOn,
        })}
        onClick={toggleCompareMode}
        disabled={!compareModeOn}
      >
        PRODUCT
        <br />
        LIST
      </button>
      <button
        className={cn('w-1/2 text-center', {
          'bg-zinc-900 text-white': compareModeOn,
          'text-black hover:bg-primary active:bg-primary-light-10':
            !compareModeOn,
        })}
        onClick={toggleCompareMode}
        disabled={compareModeOn}
      >
        COMPARE
        <br />
        MODE
      </button>
    </div>
  );
};

export default ChoiceBarSummaryViewSwitch;
