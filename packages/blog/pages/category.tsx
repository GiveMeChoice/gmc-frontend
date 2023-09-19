import Head from 'next/head';
import Link from 'next/link';
import { HeroPost } from '../components/HeroPost';
import { PageContainer } from '../components/PageContainer';
import { Layout } from '../components/layout';
import Menu from '../components/menu';

import CategoryPageIntro from '../components/CategoryPage/CategoryPageIntro';
import PostList from '../components/PostList';
import { CoverImage } from '../components/cover-image';
import {
  allCategoriesQuery,
  categoryBySlugQuery,
  categoryPostsQuery,
  indexQuery,
} from '../lib/queries';
import { usePreviewSubscription } from '../lib/sanity';
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server';
import { BlogCategory, BlogPost } from '../types';
import { Avatar } from '../components/avatar';
import { SquareImage } from '../components/square-image';

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
            <div
              className="
            mb-11
            divide-y-1.5 divide-zinc-700 border-b-1.5 border-zinc-700"
            >
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                categories={heroPost.categories}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
              <div className="flex h-full w-full divide-x-1.5 divide-zinc-700">
                <div className="group relative w-[60%] cursor-pointer ">
                  <Link
                    href={`/blog/${posts[1].slug}`}
                    aria-label={posts[1].title}
                  >
                    <a href={`/blog/${posts[1].slug}`}>
                      <SquareImage
                        slug={posts[1].slug}
                        title={posts[1].title}
                        image={posts[1].coverImage}
                        priority
                      />
                      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                        <div className="flex w-[80%] flex-col items-center gap-y-4 bg-white bg-opacity-[.75] py-12 px-10 text-center text-[28px] font-bold text-zinc-600 transition-all duration-150 group-hover:text-zinc-800 group-active:text-primary">
                          <h3 style={{ lineHeight: 1.35 }}>{posts[1].title}</h3>
                          <div className="text-black">
                            <Avatar {...posts[2].author} />
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="group relative w-full cursor-pointer">
                  <Link
                    href={`/blog/${posts[1].slug}`}
                    aria-label={posts[1].title}
                  >
                    <a href={`/blog/${posts[1].slug}`}>
                      <CoverImage
                        slug={posts[2].slug}
                        title={posts[2].title}
                        image={posts[2].coverImage}
                        priority
                      />
                      <div className="absolute top-0 left-0 flex h-full w-full items-end justify-center">
                        <div className="flex h-1/2 w-full flex-col items-center justify-center gap-y-5 bg-black bg-opacity-60 px-14 text-center text-[30px] font-bold text-white transition-all duration-100 group-hover:text-zinc-300 group-active:text-primary">
                          <h3 style={{ letterSpacing: 1, lineHeight: 1.4 }}>
                            {posts[2].title}
                          </h3>
                          <div className="text-white">
                            <Avatar {...posts[2].author} />
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full">
            <div className="w-4/5 border-r-1.5 border-zinc-700">
              <div
                style={{ backgroundColor: category.color }}
                className="w-full border-y-1.5 border-zinc-700 bg-secondary text-black"
              >
                <h3
                  style={{ lineHeight: 1.2 }}
                  className="pt-8 pl-12 pb-6 text-[36px] font-bold"
                >
                  DISCOVER <br /> MORE {category.title.toUpperCase()}
                </h3>
              </div>
              {morePosts.length > 0 && <PostList posts={morePosts.slice(2)} />}
            </div>
            <div className="w-1/5 border-r-1.5 border-t-1.5 border-zinc-700 bg-secondary"></div>
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
