import { IGmcCategory } from 'gmc-types';
import ShopLayout from '../components/Shop/ShopLayout';
import ShopMenuList from '../components/Shop/ShopMenuList';
import ShopMenuListItem from '../components/Shop/ShopMenuListItem';
import { GetStaticProps } from 'next';
import axios from 'axios';

interface IPageData {
  categories: IGmcCategory[];
  labels: IGmcCategory[];
}

export default function ShopPage({ categories, labels }: IPageData) {
  return (
    <section className="mt-[46px]">
      <ShopLayout>
        <div className="m-1 w-1/3 xl:w-1/4">
          <ShopMenuList title="SHOP BY CATEGORY">
            {categories
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <ShopMenuListItem
                  title={category.name.toUpperCase()}
                  color={category.color}
                  path={`/shop/category/${category.slug}`}
                />
              ))}
          </ShopMenuList>
          <ShopMenuList title="SHOP BY LABEL">
            {labels
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((label) => (
                <ShopMenuListItem
                  title={label.name.toUpperCase()}
                  color={label.color}
                  path={`/shop/label/${label.slug}`}
                />
              ))}
          </ShopMenuList>
        </div>
        <div className="flex w-2/3 flex-col items-center xl:w-3/4">
          <div className="mt-32 w-2/3">IMAGES, FEATURES, ADS, ETC...</div>
        </div>
      </ShopLayout>
    </section>
  );
}

export const getStaticProps: GetStaticProps<IPageData> = async (context) => {
  const catResponse = await axios.get(
    `${process.env.BACKEND_URL}/gmc-categories`
  );
  const labResponse = await axios.get(`${process.env.BACKEND_URL}/gmc-labels`);
  return {
    props: {
      categories: catResponse.data,
      labels: labResponse.data,
    },
  };
};
