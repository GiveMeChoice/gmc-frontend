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
import readingTime from 'reading-time';
import Menu from '../components/menu';

export function PostPage({ data, preview }: any) {
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
        <Menu />
        {router.isFallback ? (
          <PostTitle title={'Loading...'} subtitle={''} />
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
                subtitle={post.subtitle}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                readingTime={post.readingTime}
                categories={post.categories}
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
        post: addReadingTime(post),
        morePosts: overlayDrafts(morePosts).slice(0, 2),
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPathsPost() {
  const paths = await sanityClient.fetch(postSlugsQuery(false));
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

const addReadingTime = (post: any) => {
  let text = '';
  post.content
    .filter((item: any) => item._type === 'block')
    .forEach((block: any) => {
      block.children.forEach((child: any) => {
        text += ` ${child.text} `;
      });
    });
  post.readingTime = readingTime(text.replace(/\s+/g, ' '));
  return post;
};
