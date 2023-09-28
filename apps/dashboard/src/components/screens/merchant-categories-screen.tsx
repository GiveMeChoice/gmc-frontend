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
import merchantCategoriesService from '@root/services/merchant-categories.service';
import { IMerchant } from '@root/services/merchants.service';
import productsService from '@root/services/products.service';
import { toastService } from '@root/services/toast.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CopyIdButton from '../shared/copy-id-button';
import FramedButton from '../shared/framed-button';
import { asyncDelay } from './gmc-categories-screen/gmc-category-column';
import AssignCategoriesDialog from './merchant-categories-screen/assign-categories-dialog';
import MerchantChip from './merchants-screen/merchant-chip';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';
const NestArrowIcon = require('../../assets/images/nest-arrow.svg');
const RightArrowIcon = require('../../assets/images/right-arrow.svg');
const GMCLogoIcon = require('../../assets/images/GMC_logo.svg');

const MerchantCategoriesScreen: React.FC = () => {
  const { readGmcCategoryName } = useMasterData();
  const { merchantCategories, merchantCategoriesMeta } = useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [updatedId, setUpdatedId] = useState(null);
  const [mappingId, setMappingId] = useState(null);

  const handleCancelAssign = () => {
    setMappingId(null);
  };

  const handleAssign = async (
    merchantCategoryId: string,
    gmcCategoryId: string
  ) => {
    await asyncDelay(2000);
    try {
      const updated = await merchantCategoriesService.assignGmcCategory(
        merchantCategoryId,
        gmcCategoryId
      );
      dataDispatch({
        type: 'SCREEN_UPDATE_MERCHANT_CATEGORY',
        value: updated,
      });
      setUpdatedId(merchantCategoryId);
      setTimeout(() => {
        setUpdatedId(null);
      }, 2000);
      toastService.setToast(
        {
          level: 'SUCCESS',
          message: 'Category Assigned Successfully',
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

  useEffect(() => {
    if (!merchantCategories.length) {
      setLoading(true);
      merchantCategoriesService
        .find(activeFilters, merchantCategoriesMeta)
        .then((labels) => {
          dataDispatch({
            type: 'SCREEN_REFRESH_MERCHANT_CATEGORIES',
            value: labels,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const onViewProducts = (merchantId, merchantCategoryCode) => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      merchantId,
      merchantCategoryCode,
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
      title={'Merchant Categories'}
      sortFields={[
        { name: 'merchantCategoryCode', title: 'Merchant Category' },
        { name: 'gmcCategoryId', title: 'GMC Category' },
      ]}
      meta={merchantCategoriesMeta}
    >
      <div className="flex w-full divide-x-2 divide-zinc-900">
        <div
          className={cn(
            'flex h-full w-full flex-col divide-y-2 divide-zinc-900',
            {
              'w-full': !mappingId,
              'w-2/3': mappingId,
            }
          )}
        >
          {merchantCategories.length ? (
            <>
              {merchantCategories.map((merchantCategory, i) => (
                <ScreenSectionRow key={i}>
                  <div className="flex w-full divide-x divide-zinc-400">
                    <div
                      className={cn(
                        'flex h-full w-full flex-col justify-center gap-y-4 divide-zinc-400 pl-10 transition-colors duration-500',
                        {
                          'bg-gmc-forest-light-10':
                            updatedId === merchantCategory.id,
                        }
                      )}
                    >
                      <div className="flex w-full items-center">
                        <div className="flex h-full w-[200px] items-center">
                          <MerchantChip
                            merchant={merchantCategory.merchant as IMerchant}
                            clickable={true}
                          />
                        </div>
                        <span className="pl-0 pr-1 italic">
                          {merchantCategory.name}
                        </span>
                        <CopyIdButton
                          id={merchantCategory.merchantCategoryCode}
                        />
                      </div>
                      {/*  */}
                      <div className="flex items-center">
                        <div className="mr-4 flex w-[80px] items-center justify-end">
                          <img
                            className="w-1/2"
                            src={NestArrowIcon}
                            alt="curve arrow"
                          />
                        </div>
                        <div className="mr-7 mt-2 w-[200px]">
                          <img
                            className="h-full"
                            src={GMCLogoIcon}
                            alt="GMC Logo"
                          />
                        </div>
                        {merchantCategory.gmcCategoryId ? (
                          <span className="fontbold mt-2 rounded-sm border-2 border-black bg-white px-4 py-1 text-[17px] font-bold text-gmc-berry-dark-20">
                            {readGmcCategoryName(
                              merchantCategory.gmcCategoryId
                            )}
                          </span>
                        ) : (
                          <span className="mt-3 text-lg font-bold italic text-gmc-heart-dark-10">
                            UNASSIGNED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex h-full w-[180px] items-center justify-center py-8 px-6">
                      <FramedButton
                        title={`Products:`}
                        count={merchantCategory.productCount}
                        disabled={merchantCategory.productCount === 0}
                        onClick={() =>
                          onViewProducts(
                            merchantCategory.merchantId,
                            merchantCategory.merchantCategoryCode
                          )
                        }
                      />
                    </div>
                    <button
                      className={cn(
                        'flex aspect-square h-full items-center justify-center',
                        {
                          'cursor-pointer hover:bg-primary active:bg-primary-light-10':
                            !mappingId,
                          'bg-gmc-berry-light-30':
                            mappingId === merchantCategory.id,
                        }
                      )}
                      disabled={mappingId}
                      onClick={() =>
                        mappingId
                          ? setMappingId(null)
                          : setMappingId(merchantCategory.id)
                      }
                    >
                      <img className="h-1/2" src={RightArrowIcon} alt="arrow" />
                    </button>
                  </div>
                  <div
                    className={cn(
                      'top-0 z-50 h-full w-full bg-secondary bg-opacity-70',
                      {
                        hidden: !mappingId || mappingId === merchantCategory.id,
                        absolute:
                          mappingId && mappingId !== merchantCategory.id,
                      }
                    )}
                  />
                </ScreenSectionRow>
              ))}
              <div />
            </>
          ) : (
            <ScreenSectionRow>
              <span className="m-3 ml-6 text-sm italic">
                {loading ? 'Loading...' : 'No Categories Found'}
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
            <AssignCategoriesDialog
              merchantCategory={
                merchantCategories.filter((c) => c.id === mappingId)[0]
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

export default MerchantCategoriesScreen;
