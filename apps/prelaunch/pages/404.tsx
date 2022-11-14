import Head from 'next/head';

export default function NotFound() {
  return (
    <div>
      <Head>
        <title>Give Me Choice - 404</title>
      </Head>
      <div className="text-4xl">{'404: Not Found :('}</div>
    </div>
  );
}
