import React, { ReactFragment } from 'react';

interface Props {
  goToMenu?: string;
  setActiveMenu?: (string) => void;
  leftIcon?: ReactFragment;
  rightIcon?: ReactFragment;
}

const DropdownItem: React.FC<Props> = ({
  goToMenu,
  setActiveMenu,
  leftIcon,
  rightIcon,
  children,
}) => {
  return (
    <a
      href="#"
      className="menu-item"
      onClick={() => goToMenu && setActiveMenu(goToMenu)}
    >
      <span className="icon-button">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </a>
  );
};

export default DropdownItem;
