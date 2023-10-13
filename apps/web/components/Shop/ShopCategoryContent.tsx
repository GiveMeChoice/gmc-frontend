import React from 'react';
import { IEntityPageData } from '../../lib/types';
import SearchChoiceBarFacetList from '../SearchPage/SearchChoiceBar/SearchChoiceBarFacetList';
import SearchChoiceBarFilterBox from '../SearchPage/SearchChoiceBar/SearchChoiceBarFilterBox';
import { useSearch } from '../SearchProvider';
import ShopEntityList from './ShopEntityList';
import ShopLayout from './ShopLayout';
import ShopChoiceBarContainer from './ShopLayout/ShopChoiceBarContainer';
import ShopContentContainer from './ShopLayout/ShopContentContainer';
import ShopPageIntro from './ShopPageIntro';
import ShopProducts from './ShopProducts';

interface Props {
  pageData: IEntityPageData;
}

const ShopCategoryContent: React.FC<Props> = ({ pageData }) => {
  const search = useSearch();

  return (
    <ShopLayout>
      <ShopChoiceBarContainer>
        <ShopEntityList
          data={pageData}
          title="CATEGORIES"
          basePath="/shop/category/"
        />
        {pageData.entity && (
          <>
            <SearchChoiceBarFilterBox />
            {search.response && search.response.facets && (
              <SearchChoiceBarFacetList />
            )}
          </>
        )}
      </ShopChoiceBarContainer>
      <ShopContentContainer>
        {pageData.entity && (
          <>
            <ShopPageIntro
              entity={pageData.entity}
              color={pageData.pageTree.color}
              basePath="/shop/category/"
            />
            <ShopProducts color={pageData.pageTree.color} />
          </>
        )}
      </ShopContentContainer>
    </ShopLayout>
  );
};

export default ShopCategoryContent;
