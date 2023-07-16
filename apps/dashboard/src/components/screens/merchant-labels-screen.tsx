import {
  IFilters,
  initialFilters,
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import merchantLabelsService from '@root/services/merchant-labels.service';
import { IMerchant } from '@root/services/merchants.service';
import productsService from '@root/services/products.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FramedButton from '../shared/framed-button';
import GmcLabelSelect from '../shared/gmc-label-select';
import MerchantLabelChip from './merchant-labels-screen/merchant-label-chip';
import MerchantChip from './merchants-screen/merchant-chip';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';
import MerchantLabelEditableFields from './merchant-labels-screen/merchant-label-editable-fields';

const MerchantLabelsScreen: React.FC = () => {
  const { merchantLabels: labels, merchantLabelsMeta: labelsMeta } =
    useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();
  const { activeFilters } = useFilters();
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

  const onViewProducts = (merchantId, merchantLabelCode) => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      merchantId,
      merchantLabelCode: merchantLabelCode,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: sourceFilters });
    dataDispatch({
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: { data: [], meta: {} },
    });
    navigate(productsService.productsScreenControl.pathname);
  };

  return (
    <ScreenSection
      title={'Labels'}
      sortFields={[
        { name: 'name', title: 'Name' },
        { name: 'createdAt', title: 'Created At' },
        { name: 'groupId', title: 'Group ID' },
      ]}
      meta={labelsMeta}
    >
      {labels.length ? (
        labels.map((label, i) => (
          <ScreenSectionRow key={i}>
            <div className="flex w-full divide-x divide-zinc-400">
              <div className="flex w-2/12 items-center justify-center p-4">
                <MerchantChip
                  merchant={label.merchant as IMerchant}
                  clickable={true}
                />
              </div>
              <div className="flex w-4/12 flex-col items-center divide-y divide-zinc-400">
                <div className="flex h-2/5 w-full items-center justify-center">
                  <MerchantLabelChip merchantLabel={label} />
                </div>
                <div className="flex h-3/5 w-full items-center">
                  <GmcLabelSelect label={label} />
                </div>
              </div>
              <div className="flex w-4/12 flex-col items-center justify-center space-y-0.5 p-2">
                <MerchantLabelEditableFields label={label} />
              </div>
              <div className="flex h-full w-2/12 items-center justify-center p-4">
                <div className="h-full w-2/3">
                  <FramedButton
                    title={`Products:`}
                    count={label.productCount}
                    disabled={label.productCount === 0}
                    onClick={() =>
                      onViewProducts(label.merchantId, label.merchantLabelCode)
                    }
                  />
                </div>
              </div>
            </div>
          </ScreenSectionRow>
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3 ml-6 text-sm italic">
            {loading ? 'Loading...' : 'No Labels Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default MerchantLabelsScreen;
