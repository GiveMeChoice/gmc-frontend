import Head from 'next/head';
import Link from 'next/link';
import { Avatar } from '../components/avatar';
import { Container } from '../components/container';
import { CoverImage } from '../components/cover-image';
import { HeroPost } from '../components/hero-post';
import { Intro } from '../components/intro';
import { Layout } from '../components/layout';
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
      <Layout preview={preview}>
        <Head>
          <title>Blog | Give Me Choice</title>
        </Head>
        <Container>
          {/* <Intro /> */}
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              categories={heroPost.categories}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          <div className="my-0 w-full border-y-1.5 border-secondary-dark-10">
            <h3 className="pt-8 pl-12 pb-7 text-[34px] font-bold">
              LATEST POSTS
            </h3>
          </div>
          <div className="flex w-full">
            <div className="w-3/4 divide-y-1.5 divide-secondary-dark-10 border-r-1.5 border-secondary-dark-10 bg-white">
              {morePosts.slice(0, 10).map((post: any) => (
                <div className="flex w-full divide-x-1.5 divide-secondary-dark-10">
                  <div className="w-3/5 cursor-pointer">
                    <CoverImage
                      framed
                      slug={post.slug}
                      title={post.title}
                      image={post.coverImage}
                    />
                  </div>
                  <div className="flex w-2/5 flex-grow flex-col justify-center p-6">
                    <div className="mb-2.5 w-fit cursor-pointer bg-black p-1.5 px-2 text-xs text-white hover:bg-primary hover:text-black">
                      {post.categories[0].title.toUpperCase()}
                    </div>
                    <h4 className="cursor-pointer pb-3 text-2xl font-bold hover:text-secondary-dark-50">
                      <Link href={`/blog/${post.slug}`} prefetch={false}>
                        {post.title}
                      </Link>
                    </h4>
                    <p className="mb-4 text-sm leading-relaxed text-zinc-700">
                      {post.excerpt.substring(0, 80)}
                    </p>
                    {post.author && (
                      <Avatar
                        name={post.author.name}
                        picture={post.author.picture}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-1/3 border-r-1.5 border-secondary-dark-10 "></div>
            {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          </div>
        </Container>
      </Layout>
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
