import React from 'react';

interface Props {
  index: number;
  title: string;
}

const ListProductHeading: React.FC<Props> = ({ index, title }) => {
  return (
    <div className={'flex divide-x-1.5 divide-secondary-dark-10'}>
      <div
        className={`flex aspect-square h-[76px] items-center justify-center bg-secondary
              text-[27px] duration-100 group-hover:bg-primary`}
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
