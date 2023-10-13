import React from 'react';
import ScreenSectionMeta from './screen-section-meta';
import ScreenSectionRow from './screen-section-row';
import ScreenSectionSort, { SortField } from './screen-section-sort';
import ScreenSectionTitle from './screen-section-title';
import { PageMeta } from 'gmc-types';
const AddCircleIcon = require('../../../assets/images/add-circle.svg');

interface Props {
  title?: string;
  sortFields?: SortField[];
  meta?: PageMeta;
  onCreateRequest?: () => void;
}

const ScreenSection: React.FC<Props> = ({
  children,
  title,
  sortFields,
  meta,
  onCreateRequest,
}) => (
  <div className="divide-y-2 divide-zinc-900 rounded-md bg-secondary py-4 shadow-lg shadow-black">
    {(title || sortFields || meta) && (
      <div className="flex w-full flex-col items-center">
        {sortFields && <ScreenSectionSort fields={sortFields} />}
        {(title || meta) && (
          <div className="my-2 flex w-full items-center justify-between px-4">
            <div className="flex items-center gap-x-4">
              {title && <ScreenSectionTitle title={title} />}
              {onCreateRequest && (
                <div
                  className="flex h-[60px] cursor-pointer items-center justify-center hover:scale-105"
                  onClick={onCreateRequest}
                >
                  <img className="h-3/5" src={AddCircleIcon} alt="add" />
                </div>
              )}
            </div>
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
