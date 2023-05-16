import React from 'react';
import cn from 'classnames';
import { useUser } from '../../UserProvider';
import { getUserTheme } from '../../../lib/theme';

interface Props {
  index: number;
  value: string;
  onClick: (index: number) => void;
}

const SearchChoiceBarLabelChip: React.FC<Props> = ({
  index,
  value,
  onClick,
}) => {
  const { profile } = useUser();
  return (
    <div key={index}>
      <div
        onClick={() => onClick(index)}
        className="peer cursor-pointer rounded-full border border-zinc-900 bg-primary bg-opacity-70 px-2.5 py-1"
      >
        {value}
      </div>
      <div
        onClick={() => onClick(index)}
        className="relative bottom-9 right-1.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-zinc-900 bg-secondary pb-0.5  text-center text-xs text-zinc-900 opacity-0 hover:opacity-100 active:bg-secondary-dark-10  peer-hover:opacity-100 peer-active:bg-secondary-dark-10"
      >
        x
      </div>
    </div>
  );
};

export default SearchChoiceBarLabelChip;
