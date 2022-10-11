import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Give Me Choice - Planet Conscious Shopping</title>
      </Head>
      <nav className="container relative mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="mt-6 flex w-7/12 justify-center">
            <div>
              <Image
                src="/img/GMC_logo.svg"
                alt="GMC Logo"
                height="100"
                width="600"
                layout="fixed"
              />
            </div>
          </div>
          <div className="flex">
            <button
              id="signIn"
              className="bg-transparent-50 active:border-primary active:text-primary rounded-sm border border-white px-5 py-2 text-white backdrop-blur-md"
            >
              <p>SIGN IN</p>
            </button>
          </div>
        </div>
      </nav>
      <main>
        <div
          id="hero"
          className="min-w-28 h-content rounded-bl-prelaunch-hero fixed -right-16 -top-16 -z-10 float-right w-1/2 flex-shrink-0 overflow-hidden"
        >
          <div
            id="img-filter"
            className="absolute z-10 h-full min-h-screen w-full from-transparent"
          />
          <Image
            src="/img/group_3.png"
            alt="hero image"
            height="1354"
            width="1303"
            layout="responsive"
          />
        </div>
        <div className="flex p-10">
          <div className="flex h-full w-1/2 flex-col">
            <div>
              <h1 className="text-8xl">The</h1>
              <h1 className="text-8xl">Planet is</h1>
              <h1 className="text-8xl">F***ed.</h1>
            </div>
            <div>
              <p>
                Please enter your email address below so that we can invite you
                to test our new website when it’s ready!*
              </p>
            </div>
            <div>
              <p>
                We might even send you one of our t-shirts to either proudly
                wear in bed or at a concert - depending on where you do most of
                your online shopping. (should be around Q1 2023 but don’t hold
                your breath...)
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div>
          <h3>footer is here</h3>
        </div>
      </footer>
    </div>
  );
}
