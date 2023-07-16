import {
  CategoryPostsPage,
  getStaticPathsCategoryPosts,
  getStaticPropsCategoryPosts,
} from 'blog';

export default CategoryPostsPage;
export const getStaticProps = getStaticPropsCategoryPosts;
export const getStaticPaths = getStaticPathsCategoryPosts;
