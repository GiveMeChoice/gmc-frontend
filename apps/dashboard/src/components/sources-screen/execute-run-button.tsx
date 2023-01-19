import { useDataDispatch } from '@root/context-providers/data.provider';
import sourcesService from '@root/services/sources.service';
import cn from 'classnames';
import React, { useState } from 'react';
import LoadingWheel from '../loading-wheel';

interface Props {
  sourceId: string;
}

const ExecuteRunButton: React.FC<Props> = ({ sourceId }) => {
  const dataDispatch = useDataDispatch();
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
        const run = await sourcesService.integrate(sourceId);
      } catch (e) {
        console.error(e);
      } finally {
        const updated = await sourcesService.getOne(sourceId);
        dataDispatch({ type: 'UPDATE_SOURCE', value: updated });
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
        'mt-2 w-24 rounded-md border-2 bg-secondary px-1.5 py-1 text-sm',
        {
          'border-zinc-500 hover:bg-primary-light-50 active:bg-primary':
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
