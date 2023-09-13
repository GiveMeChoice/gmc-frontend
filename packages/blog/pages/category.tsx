import Head from 'next/head';
import { PageContainer } from '../components/PageContainer';
import { HeroPost } from '../components/HeroPost';
import { Intro } from '../components/intro';
import { Layout } from '../components/layout';
import Menu from '../components/menu';
import { MoreStories } from '../components/MoreStories';
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
import PostList from '../components/PostList';

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
  let [heroPost, ...morePosts] = posts || [];
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Blog | Give Me Choice</title>
        </Head>
        <PageContainer>
          <Menu />
          <CategoryPageIntro category={category} />
          {heroPost && (
            <div className="mb-10 border-y-1.5 border-secondary-dark-10">
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                categories={heroPost.categories}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            </div>
          )}

          <div className="flex w-full">
            <div className="w-2/3 border-r-1.5 border-secondary-dark-10">
              <div
                style={{ backgroundColor: category.color }}
                className="w-full border-y-1.5 border-secondary-dark-10 bg-secondary text-black"
              >
                <h3 className="pt-7 pl-12 pb-4 text-[38px] font-extrabold">
                  DISCOVER {category.title.toUpperCase()}
                </h3>
              </div>
              {morePosts.length > 0 && <PostList posts={morePosts} />}
            </div>
            <div className="w-1/3 border-r-1.5 border-t-1.5 border-secondary-dark-10 bg-secondary"></div>
          </div>
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
