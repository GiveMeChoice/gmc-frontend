import React, { ReactFragment } from 'react';
import cn from 'classnames';

interface Props {
  handleClick: () => void;
  leftIcon?: ReactFragment;
  rightIcon?: ReactFragment;
  centered?: boolean;
}

const DropdownItemButton: React.FC<Props> = ({
  handleClick,
  leftIcon,
  rightIcon,
  centered,
  children,
}) => {
  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex h-14 w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 text-sm transition-colors duration-150 ease-in-out hover:bg-zinc-700 hover:bg-opacity-10 active:bg-zinc-600 active:bg-opacity-20"
    >
      <div className="flex items-center gap-3">
        <span
          className={cn('flex items-center justify-center rounded-full', {
            'h-9 w-9 bg-zinc-700 bg-opacity-20': leftIcon && !centered,
            'h-6 w-6 opacity-80': leftIcon && centered,
          })}
        >
          {leftIcon}
        </span>
        {!centered && children}
      </div>
      {centered && children}
      <span
        className={cn(
          'flex items-center justify-center rounded-full opacity-90',
          {
            'h-9 w-9 bg-zinc-700 bg-opacity-20': rightIcon && centered,
            'h-6 w-6': rightIcon && !centered,
          }
        )}
      >
        {rightIcon}
      </span>
    </a>
  );
};

export default DropdownItemButton;
