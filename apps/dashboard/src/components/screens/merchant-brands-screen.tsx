/* eslint-disable @next/next/no-img-element */
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
import { formatErrorMessage } from '@root/helpers/format-error-message';
import merchantBrandsService from '@root/services/merchant-brands.service';
import productsService from '@root/services/products.service';
import { toastService } from '@root/services/toast.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FramedButton from '../shared/framed-button';
import AssignBrandsDialog from './merchant-brands-screen/assign-brands-dialog';
import MerchantBrandChip from './merchant-brands-screen/merchant-brand-chip';
import MerchantChip from './merchants-screen/merchant-chip';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';
import { IMerchant } from 'gmc-types';
const NestArrowIcon = require('../../assets/images/nest-arrow.svg');
const RightArrowIcon = require('../../assets/images/right-arrow.svg');
const GMCLogoIcon = require('../../assets/images/GMC_G.svg');

const MerchantBrandsScreen: React.FC = () => {
  const { merchantBrands, merchantBrandsMeta } = useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();
  const [updatedId, setUpdatedId] = useState(null);
  const [mappingId, setMappingId] = useState(null);

  useEffect(() => {
    if (!merchantBrands.length) {
      setLoading(true);
      merchantBrandsService
        .find(activeFilters, merchantBrandsMeta)
        .then((labels) => {
          dataDispatch({
            type: 'SCREEN_REFRESH_MERCHANT_BRANDS',
            value: labels,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const onViewProducts = (merchantId, merchantBrandCode) => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      merchantId,
      merchantBrandCode,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: sourceFilters });
    dataDispatch({
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: { data: [], meta: {} },
    });
    navigate(productsService.productsScreenControl.pathname);
  };

  const handleCancelAssign = () => {
    setMappingId(null);
  };

  const handleAssign = async (merchantBrandId: string, gmcBrandId: string) => {
    try {
      const updated = await merchantBrandsService.assignGmcBrand(
        merchantBrandId,
        gmcBrandId
      );
      dataDispatch({
        type: 'SCREEN_UPDATE_MERCHANT_BRAND',
        value: updated,
      });
      setUpdatedId(merchantBrandId);
      setTimeout(() => {
        setUpdatedId(null);
      }, 2000);
      toastService.setToast(
        {
          level: 'SUCCESS',
          message: 'Brand Assigned Successfully',
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

  return (
    <ScreenSection
      title={'Assign Brands'}
      sortFields={[{ name: 'code', title: 'Name' }]}
      meta={merchantBrandsMeta}
    >
      <div className="flex h-full w-full">
        <div
          className={cn(
            'flex h-full w-2/3 flex-col divide-y-2 divide-zinc-900 border-r-2 border-zinc-900',
            {}
          )}
        >
          {merchantBrands.length ? (
            merchantBrands.map((merchantBrand, i) => (
              <>
                <ScreenSectionRow key={i}>
                  <div className="flex w-full divide-x divide-zinc-400">
                    <div
                      className={cn(
                        'flex h-full w-full flex-col justify-center gap-y-3 divide-y-1.5 divide-zinc-400 py-5 pl-12 pr-4 transition-colors duration-500',
                        {
                          'bg-primary': updatedId === merchantBrand.id,
                        }
                      )}
                    >
                      <div className="flex w-full items-center">
                        <div className="flex h-full w-fit items-center">
                          <MerchantChip
                            merchant={merchantBrand.merchant as IMerchant}
                            clickable={true}
                          />
                        </div>
                        <div className="w-14">
                          <hr className="border border-zinc-600" />
                        </div>
                        <MerchantBrandChip merchantBrand={merchantBrand} />
                      </div>
                      <div className="flex items-center pl-5">
                        <div className="flex w-[30px] items-center justify-center">
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
                                'bg-white': !merchantBrand.gmcBrandId,
                                'bg-primary': merchantBrand.gmcBrandId,
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
                          {merchantBrand.gmcBrandId ? (
                            <span className="shadow-xs rounded-sm border-1.5 border-zinc-900 bg-white px-4 py-2 text-center text-[17px] font-bold shadow-gmc-surf">
                              {merchantBrand.gmcBrand.name}
                            </span>
                          ) : (
                            <span className="rounded-sm border-1.5 border-secondary-dark-20 bg-gmc-sunset-light-50 px-4 py-2 text-[14px] font-bold text-gmc-heart">
                              UNASSIGNED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex aspect-3/4 h-full w-36 items-center justify-center p-4">
                      <FramedButton
                        title={`Products:`}
                        count={merchantBrand.productCount}
                        disabled={merchantBrand.productCount === 0}
                        onClick={() =>
                          onViewProducts(
                            merchantBrand.merchantId,
                            merchantBrand.merchantBrandCode
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
                          'bg-gmc-surf-light-30':
                            mappingId === merchantBrand.id,
                        }
                      )}
                      disabled={mappingId}
                      onClick={() => {
                        mappingId
                          ? setMappingId(null)
                          : setMappingId(merchantBrand.id);
                      }}
                    >
                      <img className="w-1/2" src={RightArrowIcon} alt="arrow" />
                    </button>
                  </div>
                  <div
                    className={cn(
                      'top-0 z-50 h-full w-full bg-secondary bg-opacity-70',
                      {
                        hidden: !mappingId || mappingId === merchantBrand.id,
                        absolute: mappingId && mappingId !== merchantBrand.id,
                      }
                    )}
                  />
                </ScreenSectionRow>
              </>
            ))
          ) : (
            <ScreenSectionRow>
              <span className="m-3 ml-6 text-sm italic">
                {loading ? 'Loading...' : 'No Brands Found'}
              </span>
            </ScreenSectionRow>
          )}
          <div />
        </div>
        <div
          className={cn('h-full min-h-screen', {
            'w-0': !mappingId,
            'w-1/3': mappingId,
          })}
        >
          {mappingId && (
            <AssignBrandsDialog
              merchantBrand={
                merchantBrands.filter((c) => c.id === mappingId)[0]
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

export default MerchantBrandsScreen;
