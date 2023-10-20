import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

interface Props {
  suggestions: string[];
  activeIndex: number;
  onClick: (index: number) => void;
  onHover: (index: number) => void;
}

const SearchSuggestions: React.FC<Props> = ({
  suggestions,
  activeIndex,
  onClick,
  onHover,
}) => {
  return (
    <>
      {suggestions.map((text, i) => (
        <div
          className="flex w-full cursor-pointer items-center pl-[14px]"
          onMouseEnter={() => onHover(i)}
          onClick={() => onClick(i)}
        >
          {i < 3 ? (
            <Image
              draggable={false}
              src="/img/clock.svg"
              alt="Clock Icon"
              height={19}
              width={20}
            />
          ) : (
            <Image
              draggable={false}
              src="/img/search-dropdown.svg"
              alt="Search Icon"
              height={18}
              width={20}
            />
          )}
          <div
            className={cn(
              'z-30 flex h-[46px] w-full items-center overflow-hidden text-ellipsis whitespace-nowrap p-2 py-2.5 pl-[12px] text-[23px]',
              {
                'text-zinc-800 underline decoration-[2.5px] underline-offset-[6px]':
                  i === activeIndex,
              }
            )}
          >
            {text}
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchSuggestions;
