import Head from 'next/head';
import Image from 'next/image';
import NewsletterSubscribe from '../components/NewsletterSubscribe';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Give Me Choice</title>
      </Head>
      {/* HERO SECTION */}
      <section id="hero">
        {/* HERO FLEX CONTAINER */}
        <div className="container mx-auto flex flex-col-reverse items-center px-6 md:mb-8 md:mt-4 md:flex-row md:space-x-10 xl:px-36">
          {/* LEFT TEXT ITEM */}
          <div className="mb-16 mt-10 flex flex-col items-center space-y-6 md:mt-0 md:mb-0 md:w-1/2">
            <p className="max-w-md text-center text-4xl md:text-4xl">
              Planet conscious discovery, enabled by trustful curation.
            </p>
            <p className="max-w-md text-center">
              Give Me Choice empowers people to live a planet conscious life,
              bringing together a community that understands the impact of their
              actions on their health, and the health of the planet for future
              generations.
            </p>
            <p className="max-w-md text-center">
              We’re creating a discovery experience to enable planet conscious
              shoppers.{' '}
            </p>
            <strong className="max-w-md text-center text-lg font-bold">
              Subscribe to our newsletter and be amongst the first to know when
              we launch.
            </strong>
            <div className="container  mx-auto flex flex-col items-center justify-center px-6 pt-2 md:flex-row md:space-x-12 xl:pt-6">
              <NewsletterSubscribe />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center rounded-md align-middle shadow-md shadow-gmc-berry md:mt-0">
            <Image
              className="rounded-md"
              src="/img/hologif.gif"
              alt="Hologram"
              width={650}
              height={550}
              objectFit="cover"
              unoptimized
            />
          </div>
        </div>
      </section>
    </>
  );
}
