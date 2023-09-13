import Head from 'next/head';
import { PageContainer } from '../components/PageContainer';
import { Intro } from '../components/intro';
import { Layout } from '../components/layout';
import Menu from '../components/menu';
import { MoreStories } from '../components/more-stories';
import { allPostsQuery, indexQuery } from '../lib/queries';
import { usePreviewSubscription } from '../lib/sanity';
import { getClient, overlayDrafts } from '../lib/sanity.server';

export function AllPostsPage({ allPosts: initialAllPosts, preview }: any) {
  const { data: allPosts } = usePreviewSubscription(indexQuery(preview), {
    initialData: initialAllPosts,
    enabled: preview,
  });
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Blog | Give Me Choice</title>
        </Head>
        <PageContainer>
          <Menu />
          <Intro title="All Posts" />
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </PageContainer>
      </Layout>
    </>
  );
}

export async function getStaticPropsAllPosts({ preview = false }) {
  const client = getClient(preview);
  const rawPosts = await client.fetch(allPostsQuery(preview));
  const allPosts = overlayDrafts(rawPosts);
  return {
    props: {
      allPosts,
      preview,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}
