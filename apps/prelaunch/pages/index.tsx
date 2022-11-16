import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const heroUrl =
    'https://media4.giphy.com/media/46flWOF5M6E8IJzPxC/giphy.gif?cid=ecf05e479mzxddhd5qyf22dcecgah19x8z85yf5semumlikr&rid=giphy.gif&ct=g';
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
          <div className="mb-16 mt-10 flex flex-col items-center space-y-6 md:mb-0 md:w-1/2">
            <p className="max-w-md text-center text-4xl md:text-left md:text-4xl">
              Planet conscious discovery, enabled by trustful curation.
            </p>
            <p className="max-w-md text-center md:text-left">
              Please enter your email address below to subscribe to our
              newsletter and we will invite you to test our new website when
              it&apos;s ready!*
            </p>
            <p className="max-w-md text-center text-xs text-secondary-dark-50 md:text-left ">
              *(should be around Q1 2023 but don&apos;t hold your breath...)
            </p>
          </div>
          <div className="mt-8 flex justify-center md:mt-0">
            <Image
              className="rounded-md"
              src={heroUrl}
              alt="Coin"
              loader={() => heroUrl}
              width={750}
              height={550}
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="mb-10 border-t-2 border-b-2 border-black bg-gmc-surf"
      >
        {/* CTA FLEX CONTAINER */}
        <div className="container mx-auto flex flex-col items-center justify-center px-6 py-10 md:flex-row md:space-x-12">
          <div className="flex flex-wrap justify-center space-y-2 sm:space-y-0 ">
            <input
              className="mr-1 rounded-md border-2 border-black p-2"
              type="email"
              id="email"
              pattern=".+@.+\.com"
              size={30}
              required
              placeholder="Give Me Updates..."
              onSubmit={() => alert('sub-text')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  alert('sub-test');
                }
              }}
            />
            <button className="rounded-md  border-2 border-white bg-black p-2.5 px-5 text-white duration-100 hover:text-primary active:scale-105 ">
              SIGN-UP
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
