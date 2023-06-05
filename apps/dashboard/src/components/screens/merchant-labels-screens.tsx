import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import {
  ProviderSelectType,
  useFilters,
} from '@root/context-providers/filters.provider';
import merchantLabelsService from '@root/services/merchant-labels.service';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import ScreenSection from './shared/screen-section';
import LabelGroupSelectField from '../shared/label-group-select-field';
import ScreenSectionCell from './shared/screen-section-cell';
import ScreenSectionRow from './shared/screen-section-row';
import { useMasterData } from '@root/context-providers/master-data.provider';

const MerchantLabelsScreen: React.FC = () => {
  const { merchantLabels: labels, merchantLabelsMeta: labelsMeta } =
    useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const { readProviderKey } = useMasterData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!labels.length) {
      setLoading(true);
      merchantLabelsService
        .find(activeFilters, labelsMeta)
        .then((labels) => {
          dataDispatch({
            type: 'SCREEN_REFRESH_MERCHANT_LABELS',
            value: labels,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

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
                  {l.merchantLabelCode}
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

export default MerchantLabelsScreen;
