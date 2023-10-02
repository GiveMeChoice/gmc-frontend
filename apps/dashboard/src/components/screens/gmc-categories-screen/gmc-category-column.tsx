/* eslint-disable @next/next/no-img-element */
import ConfirmableButton from '@root/components/shared/confirmable-button';
import EditableField from '@root/components/shared/editable-field';
import {
  IGmcCategory,
  gmcCategoriesService,
} from '@root/services/gmc-categories.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import CreateGmcCategoryDialog from './create-gmc-category-dialog';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import { toastService } from '@root/services/toast.service';
import FramedButton from '@root/components/shared/framed-button';
import {
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useNavigate } from 'react-router-dom';
import merchantCategoriesService from '@root/services/merchant-categories.service';
const RightArrowIcon = require('../../../assets/images/right-arrow.svg');
const DeleteIcon = require('../../../assets/images/delete-icon.svg');

interface Props {
  categories: IGmcCategory[];
  superParent?: IGmcCategory;
  parent?: IGmcCategory;
  selected?: IGmcCategory;
  onSelectCategory?: (category: IGmcCategory) => void;
}

const GmcCategoryColumn: React.FC<Props> = ({
  categories: initialCategories,
  superParent,
  parent,
  selected,
  onSelectCategory,
}) => {
  useEffect(() => {
    setCategories(initialCategories);
  }, []);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();

  const handleSelectSubcategory = (category) => {
    if (!selected || selected.id !== category.id) {
      onSelectCategory(category);
    }
  };

  const handleAfterCategoryCreated = (category) => {
    const updated = [category, ...categories];
    setCategories(updated);
  };

  const handleUpdateCategory = (id, updates) => {
    setLoading(true);
    gmcCategoriesService
      .update(id, updates)
      .then((updated) => {
        setCategories(categories.map((cat) => (cat.id === id ? updated : cat)));
        toastService.setToast(
          {
            level: 'SUCCESS',
            message: 'Category Updated Successfully',
          },
          dispatch
        );
      })
      .catch((e) => {
        toastService.setToast(
          { level: 'ERROR', message: formatErrorMessage(e) },
          dispatch
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteCategory = async (id) => {
    gmcCategoriesService
      .deleteOne(id)
      .then(() => {
        setCategories(categories.filter((cat) => cat.id !== id));
        toastService.setToast(
          {
            level: 'SUCCESS',
            message: 'Category Deleted Successfully',
          },
          dispatch
        );
      })
      .catch((e) => {
        toastService.setToast(
          { level: 'ERROR', message: formatErrorMessage(e) },
          dispatch
        );
      })
      .finally(() => {});
  };

  const handleMerchantCategoriesClick = (gmcCategoryId: string) => {
    filtersDispatch({
      type: 'FILTERS_SAVE',
      value: { ...initialFilters, gmcCategoryId },
    });
    navigate(merchantCategoriesService.categoriesScreenControl.pathname);
  };

  return (
    <div className="flex w-full flex-col divide-y-1.5 divide-zinc-900">
      {parent && (
        <CreateGmcCategoryDialog
          superParent={superParent}
          parent={parent}
          onCreated={handleAfterCategoryCreated}
        />
      )}
      {categories && categories.length > 0 ? (
        categories.map((cat) => (
          <div
            className={cn('flex w-full divide-x-1.5 divide-zinc-400', {
              'bg-gmc-berry-light-50': selected && selected.id === cat.id,
              'h-36': !parent,
              'h-44': parent,
            })}
          >
            <div className="flex w-full flex-col justify-evenly px-5">
              <span className="text-lg font-bold">
                {cat.name.toUpperCase()}
              </span>
              <span className="pb-1 pl-1 text-xs italic text-zinc-700">
                /shop/category/{superParent ? superParent.slug + '/' : ''}
                {parent ? parent.slug + '/' : ''}
                {cat.slug.toLowerCase()}
              </span>
              <div className="flex flex-col pl-4">
                <EditableField
                  title="NAME"
                  initialValue={cat.name}
                  fieldType={'text'}
                  width="w-full"
                  disabled={!parent || !superParent}
                  loading={loading}
                  onSave={(name) => handleUpdateCategory(cat.id, { name })}
                />
                <EditableField
                  title="SLUG"
                  initialValue={cat.slug}
                  disabled={!parent || !superParent}
                  fieldType={'text'}
                  width="w-full"
                  loading={loading}
                  onSave={(slug) => handleUpdateCategory(cat.id, { slug })}
                />
              </div>
              {parent && (
                <div className="flex h-7 w-full justify-start pl-0.5">
                  <ConfirmableButton
                    onConfirm={() => handleDeleteCategory(cat.id)}
                    title={
                      <>
                        <img
                          className="h-4 pr-2.5"
                          src={DeleteIcon}
                          alt="delete"
                        />
                        <span className="text-sm">Delete</span>
                      </>
                    }
                  />
                </div>
              )}
            </div>
            {onSelectCategory ? (
              <div
                className={cn('flex w-[25%] items-center justify-center', {
                  'cursor-pointer hover:bg-primary active:bg-primary-light-10 ':
                    !selected || selected.id !== cat.id,
                })}
                onClick={() => handleSelectSubcategory(cat)}
              >
                <img className="w-[35%]" src={RightArrowIcon} alt="arrow" />
              </div>
            ) : (
              <div className={cn('flex w-[25%] items-center justify-center')}>
                <FramedButton
                  onClick={() => handleMerchantCategoriesClick(cat.id)}
                  title="Merchant Categories"
                  count={
                    !cat.merchantCategories ? 0 : cat.merchantCategories.length
                  }
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="w-full py-12 text-center">No Categories Configured</div>
      )}
      <div className=""></div>
    </div>
  );
};

export default GmcCategoryColumn;

export async function asyncDelay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
