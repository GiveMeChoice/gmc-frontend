import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found | Give Me Choice</title>
      </Head>
      <section id="about">
        {/* CONTAINER */}
        <div className="container mx-auto mb-12 mt-8 flex flex-col items-center justify-center px-6 md:flex-row md:space-x-10 xl:px-36">
          <div className="container mx-auto my-6 flex-col justify-center">
            <h3 className="text-center text-4xl font-bold">Page Not Found</h3>
            <h1 className="text-center text-9xl font-bold">404</h1>
            <div className="mt-6 flex-col items-center justify-center">
              <h1 className="text-center text-3xl font-bold">
                Lost? <span className="text-black">Check out our blog →</span>
              </h1>
              <div className="flex justify-center p-3">
                <Link className="text-bold" href="/blog">
                  <span className="inline-block rounded-md border-2 border-black bg-black px-2.5 pt-0.5 pb-1.5 text-xl tracking-normal text-white hover:cursor-pointer hover:text-primary ">
                    Stuff we love.
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
