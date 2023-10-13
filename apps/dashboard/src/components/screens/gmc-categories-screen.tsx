import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import { gmcCategoriesService } from '@root/services/gmc-categories.service';
import React from 'react';
import LoadingWheel from '../shared/loading-wheel';
import GmcCategoryColumn from './gmc-categories-screen/gmc-category-column';
import ScreenSection from './shared/screen-section';
import { IGmcCategory } from 'gmc-types';

const GmcCategoriesScreen: React.FC = () => {
  const data = useScreenData();
  const dispach = useScreenDataDispatch();

  const handleSelectCategory = (category: IGmcCategory) => {
    dispach({
      type: 'SCREEN_UPDATE_GMC_CATEGORIES',
      value: {
        ...data.gmcCategoryScreenData,
        selectedCategory: category,
        selectedSubCategory1: null,
        subCategories1: null,
        subCategories2: null,
      },
    });
    gmcCategoriesService.getOne(category.id).then((category) => {
      dispach({
        type: 'SCREEN_UPDATE_GMC_CATEGORIES',
        value: {
          ...data.gmcCategoryScreenData,
          selectedCategory: category,
          selectedSubCategory1: null,
          subCategories1: category.children.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
          subCategories2: null,
        },
      });
    });
  };

  const handleSelectSubCategory1 = (subCategory) => {
    dispach({
      type: 'SCREEN_UPDATE_GMC_CATEGORIES',
      value: {
        ...data.gmcCategoryScreenData,
        selectedSubCategory1: subCategory,
        subCategories2: null,
      },
    });
    gmcCategoriesService.getOne(subCategory.id).then((category) => {
      dispach({
        type: 'SCREEN_UPDATE_GMC_CATEGORIES',
        value: {
          ...data.gmcCategoryScreenData,
          selectedSubCategory1: subCategory,
          subCategories2: category.children.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        },
      });
    });
  };

  return (
    <ScreenSection title={'GMC Categories'} sortFields={[]} meta={null}>
      <div className="flex h-full w-full divide-x-1.5 divide-zinc-900">
        <div className="flex w-1/3 justify-center">
          {data.gmcCategoryScreenData.categories ? (
            <GmcCategoryColumn
              selected={data.gmcCategoryScreenData.selectedCategory}
              categories={data.gmcCategoryScreenData.categories}
              onSelectCategory={handleSelectCategory}
            />
          ) : (
            <div className="flex h-screen w-full items-center justify-center">
              <LoadingWheel size="h-[64px]" />
            </div>
          )}
        </div>
        <div className="w-1/3">
          {data.gmcCategoryScreenData.selectedCategory &&
            (data.gmcCategoryScreenData.subCategories1 ? (
              <GmcCategoryColumn
                parent={data.gmcCategoryScreenData.selectedCategory}
                categories={data.gmcCategoryScreenData.subCategories1}
                selected={data.gmcCategoryScreenData.selectedSubCategory1}
                onSelectCategory={handleSelectSubCategory1}
              />
            ) : (
              <div className="flex h-screen w-full items-center justify-center">
                <LoadingWheel size="h-[64px]" />
              </div>
            ))}
        </div>
        <div className="w-1/3">
          {data.gmcCategoryScreenData.selectedSubCategory1 &&
            (data.gmcCategoryScreenData.subCategories2 ? (
              <GmcCategoryColumn
                superParent={data.gmcCategoryScreenData.selectedCategory}
                parent={data.gmcCategoryScreenData.selectedSubCategory1}
                categories={data.gmcCategoryScreenData.subCategories2}
              />
            ) : (
              <div className="flex h-screen w-full items-center justify-center">
                <LoadingWheel size="h-[64px]" />
              </div>
            ))}
        </div>
      </div>
    </ScreenSection>
  );
};

export default GmcCategoriesScreen;
