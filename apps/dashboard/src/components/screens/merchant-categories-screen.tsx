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
import productsService from '@root/services/products.service';
import { toastService } from '@root/services/toast.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FramedButton from '../shared/framed-button';
import AssignCategoriesDialog from './merchant-categories-screen/assign-categories-dialog';
import MerchantChip from './merchants-screen/merchant-chip';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';
import { IMerchant } from 'gmc-types';
const NestArrowIcon = require('../../assets/images/nest-arrow.svg');
const RightArrowIcon = require('../../assets/images/right-arrow.svg');
const GMCLogoIcon = require('../../assets/images/GMC_G.svg');

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

  const handleStartMappingClick = (merchantCategoryId: string) => {
    if (mappingId) {
      setMappingId(null);
    } else {
      setMappingId(merchantCategoryId);
    }
    document.getElementById('screen-container').scrollTo(0, 0);
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
      title="Assign Categories"
      sortFields={[
        { name: 'merchantCategoryCode', title: 'Merchant Category' },
        // { name: 'gmcCategoryId', title: 'GMC Category' },
      ]}
      meta={merchantCategoriesMeta}
    >
      <div className="flex w-full">
        <div
          className={cn(
            'flex h-full w-2/3 flex-col divide-y-2 divide-zinc-900 border-r-2 border-zinc-900',
            {}
          )}
        >
          {merchantCategories.length ? (
            <>
              {merchantCategories.map((merchantCategory, i) => (
                <>
                  {(!mappingId || mappingId === merchantCategory.id) && (
                    <ScreenSectionRow key={i}>
                      <div className="flex h-[180px] w-full divide-x divide-zinc-400">
                        <div
                          className={cn(
                            'flex h-full w-full flex-col justify-center gap-y-3 divide-y-1.5 divide-zinc-400 py-5 pl-12 pr-4 transition-colors duration-500',
                            {
                              'bg-primary': updatedId === merchantCategory.id,
                            }
                          )}
                        >
                          <div className="flex w-full items-center">
                            <div className="flex h-full w-fit items-center">
                              <MerchantChip
                                merchant={
                                  merchantCategory.merchant as IMerchant
                                }
                                clickable={true}
                              />
                            </div>
                            <div className="w-14">
                              <hr className="border border-zinc-700" />
                            </div>
                            <span className="max-w-[50%] rounded-sm border border-zinc-700 bg-white py-1.5 px-3 text-center text-[15px] italic">
                              {merchantCategory.name}
                            </span>
                          </div>
                          {/*  */}
                          <div className="flex items-center pl-5">
                            <div className="flex w-[30px] items-center justify-end">
                              <img
                                className="w-[95%]"
                                src={NestArrowIcon}
                                alt="curve arrow"
                              />
                            </div>
                            <div className="ml-5 mt-4 flex items-center">
                              <div
                                className={cn(
                                  'flex aspect-square w-[52px] items-center justify-center rounded-full border-1.5 border-zinc-900',
                                  {
                                    'bg-white': !merchantCategory.gmcCategoryId,
                                    'bg-primary':
                                      merchantCategory.gmcCategoryId,
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
                                <hr className="border border-zinc-700" />
                              </div>
                              {merchantCategory.gmcCategoryId ? (
                                <span className="rounded-sm border-1.5 border-zinc-900 bg-white px-4 py-2 text-center text-[15px] font-bold  shadow-gmc-berry">
                                  {readGmcCategoryName(
                                    merchantCategory.gmcCategoryId
                                  )}
                                </span>
                              ) : (
                                <span className="bgwhite rounded-sm border-1.5 border-secondary-dark-20 bg-gmc-sunset-light-50 px-4 py-2 text-[14px] font-bold text-gmc-heart">
                                  UNASSIGNED
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex h-full w-[180px] items-center justify-center py-4 px-4">
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
                            'flex aspect-3/4 h-full items-center justify-center',
                            {
                              'cursor-pointer hover:bg-primary active:bg-primary-light-10':
                                !mappingId,
                              'bg-gmc-berry-light-30':
                                mappingId === merchantCategory.id,
                            }
                          )}
                          disabled={mappingId}
                          onClick={() =>
                            handleStartMappingClick(merchantCategory.id)
                          }
                        >
                          <img
                            className="w-1/2"
                            src={RightArrowIcon}
                            alt="arrow"
                          />
                        </button>
                      </div>
                      <div
                        className={cn(
                          'top-0 z-50 h-full w-full bg-secondary bg-opacity-70',
                          {
                            hidden:
                              !mappingId || mappingId === merchantCategory.id,
                            absolute:
                              mappingId && mappingId !== merchantCategory.id,
                          }
                        )}
                      />
                    </ScreenSectionRow>
                  )}
                </>
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
