import React, { useEffect, useState } from 'react';
import LoadingWheel from './loading-wheel';
import cn from 'classnames';
import { useDataDispatch } from '@root/context-providers/data.provider';
import providersService from '@root/services/providers.service';
import sourcesService from '@root/services/sources.service';
import jobsService from '@root/services/jobs.service';

interface Props {
  active: boolean;
  id: string;
}

const ActivationSwitch: React.FC<Props> = ({ active, id }) => {
  const [loading, setLoading] = useState(false);
  const dataDispatch = useDataDispatch();

  useEffect(() => {
    setLoading(false);
  }, [active]);

  const handleChange = async () => {
    setLoading(true);
    try {
      if (location.pathname.includes('/providers')) {
        dataDispatch({
          type: 'UPDATE_PROVIDER',
          value: await providersService.update(id, {
            active: !active,
          }),
        });
      } else if (location.pathname.includes('/product-sources')) {
        dataDispatch({
          type: 'UPDATE_SOURCE',
          value: await sourcesService.update(id, {
            active: !active,
          }),
        });
      } else if (location.pathname.includes('/jobs')) {
        dataDispatch({
          type: 'UPDATE_JOB',
          value: active
            ? await jobsService.stop(id)
            : await jobsService.start(id),
        });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className={`flex h-full w-full flex-wrap items-center justify-center`}>
      <div className="flex w-1/2 items-center justify-center">
        {loading ? (
          <LoadingWheel size="h-9 w-9" />
        ) : (
          <p
            className={cn('mr-1.5 text-sm', {
              'text-zinc-900': active,
              'text-secondary-dark-40': !active,
            })}
          >
            {active ? 'ACTIVE' : 'INACTIVE'}
          </p>
        )}
      </div>
      <label className="switch w-1/2">
        <input
          checked={active}
          disabled={loading}
          type="checkbox"
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ActivationSwitch;
