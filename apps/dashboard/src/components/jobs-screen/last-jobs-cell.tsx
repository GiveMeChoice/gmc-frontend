import { toDateString } from '@root/helpers/to-date-string';
import { IJobResult } from '@root/services/jobs.service';
import React from 'react';
import ScreenSectionCell from '../screen/screen-section-cell';
import cn from 'classnames';

interface Props {
  name: string;
  last: IJobResult[];
}

const LastJobsCell: React.FC<Props> = ({ name, last }) => {
  const handleToggleRun = (e: any) => {
    let buttonId = e.target.id;
    let runId = `${buttonId.split('-')[0]}-${name}-run`;
    let buttonEl = document.getElementById(buttonId);
    let runEl = document.getElementById(runId);
    if (runEl.classList.contains('hidden')) {
      runEl.classList.remove('hidden');
      buttonEl.classList.add('bg-primary-light-30');
      buttonEl.classList.remove('bg-zinc-200');
      buttonEl.innerText = 'ᐁ';
    } else {
      runEl.classList.add('hidden');
      buttonEl.classList.remove('bg-primary-light-30');
      buttonEl.classList.add('bg-zinc-200');
      buttonEl.innerText = 'ᐅ';
    }
  };
  return (
    <ScreenSectionCell styles="w-3/12 flex flex-col space-y-2">
      {last
        .sort((a, b) => (new Date(a.runAt) as any) - (new Date(b.runAt) as any))
        .map((l, i) => (
          <div key={i}>
            <div className="flex items-center space-x-3">
              <button
                id={`${i}-${name}-button`}
                className="flex h-5 w-8 items-center justify-center rounded-md border border-zinc-500  bg-zinc-200 bg-opacity-40 font-bold text-zinc-600 hover:bg-primary-light-30 hover:bg-opacity-40"
                onClick={handleToggleRun}
              >
                {last.length === i + 1 ? 'ᐁ' : 'ᐅ'}
              </button>
              <span
                className={cn('text-sm font-bold', {
                  'text-gmc-heart': l.status !== 'SUCCESS',
                })}
              >
                {toDateString(l.runAt)}
              </span>
            </div>
            <div
              id={`${i}-${name}-run`}
              className={`ml-7 mt-2 flex ${
                last.length === i + 1 ? '' : 'hidden'
              } w-full flex-col text-sm`}
            >
              <div>
                <span className="mr-1 font-bold">Duration:</span>
                {l.runTime} seconds
              </div>
              <div>
                <span className="mr-1 font-bold">Message:</span>
                {l.message}
              </div>
            </div>
          </div>
        ))}
    </ScreenSectionCell>
  );
};

export default LastJobsCell;
