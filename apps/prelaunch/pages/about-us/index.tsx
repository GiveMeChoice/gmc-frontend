import Head from 'next/head';
import { Button } from 'ui';

export default function Blog({ allPosts: initialAllPosts, preview }) {
  return (
    <div>
      <Head>
        <title>Give Me Choice - About Us</title>
      </Head>
      <div>
        <h1 className="text-3xl">About Us</h1>
        <Button />
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
