import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ListPagingHeader from '../SearchPage/ListPagingHeader';
import SearchChoiceBarFilterBox from '../SearchPage/SearchChoiceBar/SearchChoiceBarFilterBox';
import ShopLayout from '../ShopLayout';
import ShopProduct from '../ShopPage/ShopProduct';
import ShopCategoryIntro from './ShopCategoryIntro';
import { ShopCategoryIntroImage } from './ShopCategoryIntro/ShopCategoryIntroImage';
import ShopCategoryList from './ShopCategoryList';
import {
  SearchFunctionFiltersDto,
  SearchFunctionRequestDto,
  SearchFunctionResponseDto,
} from 'gmc-types';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { functions } from '../../lib/firebase';
import SearchChoiceBarFacetList from '../SearchPage/SearchChoiceBar/SearchChoiceBarFacetList';

interface Props {
  category: string;
  subcategory1?: string;
  subcategory2?: string;
  subcategories?: string[];
}

const ShopCategoryContent: React.FC<Props> = ({
  category,
  subcategory1,
  subcategory2,
}) => {
  const [searchResponse, setSearchResponse] =
    useState<SearchFunctionResponseDto>({
      data: [],
      hits: 0,
    });

  const [executeCallable, executing, error] = useHttpsCallable<
    SearchFunctionRequestDto,
    SearchFunctionResponseDto
  >(functions, 'searchFunction');

  const [activeFilters, setActiveFilters] = useState<SearchFunctionFiltersDto>({
    region: 'UK',
    category: {
      value: category,
    },
    labels: [],
  });

  const handleSearch = async () => {
    let result = await executeCallable({
      filters: activeFilters,
      page: 0,
      pageSize: 10,
    });
    setSearchResponse(result.data);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  let color = '#aa7ab2';
  if (category) {
    if (category.toLowerCase().includes('apparel')) color = '#6e79aa';
    if (category.toLowerCase().includes('bath')) color = '#adbe00';
    if (category.toLowerCase().includes('baby')) color = '#dcb586';
    if (category.toLowerCase().includes('pet')) color = '#f8ff93';
  }

  const router = useRouter();
  console.log(router.query.category);

  return (
    <ShopLayout>
      <div className="flex w-1/3 flex-col xl:w-[21%]">
        <ShopCategoryList />
        <SearchChoiceBarFilterBox
          compareModeOn={false}
          filters={activeFilters}
          onFilterChange={null}
        />
        {searchResponse && searchResponse.facets && (
          <SearchChoiceBarFacetList
            facets={searchResponse.facets}
            activeFilters={{ labels: [] }}
            onFilterChange={setActiveFilters}
          />
        )}
      </div>
      <div className="flex w-2/3 flex-col items-center xl:w-[79%]">
        <div className="flex w-full divide-x-1.5 divide-zinc-700 bg-secondary">
          <div className="flex h-full w-full items-center justify-center xl:w-2/3">
            <ShopCategoryIntro
              category={category}
              subcategory1={subcategory1}
              subcategory2={subcategory2}
              color={color}
              description="A Category of Products Dedicated to Friends, Lovers, and Spreaders of Eagles"
              subcategories={[
                'subcats & supercats',
                'subcat2 R us',
                'subcat3',
                'subcat4 u my fren',
              ]}
            />
          </div>
          <div className="hidden h-full w-[33%] xl:block">
            <ShopCategoryIntroImage
              image={{
                _type: 'image',
                asset: {
                  _ref: 'image-7fc8eb7108931907c24bef09739c49b1a50b30a8-2500x2500-jpg',
                  _type: 'reference',
                },
              }}
            />
          </div>
          <div className="hidden w-6 xl:block" />
        </div>
        <div className="h-8 w-full border-t-1.5 border-zinc-700"></div>
        <div
          id="search-products"
          className="mb-4 overflow-y-auto overflow-x-hidden"
        >
          {searchResponse.data.length && (
            <>
              <ListPagingHeader
                searchResponse={searchResponse}
                nextPage={() => null}
                prevPage={() => null}
                firstPage={() => null}
                lastPage={() => null}
              />
              <div className="flex flex-wrap items-start justify-start">
                {searchResponse.data &&
                  searchResponse.data.map((product, i) => (
                    <ShopProduct product={product as any} />
                  ))}
              </div>
              <ListPagingHeader
                searchResponse={searchResponse}
                bottom
                nextPage={() => null}
                prevPage={() => null}
                firstPage={() => null}
                lastPage={() => null}
              />
            </>
          )}
        </div>
      </div>
    </ShopLayout>
  );
};

export default ShopCategoryContent;
