import React from 'react';
import cn from 'classnames';

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
          className={cn('z-30 flex h-[46px] cursor-pointer items-center p-2', {
            'text-zinc-900 underline': i === activeIndex,
          })}
          onMouseEnter={() => onHover(i)}
          onClick={() => onClick(i)}
        >
          {text}
        </div>
      ))}
    </>
  );
};

export default SearchSuggestions;
