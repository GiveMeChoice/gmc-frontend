import axios from 'axios';
import { IGmcCategory } from 'gmc-types';
import { GetStaticProps } from 'next';
import ShopCategoryContent from '../../../components/Shop/ShopCategoryContent';
import { IEntityPageData } from '../../../lib/types';

export default function CategoryPage(pageData: IEntityPageData) {
  return (
    <section className="mt-[70px]">
      <ShopCategoryContent pageData={pageData} />
    </section>
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
