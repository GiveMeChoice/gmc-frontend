import axios from 'axios';
import { IGmcLabel } from 'gmc-types';
import { GetStaticProps } from 'next';
import SearchChoiceBar from '../../../components/Search/SearchChoiceBar';
import ShopEntityList from '../../../components/Shop/ShopEntityList';
import ShopLayout from '../../../components/Shop/ShopLayout';
import ShopContentContainer from '../../../components/Shop/ShopLayout/ShopContentContainer';
import ShopMenuContainer from '../../../components/Shop/ShopLayout/ShopMenuContainer';
import ShopPageIntro from '../../../components/Shop/ShopPageIntro';
import ShopProductList from '../../../components/Shop/ShopProductList';
import { IEntityPageData } from '../../../lib/types';

export default function LabelPage(data: IEntityPageData) {
  return (
    <ShopLayout>
      <ShopMenuContainer>
        <ShopEntityList data={data} title="LABELS" basePath="/shop/label/" />
        {data.entity && <SearchChoiceBar />}
      </ShopMenuContainer>
      <ShopContentContainer>
        {data.entity && (
          <>
            <ShopPageIntro pageData={data} basePath="/shop/label/" />
            <ShopProductList color={data.pageTree.color} />
          </>
        )}
      </ShopContentContainer>
    </ShopLayout>
  );
}

export const getStaticProps: GetStaticProps<IEntityPageData> = async (
  context
) => {
  if (!context.params.labels) {
    try {
      const res = await axios.get<IGmcLabel[]>(
        `${process.env.BACKEND_URL}/gmc-labels`
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
    if (context.params.labels.length > 3) {
      return {
        notFound: true,
      };
    }
    const [slug, subslug1, subslug2] = context.params.labels as string[];
    console.log(
      '***** RE-RENDERING LABEL PAGE ' +
        `
    slug: ${slug}
    subslug1: ${subslug1}
    subslug2: ${subslug2}
  `
    );
    try {
      const res = await axios.get<IEntityPageData>(
        `${process.env.BACKEND_URL}/gmc-labels/page-data/${slug}${
          subslug1 ? `/${subslug1}` + (subslug2 ? `/${subslug2}` : '') : ''
        }`
      );
      return {
        props: res.data,
        revalidate: 3600,
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
