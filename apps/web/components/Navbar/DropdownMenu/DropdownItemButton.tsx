import React, { ReactFragment } from 'react';
import cn from 'classnames';
import { getUserTheme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';

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
  const { profile } = useUser();
  return (
    <button
      onClick={handleClick}
      className="flex h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-4 text-sm transition-colors duration-150 ease-in-out hover:bg-secondary  active:bg-secondary-dark-10"
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            `flex items-center justify-center rounded-full bg-white`,
            {
              'h-9 w-9 border border-zinc-800': leftIcon && !centered,
              'h-6 w-6 bg-transparent opacity-80': leftIcon && centered,
            }
          )}
        >
          {leftIcon}
        </span>
        {!centered && children}
      </div>
      {centered && children}
      <span
        className={cn(
          `flex items-center justify-center rounded-full opacity-90 bg-${
            getUserTheme(profile).modal
          }`,
          {
            'h-9 w-9 border border-zinc-800': rightIcon && centered,
            'h-6 w-6 bg-transparent': rightIcon && !centered,
          }
        )}
      >
        {rightIcon}
      </span>
    </button>
  );
};

export default DropdownItemButton;
