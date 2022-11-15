import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found | Give Me Choice</title>
      </Head>
      <div className="container mx-auto my-32 flex-col justify-center">
        <h3 className="text-center text-3xl font-bold">Page Not Found</h3>
        <h1 className="text-center text-9xl font-bold">404</h1>
        <div className="flex items-center justify-center">
          <h1 className="text-center text-xl font-bold">
            Lost? Check out the →{' '}
          </h1>
          <div className="p-3">
            <Link className="text-bold" href="/blog">
              <span className="inline-block rounded-md border-2 border-black px-2 pb-1 text-2xl tracking-normal hover:cursor-pointer ">
                Bl<span className="text-primary-dark-10">o</span>g.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
