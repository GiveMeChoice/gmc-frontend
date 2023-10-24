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
          <div className="flex w-full flex-grow flex-col">
            <div className="w-full border-b-1.5 border-zinc-700 p-4">
              <span className="pl-1.5 pb-8 text-4xl">
                {shop.response.hits} Results
              </span>
            </div>
            <ShopProductList color="#56e2b3" />
          </div>
        </ShopContentContainer>
      </ShopLayout>
      {!shop.searching && <SearchMarquee />}
    </>
  );
}
