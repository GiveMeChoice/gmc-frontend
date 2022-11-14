import {
  CMS_NAME,
  Container,
  getClient,
  Header,
  Layout,
  MoreStories,
  overlayDrafts,
  PostBody,
  PostHeader,
  postQuery,
  postSlugsQuery,
  PostTitle,
  sanityClient,
  SectionSeparator,
  urlForImage,
  usePreviewSubscription,
} from 'blog';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Post({ data, preview }) {
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
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
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

export async function getStaticProps({ params, preview = false }) {
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

export async function getStaticPaths() {
  console.log(`%%%%%%%%%%%%%% GETTING STATIC PATHS %%%%%%%%%%%%%%%%%`);
  const paths = await sanityClient.fetch(postSlugsQuery(false));
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}
