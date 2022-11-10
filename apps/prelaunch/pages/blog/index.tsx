import Head from 'next/head';
import { Button } from 'ui';
import { Alert, queries } from 'blog';

export default function Blog({ allPosts: initialAllPosts, preview }) {
  const hmm = queries.hmm;

  return (
    <div>
      <Head>
        <title>Give Me Choice - Blog</title>
      </Head>
      <div>
        <Alert preview={null}></Alert>
        <h1>This is the blog</h1>
        <Button />
        <h2>{hmm()}</h2>
      </div>
    </div>
  );
}

// export async function getStaticProps({ preview = false }) {
//   const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
//   return {
//     props: { allPosts, preview },
//     // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
//     revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
//   };
// }
