import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next/types';

export default function Blog({ allPosts: initialAllPosts, preview }) {
  return (
    <div>
      <Head>
        <title>Give Me Choice - Blog</title>
      </Head>
      <div>
        <h1>This is the blog</h1>
      </div>
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async ({
//   params,
// }: GetStaticPropsContext<{ slug: string }>) => {
//   // const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
//   return {
//     props: {},
//     // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
//     // revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
//   };
// };
