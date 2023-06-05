import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import channelsService from '@root/services/channels.service';
import cn from 'classnames';
import React, { useState } from 'react';
import LoadingWheel from '../../../shared/loading-wheel';

interface Props {
  sourceId: string;
}

const ExecuteRunButton: React.FC<Props> = ({ sourceId }) => {
  const dataDispatch = useScreenDataDispatch();
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
        const run = await channelsService.integrate(sourceId);
      } catch (e) {
        console.error(e);
      } finally {
        const updated = await channelsService.getOne(sourceId);
        dataDispatch({ type: 'SCREEN_UPDATE_CHANNEL', value: updated });
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
      className={cn(
        'mt-2 w-full rounded-md border-1.5 bg-secondary px-1.5 py-2.5 text-xs',
        {
          'border-zinc-500 bg-gmc-dune-light-50 hover:bg-gmc-dune-light-30 active:bg-gmc-dune':
            !executable,
          'border-gmc-heart bg-gmc-heart hover:bg-gmc-heart hover:bg-opacity-50':
            executable,
        }
      )}
      onClick={handleClick}
    >
      {executable ? 'CONFIRM' : 'EXECUTE RUN'}
    </button>
  );
};

export default ExecuteRunButton;
