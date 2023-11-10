import Head from 'next/head';
import { HeroPost } from '../components/HeroPost';
import { PageContainer } from '../components/PageContainer';
import PostList from '../components/PostList';
import { BlogLayout } from '../components/blog-layout';
import { indexQuery } from '../lib/queries';
import { usePreviewSubscription } from '../lib/sanity';
import { getClient, overlayDrafts } from '../lib/sanity.server';

export function BlogPage({ allPosts: initialAllPosts, preview }: any) {
  const { data: allPosts } = usePreviewSubscription(indexQuery(preview), {
    initialData: initialAllPosts,
    enabled: preview,
  });
  let [heroPost, ...morePosts] = allPosts || [];

  return (
    <>
      <BlogLayout preview={preview}>
        <Head>
          <title>Blog | Give Me Choice</title>
        </Head>
        <PageContainer>
          {/* <Intro /> */}
          {heroPost && (
            <div className="mt-[46px]">
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
          <div className="my-0 w-full border-y-1.5 border-zinc-700 bg-white text-black">
            <h3 className="pt-8 pl-12 pb-4 text-[40px] font-extrabold">
              LATEST POSTS
            </h3>
          </div>
          <PostList posts={morePosts} />
        </PageContainer>
      </BlogLayout>
    </>
  );
}

export async function getStaticPropsBlog({ preview = false }) {
  const client = getClient(preview);
  const rawPosts = await client.fetch(indexQuery(preview));
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
