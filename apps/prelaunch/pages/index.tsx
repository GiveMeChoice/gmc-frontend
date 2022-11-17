import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import cn from 'classnames';

export default function Home() {
  const [subscribing, setSubscribing] = useState<boolean>(false);

  const onSubscribe = () => {
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
    }, 2000);
  };

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
        className="mb-10 border-t-2 border-b-2 border-black bg-white"
      >
        {/* CTA FLEX CONTAINER */}
        <div className="container mx-auto flex flex-col items-center justify-center px-6 py-10 md:flex-row md:space-x-12">
          <div className="flex flex-wrap items-center justify-center space-y-3 md:space-x-2 md:space-y-0">
            <input
              className="h-14 rounded-md border-2 border-black p-2 pl-4 text-lg"
              type="email"
              id="email"
              pattern=".+@.+\.com"
              disabled={subscribing}
              size={30}
              required
              placeholder="Give Me Updates..."
              onSubmit={() => alert('sub-text')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubscribe();
                }
              }}
            />
            <button
              onClick={() => onSubscribe()}
              disabled={subscribing}
              className={cn(
                'h-14 w-40 rounded-md border-2 border-white bg-black text-white',
                {
                  'hover:text-primary-dark-10': !subscribing,
                  'border-secondary text-secondary': subscribing,
                }
              )}
            >
              {subscribing ? (
                <>
                  <svg
                    role="status"
                    className="mr-2 inline h-7 w-7 animate-spin fill-gmc-sunset text-gray-200 dark:text-secondary-dark-30"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="">Loading...</span>
                </>
              ) : (
                'SUBSCRIBE'
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
