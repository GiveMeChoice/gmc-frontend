import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Give Me Choice</title>
      </Head>
      {/* HERO SECTION */}
      <section id="hero">
        {/* HERO FLEX CONTAINER */}
        <div className="container mx-auto flex flex-col-reverse items-center px-6 md:mb-12 md:flex-row md:py-10 xl:px-36">
          {/* LEFT TEXT ITEM */}
          <div className="mb-16 mt-10 flex flex-col items-center space-y-4 md:mb-0 md:w-1/2">
            <p className="max-w-sm text-center text-3xl md:text-left">
              Planet conscious discovery, enabled by trustful curation.
            </p>
            <p className="max-w-sm text-center md:text-left">
              Please enter your email address below to subscribe to our
              newsletter and we will invite you to test our new website when
              it&apos;s ready!*
            </p>
            <p className="width-1/2 max-w-sm text-center text-xs text-secondary-dark-50 md:mr-20 md:text-left">
              *(should be around Q1 2023 but don&apos;t hold your breath...)
            </p>
          </div>
          <div className="mt-8 flex w-1/2 justify-center md:mt-0">
            <h1 className="max-w-fit text-center text-6xl md:text-right md:text-8xl">
              The <br className="hidden md:block" /> Planet is{' '}
              <br className="hidden md:block" />
              <span className="mt-2 inline-block rounded-xl border-2 border-black px-2">
                F<span className="text-primary">*</span>
                <span className="text-gmc-heart">*</span>
                <span className="text-gmc-berry">*</span>
                <span className="text-gmc-surf">*</span>ed.
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="mb-10 border-t-2 border-b-2 border-black bg-secondary"
      >
        {/* CTA FLEX CONTAINER */}
        <div className="container mx-auto flex flex-col items-center justify-center space-y-12 px-6 py-24 md:flex-row md:space-x-12 md:space-y-0 md:py-12">
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
            <button className="rounded-md  border-2 border-white bg-black p-2.5 px-5 text-white duration-100 hover:text-primary active:scale-105 active:border-primary">
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
