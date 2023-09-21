import { useRouter } from 'next/router';
import ShopCategoryContent from '../../../../../../components/ShopCategoryPage/ShopCategoryContent';
import { GetStaticProps } from 'next';

export default function SubCategory2Page({
  category,
  subcategory1,
  subcategory2,
}) {
  return (
    <section className="mt-[46px]">
      <ShopCategoryContent
        category={category}
        subcategory1={subcategory1}
        subcategory2={subcategory2}
      />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(
    '***** RE-RENDERING SUB-CATEGORY 2' + context.params.subcategory2
  );
  return {
    props: {
      category: context.params.category,
      subcategory1: context.params.subcategory1,
      subcategory2: context.params.subcategory2,
    },
    revalidate: 3600,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
