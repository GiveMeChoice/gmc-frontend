import { IGmcCategory } from 'gmc-types';
import ShopLayout from '../../components/Shop/ShopLayout';
import ShopMenuList from '../../components/Shop/ShopHome/ShopMenuList';
import ShopMenuListItem from '../../components/Shop/ShopHome/ShopMenuListItem';
import { GetStaticProps } from 'next';
import axios from 'axios';
import ShopMenuContainer from '../../components/Shop/ShopLayout/ShopMenuContainer';
import ShopContentContainer from '../../components/Shop/ShopLayout/ShopContentContainer';

interface IPageData {
  categories: IGmcCategory[];
  labels: IGmcCategory[];
}

export default function ShopPage({ categories, labels }: IPageData) {
  return (
    <ShopLayout>
      <ShopMenuContainer>
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
      </ShopMenuContainer>
      <ShopContentContainer></ShopContentContainer>
    </ShopLayout>
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
    revalidate: 60,
  };
};
