/* eslint-disable @next/next/no-img-element */
import {
  IFilters,
  initialFilters,
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import merchantLabelsService from '@root/services/merchant-labels.service';
import { IMerchant } from '@root/services/merchants.service';
import productsService from '@root/services/products.service';
import { toastService } from '@root/services/toast.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FramedButton from '../shared/framed-button';
import AssignLabelsDialog from './merchant-labels-screen/assign-labels-dialog';
import MerchantLabelChip from './merchant-labels-screen/merchant-label-chip';
import MerchantChip from './merchants-screen/merchant-chip';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';
const NestArrowIcon = require('../../assets/images/nest-arrow.svg');
const RightArrowIcon = require('../../assets/images/right-arrow.svg');
const GMCLogoIcon = require('../../assets/images/GMC_G.svg');

const MerchantLabelsScreen: React.FC = () => {
  const { merchantLabels, merchantLabelsMeta: labelsMeta } = useScreenData();
  const { readGmcLabelName } = useMasterData();
  const dataDispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);
  const [mappingId, setMappingId] = useState(null);

  useEffect(() => {
    if (!merchantLabels.length) {
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

  const handleCancelAssign = () => {
    setMappingId(null);
  };

  const handleAssign = async (merchantLabelId: string, gmcLabelId: string) => {
    try {
      const updated = await merchantLabelsService.assignGmcLabel(
        merchantLabelId,
        gmcLabelId
      );
      dataDispatch({
        type: 'SCREEN_UPDATE_MERCHANT_LABEL',
        value: updated,
      });
      setUpdatedId(merchantLabelId);
      setTimeout(() => {
        setUpdatedId(null);
      }, 2000);
      toastService.setToast(
        {
          level: 'SUCCESS',
          message: 'Label Assigned Successfully',
        },
        dataDispatch
      );
      setMappingId(null);
    } catch (e) {
      toastService.setToast(
        {
          level: 'ERROR',
          message: formatErrorMessage(e),
        },
        dataDispatch
      );
    }
  };

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
      title={'Merchant Labels'}
      sortFields={[
        { name: 'name', title: 'Name' },
        { name: 'createdAt', title: 'Created At' },
        { name: 'groupId', title: 'Group ID' },
      ]}
      meta={labelsMeta}
    >
      <div className="flex h-full w-full">
        <div
          className={cn(
            'flex h-full w-2/3 flex-col divide-y-2 divide-zinc-900 border-r-2 border-zinc-900',
            {
              // 'w-full': !mappingId,
              // 'w-2/3': mappingId,
            }
          )}
        >
          {merchantLabels.length ? (
            merchantLabels.map((merchantLabel, i) => (
              <ScreenSectionRow key={i}>
                <div className="flex w-full divide-x divide-zinc-400">
                  <div
                    className={cn(
                      'flex h-full w-full flex-col justify-center gap-y-3 divide-zinc-400 py-5 pl-12 pr-4 transition-colors duration-500',
                      {
                        'bg-primary': updatedId === merchantLabel.id,
                      }
                    )}
                  >
                    <div className="flex w-full items-center">
                      <div className="flex h-full w-fit items-center">
                        <MerchantChip
                          merchant={merchantLabel.merchant as IMerchant}
                          clickable={true}
                        />
                      </div>
                      <div className="w-14">
                        <hr className="border border-zinc-600" />
                      </div>
                      <MerchantLabelChip merchantLabel={merchantLabel} />
                    </div>
                    <div className="flex items-center">
                      <div className="flex w-[80px] items-center justify-end">
                        <img
                          className="w-[45%]"
                          src={NestArrowIcon}
                          alt="curve arrow"
                        />
                      </div>
                      <div className="ml-6 mt-5 flex items-center">
                        <div
                          className={cn(
                            'flex h-[52px] w-[52px] items-center justify-center rounded-full border-1.5 border-zinc-900',
                            {
                              'bg-white': !merchantLabel.gmcLabelId,
                              'bg-primary': merchantLabel.gmcLabelId,
                            }
                          )}
                        >
                          <img
                            className="h-[60%]"
                            src={GMCLogoIcon}
                            alt="GMC Logo"
                          />
                        </div>
                        <div className="w-14">
                          <hr className="border border-zinc-600" />
                        </div>
                        {merchantLabel.gmcLabelId ? (
                          <span className="fontbold rounded-lg border-1.5 border-zinc-900 bg-white px-4 py-2 text-center text-[17px] text-lg font-bold shadow-md shadow-gmc-surf">
                            {readGmcLabelName(merchantLabel.gmcLabelId)}
                          </span>
                        ) : (
                          <span className="rounded-sm border-1.5 border-secondary-dark-20 bg-gmc-sunset-light-50 px-4 py-2 text-[17px] font-bold text-gmc-heart">
                            UNASSIGNED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex aspect-3/4 h-full w-36 items-center justify-center p-4">
                    <FramedButton
                      title={`Products:`}
                      count={merchantLabel.productCount}
                      disabled={merchantLabel.productCount === 0}
                      onClick={() =>
                        onViewProducts(
                          merchantLabel.merchantId,
                          merchantLabel.merchantLabelCode
                        )
                      }
                    />
                  </div>
                  <button
                    className={cn(
                      'flex aspect-3/4 w-36 items-center justify-center',
                      {
                        'cursor-pointer hover:bg-primary active:bg-primary-light-10':
                          !mappingId,
                        'bg-gmc-surf-light-30': mappingId === merchantLabel.id,
                      }
                    )}
                    disabled={mappingId}
                    onClick={() => {
                      mappingId
                        ? setMappingId(null)
                        : setMappingId(merchantLabel.id);
                    }}
                  >
                    <img className="w-1/2" src={RightArrowIcon} alt="arrow" />
                  </button>
                </div>
                <div
                  className={cn(
                    'top-0 z-50 h-full w-full bg-secondary bg-opacity-70',
                    {
                      hidden: !mappingId || mappingId === merchantLabel.id,
                      absolute: mappingId && mappingId !== merchantLabel.id,
                    }
                  )}
                />
              </ScreenSectionRow>
            ))
          ) : (
            <ScreenSectionRow>
              <span className="m-3 ml-6 text-sm italic">
                {loading ? 'Loading...' : 'No Labels Found'}
              </span>
            </ScreenSectionRow>
          )}
        </div>
        <div
          className={cn('h-full min-h-screen', {
            'w-0': !mappingId,
            'w-1/3': mappingId,
          })}
        >
          {mappingId && (
            <AssignLabelsDialog
              merchantLabel={
                merchantLabels.filter((c) => c.id === mappingId)[0]
              }
              onAssign={handleAssign}
              onCancel={handleCancelAssign}
            />
          )}
        </div>
      </div>
    </ScreenSection>
  );
};

export default MerchantLabelsScreen;
