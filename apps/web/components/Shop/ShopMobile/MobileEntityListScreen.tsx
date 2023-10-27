import cn from 'classnames';
import React from 'react';
import { useShop } from '../../Context/ShopProvider';
import ShopEntityList from '../ShopEntityList';
import { IEntityPageData } from '../../../lib/types';

interface Props {
  pageData: IEntityPageData;
  basePath: string;
  title: string;
  show: boolean;
  onClose: () => void;
}

const MobileEntityListScreen: React.FC<Props> = ({
  show,
  onClose,
  pageData,
  title,
  basePath,
}) => {
  const shop = useShop();
  return (
    <div
      className={cn('transition-transform duration-300', {
        'translate-y-full md:hidden': !show,
        'fixed top-0 left-0 z-40 flex h-screen w-screen overscroll-none bg-white':
          show,
      })}
    >
      <div
        className={cn({
          'static flex min-h-full w-full flex-col overflow-y-scroll overscroll-none bg-white':
            show,
          hidden: !show,
        })}
      >
        <div className="flex w-full justify-end px-5 pt-5">
          <button
            className={cn(
              'flex aspect-square h-8 w-8 flex-col items-center justify-center rounded-full border-1.5 border-black bg-secondary pt-0.5 hover:scale-[1.03] hover:bg-secondary',
              {}
            )}
            onClick={onClose}
          >
            <div className="w-6 -translate-x-[0px] rotate-45 border-b-1.5 border-black" />
            <div className="w-6 translate-x-[0px] -translate-y-[2px] -rotate-45 border-b-1.5 border-black" />
          </button>
        </div>
        <ShopEntityList
          data={pageData}
          basePath={basePath}
          title={title}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default MobileEntityListScreen;
