import React, { useEffect, useState } from 'react';
import LoadingWheel from './loading-wheel';
import cn from 'classnames';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import providersService from '@root/services/providers.service';
import channelsService from '@root/services/channels.service';
import jobsService from '@root/services/jobs.service';
import screensService from '@root/services/screens.service';

interface Props {
  active: boolean;
  id: string;
}

const ActivationSwitch: React.FC<Props> = ({ active, id }) => {
  const [loading, setLoading] = useState(false);
  const dataDispatch = useScreenDataDispatch();

  useEffect(() => {
    setLoading(false);
  }, [active]);

  const handleChange = async () => {
    setLoading(true);
    try {
      if (screensService.isActive(providersService.providersScreenControl)) {
        dataDispatch({
          type: 'SCREEN_UPDATE_PROVIDER',
          value: await providersService.update(id, {
            active: !active,
          }),
        });
      } else if (
        screensService.isActive(channelsService.channelsScreenControl)
      ) {
        dataDispatch({
          type: 'SCREEN_UPDATE_CHANNEL',
          value: await channelsService.update(id, {
            active: !active,
          }),
        });
      } else if (screensService.isActive(jobsService.jobsScreenControl)) {
        dataDispatch({
          type: 'SCREEN_UPDATE_JOB',
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-2">
      {loading ? (
        <LoadingWheel size="h-4" />
      ) : (
        <p
          className={cn('mr-1.5 text-xs font-semibold', {
            'text-zinc-900': active,
            'text-secondary-dark-40': !active,
          })}
        >
          {active ? 'ACTIVE' : 'INACTIVE'}
        </p>
      )}
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
