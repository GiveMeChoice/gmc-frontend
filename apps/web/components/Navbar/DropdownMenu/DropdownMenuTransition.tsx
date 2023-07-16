import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { DropdownMenuName } from '../DropdownMenu';

interface Props {
  menuName: DropdownMenuName;
  activeMenu: DropdownMenuName;
  calcHeight: (el) => void;
}

const DropdownMenuTransition: React.FC<Props> = ({
  menuName: screenName,
  activeMenu,
  calcHeight,
  children,
}) => {
  return (
    <CSSTransition
      in={activeMenu === screenName}
      timeout={500}
      classNames={
        screenName == DropdownMenuName.MAIN ? 'menu-primary' : 'menu-secondary'
      }
      unmountOnExit
      onEnter={calcHeight}
    >
      <div className="flex w-full flex-col">{children}</div>
    </CSSTransition>
  );
};

export default DropdownMenuTransition;
