import React from 'react';
import cn from 'classnames';

interface Props {
  index: number;
  title: string;
  blur?: boolean;
}

const ListProductHeading: React.FC<Props> = ({ index, title, blur }) => {
  return (
    <div
      className={cn('flex cursor-pointer divide-x-1.5 divide-zinc-700', {
        'pointer-events-none': blur,
      })}
    >
      <div
        className={cn(
          `flex aspect-square h-[76px] items-center justify-center bg-secondary
        text-[27px] duration-100`,
          {
            'group-hover:bg-primary': !blur,
          }
        )}
      >
        {index + 1}
      </div>
      <p className="flex max-w-full flex-grow items-center justify-center overflow-ellipsis px-6 text-[18px]">
        {title.replace(/\uFFFD/g, '')}
      </p>
    </div>
  );
};

export default ListProductHeading;
