import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { MoreStories } from '../components/more-stories';
import { PostBody } from '../components/post-body';
import { PostHeader } from '../components/post-header';
import { PostTitle } from '../components/post-title';
import { SectionSeparator } from '../components/section-separator';
import { postQuery, postSlugsQuery } from '../lib/queries';
import { urlForImage, usePreviewSubscription } from '../lib/sanity';
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server';

export function PostPage({ data, preview }: any) {
  console.log(`****** This Page ${preview ? 'IS' : 'IS NOT'} in Preview Mode`);
  const router = useRouter();

  const slug = data ? data.post.slug : '';
  const {
    data: { post, morePosts },
  } = usePreviewSubscription<any>(postQuery(preview), {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  });

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title} | Give Me Choice</title>
                {post.coverImage?.asset?._ref && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(post.coverImage)
                      .width(1200)
                      .height(627)
                      .fit('crop')
                      .url()}
                  />
                )}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticPropsPost({ params, preview = false }: any) {
  const { slug } = params;
  console.log(
    `!!!!!!!!!!!!!! Getting Static Props for Slug ${slug} (it is ${
      preview ? '' : 'NOT'
    } a preview) !!!!!!!!!!!1`
  );
  const { post, morePosts } = await getClient(preview).fetch(
    postQuery(preview),
    {
      slug,
    }
  );

  if (!post) return { notFound: true };

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPathsPost() {
  console.log(`%%%%%%%%%%%%%% GETTING STATIC PATHS %%%%%%%%%%%%%%%%%`);
  const paths = await sanityClient.fetch(postSlugsQuery(false));
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}
