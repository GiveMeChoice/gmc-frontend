import Head from 'next/head';
import { useEffect, useState } from 'react';
import SearchMarquee from '../../components/Common/SearchMarquee';
import { useShop } from '../../components/Context/ShopProvider';
import SearchChoiceBar from '../../components/Search/SearchChoiceBar';
import ShopLayout from '../../components/Shop/ShopLayout';
import ShopContentContainer from '../../components/Shop/ShopLayout/ShopContentContainer';
import ShopMenuContainer from '../../components/Shop/ShopLayout/ShopMenuContainer';
import ShopProductList from '../../components/Shop/ShopProductList';
import SearchChoiceBarFacetList from '../../components/Search/SearchChoiceBar/SearchChoiceBarFacetList';
import SearchChoiceBarFilterBox from '../../components/Search/SearchChoiceBar/SearchChoiceBarFilterBox';
import ChoiceBarSummarySortSwitch from '../../components/Search/SearchChoiceBar/SearchChoiceBarSummary/ChoiceBarSummarySortSwitch';
import MobileChoiceBar from '../../components/Search/MobileChoiceBar';

export default function Search({ props }) {
  const shop = useShop();

  useEffect(() => {
    history.scrollRestoration = 'manual';
  }, [shop.searching]);

  return (
    <>
      <Head>
        <title>Search | Give Me Choice</title>
      </Head>

      <ShopLayout>
        <ShopMenuContainer>
          <SearchChoiceBar summaryOn />
        </ShopMenuContainer>

        <ShopContentContainer>
          <div className="flex w-full flex-grow flex-col">
            <MobileChoiceBar />
            <ShopProductList color="#f0f0f5" />
          </div>
        </ShopContentContainer>
      </ShopLayout>
      {!shop.searching && <SearchMarquee />}
    </>
  );
}
