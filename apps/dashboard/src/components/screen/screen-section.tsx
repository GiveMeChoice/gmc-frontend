import { PageMeta } from '@root/services/shared/page-response.interface';
import React from 'react';
import ScreenSectionMeta from './screen-section-meta';
import ScreenSectionRow from './screen-section-row';
import ScreenSectionSort, { SortField } from './screen-section-sort';
import ScreenSectionTitle from './screen-section-title';

interface Props {
  title: string;
  sortFields?: SortField[];
  meta?: PageMeta;
}

const ScreenSection: React.FC<Props> = ({
  children,
  title,
  sortFields,
  meta,
}) => (
  <div className="divide-y divide-zinc-900 rounded-md bg-secondary px-6 pt-2  pb-6">
    <div className="mx-2 flex items-center justify-between">
      <ScreenSectionTitle title={title} />
      {sortFields && <ScreenSectionSort fields={sortFields} />}
      {meta && <ScreenSectionMeta meta={meta} />}
    </div>
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
