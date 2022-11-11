import Head from 'next/head';

export default function Post({ allPosts: initialAllPosts, preview }) {
  return (
    <div>
      <Head>
        <title>Give Me Choice - Blog</title>
      </Head>
      <div>
        <h1>This is a post </h1>
      </div>
    </div>
  );
}
