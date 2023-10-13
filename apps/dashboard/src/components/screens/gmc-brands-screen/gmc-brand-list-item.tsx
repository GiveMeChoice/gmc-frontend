/* eslint-disable @next/next/no-img-element */
import ConfirmableButton from '@root/components/shared/confirmable-button';
import EditableField from '@root/components/shared/editable-field';
import EditableTextArea from '@root/components/shared/editable-text-area';
import FramedButton from '@root/components/shared/framed-button';
import {
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import { gmcBrandsService } from '@root/services/gmc-brands.service';
import merchantBrandsService from '@root/services/merchant-brands.service';
import { toastService } from '@root/services/toast.service';
import { IGmcBrand } from 'gmc-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DeleteIcon = require('../../../assets/images/delete-icon.svg');

interface Props {
  gmcBrand: IGmcBrand;
}

const GmcBrandListItem: React.FC<Props> = ({ gmcBrand }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();

  const handleUpdateBrand = (id, updates) => {
    setLoading(true);
    gmcBrandsService
      .update(id, updates)
      .then((updated) => {
        dispatch({
          type: 'SCREEN_UPDATE_GMC_BRAND',
          value: updated,
        });
        toastService.setToast(
          {
            level: 'SUCCESS',
            message: 'Brand Updated Successfully',
          },
          dispatch
        );
      })
      .catch((e) => {
        toastService.setToast(
          {
            level: 'ERROR',
            message: formatErrorMessage(e),
          },
          dispatch
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteBrand = async (id) => {
    gmcBrandsService
      .deleteOne(id)
      .then(() => {
        dispatch({
          type: 'SCREEN_REMOVE_GMC_BRAND',
          value: id,
        });
        toastService.setToast(
          {
            level: 'SUCCESS',
            message: 'Deleted Brand Successfully',
          },
          dispatch
        );
      })
      .catch((e) => {
        toastService.setToast(
          {
            level: 'ERROR',
            message: formatErrorMessage(e),
          },
          dispatch
        );
      });
  };

  const handleMerchantBrandsClick = (gmcBrandId: string) => {
    filtersDispatch({
      type: 'FILTERS_SAVE',
      value: { ...initialFilters, gmcBrandId },
    });
    dispatch({
      type: 'SCREEN_REFRESH_MERCHANT_BRANDS',
      value: { data: [], meta: {} },
    });
    navigate(merchantBrandsService.brandsScreenControl.pathname);
  };

  return (
    <div className="flex h-[240px] w-full divide-x-1.5 divide-zinc-500">
      <div className="flex w-full flex-col justify-center px-10">
        <div className="flex items-center justify-between pr-10">
          <span className="text-xl font-bold">
            {gmcBrand.name.toUpperCase()}
          </span>
          <span className="italic">
            www.givemechoice.com/shop/brands/{gmcBrand.slug.toLowerCase()}
          </span>
        </div>
        <div className="flex w-full gap-x-6 px-6 pb-1 pt-4">
          <div className="flex w-3/5 flex-col gap-y-1">
            <EditableField
              title="NAME"
              initialValue={gmcBrand.name}
              fieldType={'text'}
              width="w-full"
              loading={loading}
              onSave={(name) => handleUpdateBrand(gmcBrand.id, { name })}
            />
            <EditableField
              title="SLUG"
              initialValue={gmcBrand.slug}
              fieldType={'text'}
              width="w-full"
              loading={loading}
              onSave={(slug) => handleUpdateBrand(gmcBrand.id, { slug })}
            />
            <EditableField
              title="LOGO"
              initialValue={gmcBrand.logo}
              fieldType={'text'}
              width="w-full"
              loading={loading}
              onSave={(logo) => handleUpdateBrand(gmcBrand.id, { logo })}
            />
            <EditableField
              title="URL"
              initialValue={gmcBrand.url}
              fieldType={'text'}
              width="w-full"
              loading={loading}
              onSave={(url) => handleUpdateBrand(gmcBrand.id, { url })}
            />
          </div>
          <div className="flex h-full w-2/5 flex-col items-center justify-between">
            <EditableTextArea
              title="DXN"
              initialValue={gmcBrand.description}
              width="w-full"
              onSave={(description) =>
                handleUpdateBrand(gmcBrand.id, { description })
              }
            />
            <div className="flex h-9 justify-end">
              <ConfirmableButton
                onConfirm={() => handleDeleteBrand(gmcBrand.id)}
                title={
                  <>
                    <img className="h-4 pr-2.5" src={DeleteIcon} alt="delete" />
                    <span>Delete</span>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex aspect-4/3 h-full w-1/5 items-center justify-center p-8">
        <FramedButton
          onClick={() => handleMerchantBrandsClick(gmcBrand.id)}
          disabled={gmcBrand.merchantBrand === null}
          title="Merchant Brands"
          count={gmcBrand.merchantBrand ? 1 : 0}
        />
      </div>
    </div>
  );
};

export default GmcBrandListItem;
