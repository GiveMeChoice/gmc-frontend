import axios from 'axios';
import { IGmcCategory } from 'gmc-types';
import { GetStaticProps } from 'next';
import SearchChoiceBar from '../../../components/Search/SearchChoiceBar';
import ShopEntityList from '../../../components/Shop/ShopEntityList';
import ShopLayout from '../../../components/Shop/ShopLayout';
import ShopContentContainer from '../../../components/Shop/ShopLayout/ShopContentContainer';
import ShopMenuContainer from '../../../components/Shop/ShopLayout/ShopMenuContainer';
import ShopPageIntro from '../../../components/Shop/ShopPageIntro';
import ShopProductList from '../../../components/Shop/ShopProductList';
import { IEntityPageData } from '../../../lib/types';
import MobileChoiceBar from '../../../components/Search/MobileChoiceBar';

export default function CategoryPage(pageData: IEntityPageData) {
  return (
    <ShopLayout>
      <ShopMenuContainer>
        <ShopEntityList
          data={pageData}
          title="CATEGORIES"
          basePath="/shop/category/"
        />
        {pageData.entity && <SearchChoiceBar />}
      </ShopMenuContainer>
      <ShopContentContainer>
        {pageData.entity ? (
          <>
            <ShopPageIntro pageData={pageData} basePath="/shop/category/" />
            <div className="flex w-full flex-grow flex-col">
              <MobileChoiceBar />
              <ShopProductList color={pageData.pageTree.color} />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full justify-center bg-gmc-surf">
            CATEGORIES HOME
          </div>
        )}
      </ShopContentContainer>
    </ShopLayout>
  );
}

export const getStaticProps: GetStaticProps<IEntityPageData> = async (
  context
) => {
  if (!context.params.categories) {
    try {
      const res = await axios.get<IGmcCategory[]>(
        `${process.env.BACKEND_URL}/gmc-categories`
      );
      return {
        props: {
          roots: res.data,
        } as IEntityPageData,
      };
    } catch (e) {
      console.error(e);
      return {
        notFound: true,
      };
    }
  } else {
    if (context.params.categories.length > 3) {
      return {
        notFound: true,
      };
    }
    const [slug, subslug1, subslug2] = context.params.categories as string[];
    console.log(
      '***** RE-RENDERING CATEGORY PAGE ' +
        `
    slug: ${slug}
    subslug1: ${subslug1}
    subslug2: ${subslug2}
  `
    );
    try {
      const res = await axios.get<IEntityPageData>(
        `${process.env.BACKEND_URL}/gmc-categories/page-data/${slug}${
          subslug1 ? `/${subslug1}` + (subslug2 ? `/${subslug2}` : '') : ''
        }`
      );
      return {
        props: res.data,
        revalidate: 60,
      };
    } catch (e) {
      console.error(e);
      return {
        notFound: true,
      };
    }
  }
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
