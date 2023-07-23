import React from 'react';
import { useUser } from '../../../UserProvider';
import cn from 'classnames';
import { SearchFunctionNestedFilterDto } from 'gmc-types';

interface Props {
  index: number;
  label: SearchFunctionNestedFilterDto;
  onClick: (index: number) => void;
}

const SearchChoiceBarLabelChip: React.FC<Props> = ({
  index,
  label,
  onClick,
}) => {
  const { profile } = useUser();
  return (
    <div key={index} className="group flex items-center justify-center">
      <div
        onClick={() => onClick(index)}
        className="relative bottom-3 left-2 flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border border-zinc-900 bg-secondary pb-0.5  text-center text-xs text-zinc-900 opacity-0 hover:opacity-100 active:bg-secondary-dark-10  group-hover:opacity-100 group-active:bg-secondary-dark-10"
      >
        &times;
      </div>

      <div
        className={cn(
          'flex items-center gap-x-1.5 rounded-full border-1.5 border-secondary-dark-10 bg-white py-1 px-2',
          {
            // 'bg-primary': label.value === 'Certifications',
            // 'bg-gmc-beach-light-10': label.value === 'Origin',
            // 'bg-gmc-soil-light-50': label.value === 'Uncategorized',
          }
        )}
      >
        <div
          className={cn('h-3 w-3 rounded-full', {
            'bg-primary': label.value === 'Certifications',
            'bg-gmc-beach-light-10': label.value === 'Origin',
            'bg-gmc-soil-light-50': label.value === 'Uncategorized',
          })}
        />
        {label.value.toUpperCase()}
      </div>

      {/* <div
        className={cn('flex rounded-sm border-1.5 border-black py-1 px-4', {
          'bg-primary': label.value === 'Certifications',
          'bg-gmc-beach-light-10': label.value === 'Origin',
          'bg-gmc-soil-light-50': label.value === 'Uncategorized',
        })}
      >
        {label.value.toUpperCase()}
      </div> */}

      {/* <div
        key={index}
        onClick={() => onClick(index)}
        className={cn(
          'cursor-pointer rounded-full border border-black px-2.5 py-1 shadow-sm',
          {
            'bg-primary': label.value === 'Certifications',
            'bg-gmc-beach-light-10': label.value === 'Origin',
            'bg-gmc-soil-light-50': label.value === 'Uncategorized',
          }
        )}
      >
        {label.subfilter
          ? label.subfilter.subfilter
            ? label.subfilter.subfilter.value
            : label.subfilter.value
          : label.value}
      </div> */}
    </div>
  );
};

export default SearchChoiceBarLabelChip;
