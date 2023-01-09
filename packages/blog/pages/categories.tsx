import Head from 'next/head';
import CategoryList from '../components/categoryList';
import { Container } from '../components/container';
import { Intro } from '../components/intro';
import { Layout } from '../components/layout';
import Menu from '../components/menu';
import { allCategoriesQuery, indexQuery } from '../lib/queries';
import { usePreviewSubscription } from '../lib/sanity';
import { getClient, overlayDrafts } from '../lib/sanity.server';

export function CategoriesPage({ categories, preview }: any) {
  const { data: allCategories } = usePreviewSubscription(indexQuery(preview), {
    initialData: categories,
    enabled: preview,
  });
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Blog | Give Me Choice</title>
        </Head>
        <Container>
          <Menu />
          <Intro title="Tags" />
          {allCategories.length > 0 && (
            <CategoryList categories={allCategories} />
          )}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticPropsCategories({ preview = false }) {
  const client = getClient(preview);
  const rawCategories = await client.fetch(allCategoriesQuery(preview));
  const categories = overlayDrafts(rawCategories);
  return {
    props: {
      categories,
      preview,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}
