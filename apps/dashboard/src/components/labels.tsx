import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  ProviderSelectType,
  useFilters,
} from '@root/context-providers/filters.provider';
import labelsService from '@root/services/labels.service';
import React, { useEffect, useState } from 'react';
import LabelGroupSelectField from './label-group-select-field';
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';
import cn from 'classnames';

const LabelsScreen: React.FC = () => {
  const { labels, labelsMeta } = useData();
  const dataDispatch = useDataDispatch();
  const { activeFilters, options } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!labels.length) {
      setLoading(true);
      labelsService
        .find(activeFilters, labelsMeta)
        .then((labels) => {
          dataDispatch({ type: 'REFRESH_LABELS', value: labels });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const readProviderKey = (providerId: string) => {
    let match: ProviderSelectType = null;
    if (options.providerSelect.length) {
      match = options.providerSelect.find((s) => s.id === providerId);
    }
    return match ? match.key : 'unknown';
  };

  return (
    <ScreenSection
      title={'Labels'}
      sortFields={[
        { name: 'code', title: 'Code' },
        { name: 'createdAt', title: 'Created At' },
        { name: 'groupId', title: 'Group ID' },
      ]}
      meta={labelsMeta}
    >
      {labels.length ? (
        labels.map((l, i) => (
          <ScreenSectionRow key={i}>
            <ScreenSectionCell>
              <div className="flex h-full w-32 items-center justify-center break-words px-1 text-sm font-medium">
                {readProviderKey(l.merchantId)}
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>
              <div className="flex h-full w-44 flex-col items-center justify-center break-words pr-2">
                <span className="text-center">{l.description}</span>
                <span className="mt-2 text-center text-sm font-bold">
                  {l.code}
                </span>
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>
              <div className="flex h-full w-12 items-center justify-center px-2">
                <img className="w-12" src={l.logoUrl} alt="label icon" />
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>
              <LabelGroupSelectField label={l} />
            </ScreenSectionCell>
            <ScreenSectionCell>
              <div className="flex h-full w-36 items-center justify-center">
                <span
                  className={cn('text-sm font-bold', {
                    'text-gmc-glacier': l.productCount == 0,
                    'cursor-pointer underline-offset-2 hover:underline':
                      l.productCount > 0,
                  })}
                >
                  {l.productCount > 0
                    ? `${l.productCount} Products`
                    : 'No Products'}
                </span>
              </div>
            </ScreenSectionCell>
          </ScreenSectionRow>
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3">
            {loading ? 'Loading...' : 'No Labels Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default LabelsScreen;
