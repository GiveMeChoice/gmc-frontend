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
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';

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
      ]}
      meta={labelsMeta}
    >
      {labels.length ? (
        labels.map((l, i) => (
          <ScreenSectionRow key={i}>
            <ScreenSectionCell>
              <div className="w-38 flex h-full items-center justify-center px-1 text-sm font-medium">
                {readProviderKey(l.providerId)}
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>
              {l.groupId ? (
                l.groupId
              ) : (
                <span className="text-gmc-glacier">{'UNASSIGNED'}</span>
              )}
            </ScreenSectionCell>
            <ScreenSectionCell>
              <div className="flex h-full items-center">
                <div className="flex h-full w-56 flex-col items-center justify-center break-words pr-2">
                  <span className="text-center">{l.description}</span>
                  <span className="mt-2 text-center text-sm font-bold">
                    {l.code}
                  </span>
                </div>
                <img className="h-10" src={l.icon} alt="label icon" />
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>Products: {l.productCount}</ScreenSectionCell>
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
