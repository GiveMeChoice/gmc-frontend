import Head from 'next/head';
import { useRouter } from 'next/router';
import readingTime from 'reading-time';
import { Avatar } from '../components/avatar';
import { CoverImage } from '../components/cover-image';
import { Layout } from '../components/layout';
import { PostBody } from '../components/post-body';
import PostSocialShare from '../components/post-social-share';
import { PostSuggestions } from '../components/post-suggestions';
import { PostTitle } from '../components/post-title';
import { postQuery, postSlugsQuery } from '../lib/queries';
import { urlForImage, usePreviewSubscription } from '../lib/sanity';
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server';

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
      <div className="flex w-full flex-col items-center">
        <div className="mb-10 max-w-[1300px] p-10">
          <div className="mt-12 flex flex-col">
            <div className="ml-1 mb-2 w-fit cursor-pointer bg-black p-1.5 px-2 text-sm text-white hover:bg-gmc-sunset hover:text-black">
              {post.categories[0].title.toUpperCase()}
            </div>
            <hr className="border-accent-2 mt-1 h-0.5 w-full border-black bg-black" />
          </div>
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
                <PostTitle title={post.title} subtitle="" />
                <div className="mb-8 w-4/5">
                  <h4 className="ml-2text-center mb-8 text-lg text-gray-600 sm:text-xl md:text-left md:text-2xl">
                    {post.excerpt.substring(0, 140)}
                  </h4>
                </div>
                <div className="mt-8 mb-4 flex w-3/4 flex-col gap-y-4 divide-y-1.5 divide-secondary-dark-10 pr-1.5">
                  <div className="flex w-full items-end justify-between px-1.5 pb-2">
                    {post.author && (
                      <Avatar
                        big
                        name={post.author.name}
                        picture={post.author.picture}
                      />
                    )}
                    <span className="text-lg text-secondary-dark-50">
                      {post.readingTime.text}
                    </span>
                  </div>
                  <div className="flex w-full justify-start px-1.5 pt-4">
                    <PostSocialShare title={post.title} />
                  </div>
                </div>
                <div className="divide--1.5 flex w-full divide-secondary-dark-10">
                  <div className="flex w-3/4 flex-col">
                    <CoverImage
                      title={post.title}
                      image={post.coverImage}
                      priority
                    />
                    <div className="border--1.5 border-secondary-dark-10 pl-4 pr-10">
                      <PostBody content={post.content} />
                    </div>
                  </div>
                  <div className="divide--1.5 flex w-1/4 flex-col items-center gap-y-4 divide-secondary-dark-10 pl-8 pt-20">
                    <h3 className="w-full text-center text-4xl font-bold text-zinc-900">
                      RELATED
                    </h3>
                    <div className="aspect-square w-full border-1.5">post</div>
                    <div className="aspect-square w-full border-1.5">post</div>
                    <div className="aspect-square w-full border-1.5 bg-secondary">
                      ad
                    </div>
                    <div className="aspect-square w-full border-1.5">post</div>
                  </div>
                </div>
              </article>
            </>
          )}
        </div>
        {morePosts.length > 0 && (
          <>
            <div className="w-full border-t-1.5 border-secondary-dark-10 bg-secondary pt-5 pb-7 pl-14 text-5xl font-bold text-black">
              <span className="w-fit text-end">
                DISCOVER <br /> MORE
              </span>
            </div>
            <PostSuggestions posts={morePosts} />
          </>
        )}
      </div>
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
        morePosts: overlayDrafts(morePosts).slice(0, 6),
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
