import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import cn from 'classnames';

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribing(true);
      setTimeout(() => {
        setSubscribed(true);
        setSubscribing(false);
        setTimeout(() => {
          setSubscribed(false);
          setEmail('');
        }, 2000);
      }, 2000);
    }
  };

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
              Subscribe to our newsletter and be amongst the first to get access
              when we launch.
            </strong>
          </div>
          <div className="mt-8 flex justify-center md:mt-0">
            <Image
              className="rounded-md"
              // src={heroUrl}
              src="/img/hologif.gif"
              alt="Hologram"
              // loader={() => heroUrl}
              width={750}
              height={550}
              objectFit="cover"
              unoptimized
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
          <div
            id="subscribe"
            className="flex flex-wrap items-center justify-center space-y-3 md:space-x-2 md:space-y-0"
          >
            <input
              className={cn(
                'h-14 rounded-md border-2 border-black p-1 pl-5 text-lg'
              )}
              type="email"
              id="email"
              pattern=".+@.+\.com"
              disabled={subscribing || subscribed}
              size={27}
              value={email}
              required
              placeholder="Give Me Updates..."
              onSubmit={() => alert('sub-text')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubscribe();
                }
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              onClick={() => handleSubscribe()}
              disabled={subscribing || subscribed}
              className={cn(
                'h-14 w-40 rounded-full border-2 border-black bg-black text-white',
                {
                  ' hover:text-primary': !subscribing && !subscribed,
                  'bg-gmc-surf text-black': subscribing,
                  'border-gmc-sunset bg-gmc-sunset text-black': subscribed,
                }
              )}
            >
              {subscribing ? (
                <>
                  <svg
                    role="status"
                    className="mr-2 inline h-7 w-7 animate-spin fill-gmc-sunset text-black"
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
                  <span className="">Signing Up...</span>
                </>
              ) : subscribed ? (
                'SUBSCRIBED!!'
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
