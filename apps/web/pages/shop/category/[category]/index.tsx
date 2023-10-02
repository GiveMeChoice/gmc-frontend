import { GetStaticProps } from 'next';
import ShopCategoryContent from '../../../../components/ShopCategoryPage/ShopCategoryContent';

interface CategoryPageProps {
  category: string;
  somethingElse: string;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  return (
    <section className="mt-[46px]">
      <ShopCategoryContent category={category as string} />
    </section>
  );
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async (
  context
) => {
  console.log('***** RE-RENDERING CATEGORY ' + context.params.category);
  return {
    props: {
      category: context.params.category as string,
      somethingElse: 'okay',
    },
    revalidate: 3600,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
