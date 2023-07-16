import { getStaticPathsPost, getStaticPropsPost, PostPage } from 'blog';

export default PostPage;
export const getStaticProps = getStaticPropsPost;
export const getStaticPaths = getStaticPathsPost;
