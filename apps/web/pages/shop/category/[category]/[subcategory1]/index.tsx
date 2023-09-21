import { GetStaticProps } from 'next';
import ShopCategoryContent from '../../../../../components/ShopCategoryPage/ShopCategoryContent';

export default function SubCategory1Page({ category, subcategory1 }) {
  return (
    <section className="mt-[46px]">
      <ShopCategoryContent category={category} subcategory1={subcategory1} />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(
    '***** RE-RENDERING SUB-CATEGORY 1' + context.params.subcategory1
  );
  return {
    props: {
      category: context.params.category,
      subcategory1: context.params.subcategory1,
    },
    revalidate: 3600,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
