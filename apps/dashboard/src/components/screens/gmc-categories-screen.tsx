import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import { gmcCategoriesService } from '@root/services/gmc-categories.service';
import React, { useEffect } from 'react';
import LoadingWheel from '../shared/loading-wheel';
import GmcCategoryColumn from './gmc-categories-screen/gmc-category-column';
import ScreenSection from './shared/screen-section';

const GmcCategoriesScreen: React.FC = () => {
  const data = useScreenData();
  const dispach = useScreenDataDispatch();

  const handleSelectCategory = (categoryId: string) => {
    dispach({
      type: 'SCREEN_UPDATE_GMC_CATEGORIES',
      value: {
        ...data.gmcCategoryScreenData,
        selectedCategoryId: categoryId,
        selectedSubCategory1Id: null,
        subCategories1: null,
        subCategories2: null,
      },
    });
    gmcCategoriesService.getOne(categoryId).then((category) => {
      dispach({
        type: 'SCREEN_UPDATE_GMC_CATEGORIES',
        value: {
          ...data.gmcCategoryScreenData,
          selectedCategoryId: categoryId,
          selectedSubCategory1Id: null,
          subCategories1: category.children.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
          subCategories2: null,
        },
      });
    });
  };

  const handleSelectSubCategory1 = (subCategoryId: string) => {
    dispach({
      type: 'SCREEN_UPDATE_GMC_CATEGORIES',
      value: {
        ...data.gmcCategoryScreenData,
        selectedSubCategory1Id: subCategoryId,
        subCategories2: null,
      },
    });
    gmcCategoriesService.getOne(subCategoryId).then((category) => {
      dispach({
        type: 'SCREEN_UPDATE_GMC_CATEGORIES',
        value: {
          ...data.gmcCategoryScreenData,
          selectedSubCategory1Id: subCategoryId,
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
              categories={data.gmcCategoryScreenData.categories}
              selectedId={data.gmcCategoryScreenData.selectedCategoryId}
              onSelectCategory={handleSelectCategory}
            />
          ) : (
            <div className="flex h-screen w-full items-center justify-center">
              <LoadingWheel size="h-[64px]" />
            </div>
          )}
        </div>
        <div className="w-1/3">
          {data.gmcCategoryScreenData.selectedCategoryId &&
            (data.gmcCategoryScreenData.subCategories1 ? (
              <GmcCategoryColumn
                parentId={data.gmcCategoryScreenData.selectedCategoryId}
                categories={data.gmcCategoryScreenData.subCategories1}
                selectedId={data.gmcCategoryScreenData.selectedSubCategory1Id}
                onSelectCategory={handleSelectSubCategory1}
              />
            ) : (
              <div className="flex h-screen w-full items-center justify-center">
                <LoadingWheel size="h-[64px]" />
              </div>
            ))}
        </div>
        <div className="w-1/3">
          {data.gmcCategoryScreenData.selectedSubCategory1Id &&
            (data.gmcCategoryScreenData.subCategories2 ? (
              <GmcCategoryColumn
                parentId={data.gmcCategoryScreenData.selectedSubCategory1Id}
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
