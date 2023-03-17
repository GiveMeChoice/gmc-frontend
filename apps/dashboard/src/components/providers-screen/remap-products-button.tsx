import providersService from '@root/services/providers.service';
import cn from 'classnames';
import React, { useState } from 'react';
import LoadingWheel from '../loading-wheel';

interface Props {
  providerKey: string;
}

const RemapProductsButton: React.FC<Props> = ({ providerKey }) => {
  const [executable, setExecutable] = useState<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!executable) {
      const timeout = setTimeout(() => {
        setExecutable(null);
      }, 2000);
      setExecutable(timeout);
    } else {
      setLoading(true);
      clearTimeout(executable);
      setExecutable(null);
      try {
        await providersService.remapProducts(providerKey);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
  };

  return loading ? (
    <div className="mt-2">
      <LoadingWheel size="w-8" />
    </div>
  ) : (
    <button
      className={cn('h-1/2 w-24 rounded-md border-1.5 text-xs', {
        'border-zinc-500 bg-gmc-dune-light-50 hover:bg-gmc-dune-light-30 active:bg-gmc-dune':
          !executable,
        'border-gmc-heart bg-gmc-heart-light-30 hover:bg-gmc-heart-light-50':
          executable,
      })}
      onClick={handleClick}
    >
      {executable ? 'CONFIRM' : 'REQUEST PRODUCT REMAP'}
    </button>
  );
};

export default RemapProductsButton;
