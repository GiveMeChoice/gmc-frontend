import {
  CategoryPage,
  getStaticPathsCategoryPosts,
  getStaticPropsCategoryPosts,
} from 'blog';

export default CategoryPage;
export const getStaticProps = getStaticPropsCategoryPosts;
export const getStaticPaths = getStaticPathsCategoryPosts;
