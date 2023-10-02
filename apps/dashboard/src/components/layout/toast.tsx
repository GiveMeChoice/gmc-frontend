import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import React, { useState } from 'react';
import cn from 'classnames';
import { IToast, toastService } from '@root/services/toast.service';

interface Props {}

const Toast: React.FC<Props> = () => {
  const data = useScreenData();
  const dispatch = useScreenDataDispatch();
  const [toastCache, setToastCache] = useState<IToast>(null);
  const [toastCacheRemovalId, setToastCacheRemovalId] = useState(null);

  const handleToastClickDismiss = () => {
    toastService.removeToast(dispatch);
    setToastCache(null);
    setToastCacheRemovalId(null);
  };

  const handleMouseEnter = () => {
    if (!toastCache) {
      setToastCache(data.toast);
    }
    clearTimeout(toastCacheRemovalId);
    setToastCacheRemovalId(null);
  };

  const handleMouseLeave = () => {
    setToastCacheRemovalId(
      setTimeout(() => {
        setToastCache(null);
        setToastCacheRemovalId(null);
      }, 1500)
    );
  };

  return (
    <div
      className={cn(
        'group absolute bottom-20 z-50 cursor-pointer rounded-md border-1.5 border-black bg-opacity-95 p-4 px-8 transition-all duration-300 hover:scale-105 ',
        {
          '-left-[40%]': !data.toast && !toastCache,
          'right-[40%]': data.toast || toastCache,
          'bg-gmc-ocean-light-50':
            (data.toast && data.toast.level === 'INFO') ||
            (toastCache && toastCache.level === 'INFO'),
          'bg-gmc-heart-light-30':
            (data.toast && data.toast.level === 'ERROR') ||
            (toastCache && toastCache.level === 'ERROR'),
          'bg-gmc-forest-light-50':
            (data.toast && data.toast.level === 'SUCCESS') ||
            (toastCache && toastCache.level === 'SUCCESS'),
        }
      )}
      onClick={handleToastClickDismiss}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {(data.toast || toastCache) && (
        <p className="">
          {data.toast ? data.toast.message : toastCache.message}
        </p>
      )}
      <div className="absolute top-1 left-1.5 hidden h-3.5 w-3.5 items-center justify-center rounded-full border border-black bg-secondary pb-[3px] group-hover:flex group-active:bg-secondary-dark-10">
        <span>&times;</span>
      </div>
    </div>
  );
};

export default Toast;
