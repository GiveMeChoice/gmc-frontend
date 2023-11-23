import React from 'react';
import cn from 'classnames';

interface Props {
  title: string;
  color: string;
  distance: number;
}

const RainbowArm: React.FC<Props> = ({ title, color, distance }) => {
  return (
    <div className="group relative flex h-[80px] cursor-pointer items-end">
      <div
        className={cn(
          'absolute h-full w-full bg-white group-hover:bg-opacity-0',
          {
            'bg-opacity-[20%]': distance === 1,
            'bg-opacity-[32%]': distance === 2,
            'bg-opacity-[44%]': distance === 3,
            'bg-opacity-[56%]': distance === 4,
            'bg-opacity-[68%]': distance === 5,
            'bg-opacity-[80%]': distance === 6,
          }
        )}
      ></div>
      <div className="min-w-[256px]" />
      <div className="h-fit w-[500px] flex-grow border-b-[3px] border-black">
        <div
          style={{ color: color ? color : 'black' }}
          className={cn('p-2 leading-[1.05] transition-all duration-200', {
            'text-[44px] group-hover:scale-[1.05] group-hover:pl-4':
              distance === 1,
            'text-[41px] group-hover:scale-[1.06] group-hover:pl-[18px]':
              distance === 2,
            'text-[38px] group-hover:scale-[1.07] group-hover:pl-[20px]':
              distance === 3,
            'text-[35px] group-hover:scale-[1.08] group-hover:pl-[22px]':
              distance === 4,
            'text-[32px] group-hover:scale-[1.09] group-hover:pl-[24px]':
              distance === 5,
            'text-[29px] group-hover:scale-[1.1] group-hover:pl-[26px]':
              distance === 6,
          })}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default RainbowArm;
