import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  const heroUrl =
    'https://media0.giphy.com/media/1EmBoG0IL50VIJLWTs/giphy.gif?cid=ecf05e47hqaxstp1zyjjxsyr51ib7oeq9iqu0hnaz1r23fdt&rid=giphy.gif&ct=g';
  return (
    <>
      <Head>
        <title>Not Found | Give Me Choice</title>
      </Head>
      <section id="about">
        {/* CONTAINER */}
        <div className="container mx-auto mb-12 mt-8 flex flex-col-reverse items-center px-6 md:flex-row md:space-x-10 xl:px-36">
          {/* TEXT BOX */}
          <div className="container mx-auto my-6 flex-col justify-center">
            <h3 className="text-center text-4xl font-bold">Page Not Found</h3>
            <h1 className="text-center text-9xl font-bold">404</h1>
            <div className="mt-6 flex items-center justify-center">
              <h1 className="text-center text-3xl font-bold">
                Lost? <span className="text-black">Check out the →</span>
              </h1>
              <div className="p-3">
                <Link className="text-bold" href="/blog">
                  <span className="inline-block rounded-3xl border-2 border-black bg-white px-2.5 pb-1.5 text-3xl tracking-normal hover:cursor-pointer hover:bg-primary ">
                    blog
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* IMAGE BOX */}
          <div className="mt-8 flex justify-center md:mt-0">
            <Image
              className="rounded-md"
              src={heroUrl}
              alt="Coin"
              loader={() => heroUrl}
              width={1000}
              height={690}
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
