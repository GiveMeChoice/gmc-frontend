import Head from 'next/head';
import { PageContainer } from '../components/PageContainer';
import { HeroPost } from '../components/hero-post';
import { Intro } from '../components/intro';
import { Layout } from '../components/layout';
import Menu from '../components/menu';
import { MoreStories } from '../components/more-stories';
import {
  allCategoriesQuery,
  categoryBySlugQuery,
  categoryPostsQuery,
  indexQuery,
} from '../lib/queries';
import { usePreviewSubscription } from '../lib/sanity';
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server';
import { BlogCategory, BlogPost } from '../types';
import CategoryPageIntro from '../components/CategoryPage/CategoryPageIntro';

interface CategoryPostPageProps {
  category: BlogCategory;
  categoryPosts: BlogPost[];
  preview: boolean;
}

export function CategoryPage({
  category,
  categoryPosts,
  preview,
}: CategoryPostPageProps) {
  const { data: posts } = usePreviewSubscription(indexQuery(preview), {
    initialData: categoryPosts,
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
          <CategoryPageIntro category={category} />
          {/* <Intro
            title={`Tag: "${category.title}"`}
            subtitle={category.description}
          /> */}
          {posts.length > 0 && <MoreStories posts={posts} />}
        </PageContainer>
      </Layout>
    </>
  );
}

export async function getStaticPathsCategoryPosts() {
  const categories = await sanityClient.fetch(allCategoriesQuery(false));
  return {
    paths: categories.map((category: any) => ({
      params: { slug: category.slug },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticPropsCategoryPosts({
  params,
  preview = false,
}: any) {
  const { slug } = params;
  const client = getClient(preview);
  const category = (await client.fetch(categoryBySlugQuery(slug)))[0];
  const rawPosts = await client.fetch(
    categoryPostsQuery(category._id, preview)
  );
  const categoryPosts = overlayDrafts(rawPosts);
  return {
    props: {
      category,
      categoryPosts,
      preview,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}
