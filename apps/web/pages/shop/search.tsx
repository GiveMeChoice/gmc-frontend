import Head from 'next/head';
import { useEffect, useState } from 'react';
import SearchMarquee from '../../components/Common/SearchMarquee';
import { useShop } from '../../components/Context/ShopProvider';
import SearchChoiceBar from '../../components/Search/SearchChoiceBar';
import ShopLayout from '../../components/Shop/ShopLayout';
import ShopContentContainer from '../../components/Shop/ShopLayout/ShopContentContainer';
import ShopMenuContainer from '../../components/Shop/ShopLayout/ShopMenuContainer';
import ShopProductList from '../../components/Shop/ShopProductList';

export default function Search({ props }) {
  const shop = useShop();
  const [compareModeOn, setCompareModeOn] = useState(false);
  const [compareProductIndex, setCompareProductIndex] = useState(null);

  const addCompareMode = (index: number) => {
    setCompareProductIndex(index);
    setCompareModeOn(true);
    scrollTo(0, 0);
  };

  const removeCompareMode = () => {
    setCompareProductIndex(0);
    setCompareModeOn(false);
  };

  useEffect(() => {
    setCompareModeOn(false);
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
          <ShopProductList color="#56e2b3" />
        </ShopContentContainer>
      </ShopLayout>
      {!shop.searching && <SearchMarquee />}
    </>
  );
}
