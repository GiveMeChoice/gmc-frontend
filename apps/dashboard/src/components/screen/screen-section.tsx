import { PageMeta } from '@root/services/shared/page-response.interface';
import React from 'react';
import ScreenSectionMeta from './screen-section-meta';
import ScreenSectionRow from './screen-section-row';
import ScreenSectionSort, { SortField } from './screen-section-sort';
import ScreenSectionTitle from './screen-section-title';

interface Props {
  title?: string;
  sortFields?: SortField[];
  meta?: PageMeta;
}

const ScreenSection: React.FC<Props> = ({
  children,
  title,
  sortFields,
  meta,
}) => (
  <div className="divide-y divide-zinc-900 rounded-md bg-secondary px-4 pt-2 pb-6">
    {(title || sortFields || meta) && (
      <div className="flex w-full flex-col items-center">
        {sortFields && <ScreenSectionSort fields={sortFields} />}
        {(title || meta) && (
          <div className="my-2 flex w-full items-center justify-between px-4">
            {title && <ScreenSectionTitle title={title} />}
            {meta && <ScreenSectionMeta meta={meta} />}
          </div>
        )}
      </div>
    )}
    {children}
    {meta && (
      <ScreenSectionRow>
        <div className="flex w-full justify-end pt-3 pr-2">
          <ScreenSectionMeta meta={meta} />
        </div>
      </ScreenSectionRow>
    )}
  </div>
);

export default ScreenSection;
