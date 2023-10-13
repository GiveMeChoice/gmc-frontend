import { toDateString } from '@root/helpers/to-date-string';
import cn from 'classnames';
import React from 'react';
import ScreenSectionCell from '../shared/screen-section-cell';
import ScreenSectionRow from '../shared/screen-section-row';
import MerchantChip from '../merchants-screen/merchant-chip';
import ChannelBanner from '../channels-screen/channel-banner';
import { IChannel, IMerchant, IRun } from 'gmc-types';

interface Props {
  run: IRun;
}

const RunListRow: React.FC<Props> = ({ run }) => {
  return (
    <ScreenSectionRow>
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between p-3 pr-6">
          <div className="flex w-full items-center gap-x-12">
            <MerchantChip
              merchant={run.channel.merchant as IMerchant}
              clickable={true}
            />
            <ChannelBanner channel={run.channel as IChannel} />
          </div>
          <div className="flex items-center border-l border-zinc-500 px-4 text-center">
            <div className="mr-6 ml-2 text-center text-sm font-bold text-zinc-700">
              Run Date
            </div>
            <div className="flex flex-col text-base">
              <span className="whitespace-nowrap text-sm">
                {toDateString(run.runAt)}
              </span>
              <span className="ml-1 text-center text-xs">
                ({run.runTime} s)
              </span>
            </div>
          </div>
        </div>
        {/* RUN INFO CELL */}
        <ScreenSectionCell styles="flex flex-col divide-y divide-zinc-300 text-sm space-y-1 w-full border-t border-zinc-500">
          {run.errorMessage && (
            <div className="flex flex-col justify-center">
              <span className="pb-1 text-center text-sm font-bold text-gmc-heart">
                {run.errorMessage}
              </span>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-evenly pt-1.5">
            <div>
              Found: <span className="font-bold">{run.foundCount}</span>
            </div>
            <div>
              Refresh Sig:{' '}
              <span
                className={cn({
                  'font-bold': run.refreshSignalCount > 0,
                })}
              >
                {run.refreshSignalCount}
              </span>
            </div>
            {run.failureCount > 0 && (
              <span className="text-base">
                FAILURES:{' '}
                <span className="text-base font-bold text-gmc-heart">
                  {run.failureCount}
                </span>
              </span>
            )}
          </div>

          {/* 
            DETAIL COUNTS
          */}
          <div className="flex flex-wrap justify-center text-sm">
            <div className="mx-4 my-1 flex flex-col justify-evenly">
              <span className="pb-1">
                Owned: <span>{run.ownedCount}</span>
              </span>
              <ul className="ml-7 list-disc text-xs">
                <li>
                  Stale: <span>{run.staleCount}</span>
                </li>
                <li>
                  Pending: <span>{run.pendingCount}</span>
                </li>
                <li>
                  Keep Alives: <span>{run.keepAliveSignalCount}</span>
                </li>
              </ul>
            </div>

            <div className="mx-4 my-1 flex flex-col justify-evenly">
              <span className="pb-1">
                Unknown: <span>{run.foundCount - run.ownedCount}</span>
              </span>
              <ul className="ml-7 list-disc text-xs">
                <li>
                  Created: <span>{run.createdCount}</span>
                </li>
                <li>
                  Foreign: <span>{run.foreignCount}</span>
                </li>
                <li>
                  Adopted: <span>{run.adoptedCount}</span>
                </li>
              </ul>
            </div>
            <div className="flex w-full flex-row flex-wrap justify-evenly pb-1.5 [&>div]:pt-2">
              <div className="flex w-56 items-center justify-center">
                <span className="mr-2 text-sm text-zinc-700">Source Date:</span>
                <span className="">{toDateString(run.contentDate)}</span>
              </div>
            </div>
          </div>
        </ScreenSectionCell>
      </div>
    </ScreenSectionRow>
  );
};

export default RunListRow;
