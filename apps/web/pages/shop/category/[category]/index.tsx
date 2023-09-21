import { GetStaticProps } from 'next';
import ShopCategoryContent from '../../../../components/ShopCategoryPage/ShopCategoryContent';

export default function CategoryPage({ category }) {
  return (
    <section className="mt-[46px]">
      <ShopCategoryContent category={category as string} />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('***** RE-RENDERING CATEGORY ' + context.params.category);
  return {
    props: {
      category: context.params.category,
    },
    revalidate: 3600,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
