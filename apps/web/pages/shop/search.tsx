import cn from 'classnames';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CompareProduct from '../../components/SearchPage/CompareProduct';
import ListPagingHeader from '../../components/SearchPage/ListPagingHeader';
import SearchChoiceBar from '../../components/SearchPage/SearchChoiceBar';
import SearchLoadingScreen from '../../components/SearchPage/SearchLoadingScreen';
import SearchMarquee from '../../components/SearchPage/SearchMarquee';
import { useSearch } from '../../components/SearchProvider';
import ShopLayout from '../../components/Shop/ShopLayout';
import ShopChoiceBarContainer from '../../components/Shop/ShopLayout/ShopChoiceBarContainer';
import ShopContentContainer from '../../components/Shop/ShopLayout/ShopContentContainer';
import ShopProduct from '../../components/Shop/ShopProduct';

export default function Search({ props }) {
  const search = useSearch();
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
  }, [search.loading]);

  return (
    <>
      <Head>
        <title>Search | Give Me Choice</title>
      </Head>
      <ShopLayout>
        <ShopChoiceBarContainer>
          <SearchChoiceBar />
        </ShopChoiceBarContainer>

        <ShopContentContainer>
          {search.loading ? (
            <SearchLoadingScreen />
          ) : (
            <div
              id="search-products"
              className="relative flex h-full  min-h-screen w-full flex-col justify-between overflow-x-hidden overflow-y-hidden bg-secondary"
            >
              <div
                className={cn({
                  hidden: compareModeOn,
                })}
              >
                <div>
                  <ListPagingHeader bottom noTop />
                  <div className="flex flex-wrap items-start justify-start pb-8">
                    {search.response.data.map((product, i) => (
                      <ShopProduct
                        index={i}
                        // onClick={addCompareMode}
                        product={product}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={cn('relative transition-all duration-300', {
                  'top-0 h-full': compareModeOn,
                  'top-full h-0': !compareModeOn,
                })}
              >
                <CompareProduct
                  product={
                    search.response.data[
                      compareProductIndex % search.response.pageSize
                    ]
                  }
                  index={compareProductIndex}
                  isFirst={compareProductIndex % search.response.pageSize === 0}
                  isLast={
                    (compareProductIndex % search.response.pageSize) + 1 ===
                    search.response.data.length
                  }
                  nextProduct={() => addCompareMode(compareProductIndex + 1)}
                  prevProduct={() => addCompareMode(compareProductIndex - 1)}
                  closeCompareMode={removeCompareMode}
                />
              </div>
              <ListPagingHeader />
            </div>
          )}
        </ShopContentContainer>
      </ShopLayout>
      {!search.loading && <SearchMarquee />}
    </>
  );
}
