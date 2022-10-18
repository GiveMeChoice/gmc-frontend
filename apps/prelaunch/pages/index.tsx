import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Give Me Choice</title>
      </Head>
      {/* NAVBAR */}
      <nav className="container relative mx-auto p-3 xl:px-20">
        {/* FLEX CONTAINER */}
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div className="pt-2 md:pt-0">
            <Image
              src="/img/GMC_logo.svg"
              alt="GMC Logo"
              height="60"
              width="250"
              // layout="fill"
            />
          </div>
          {/* MENU ITEMS */}
          <div className="hidden space-x-6 md:flex">
            <a href="#" className="hover:text-secondary-dark-50">
              How It Works
            </a>
            <a href="#" className="hover:text-secondary-dark-50">
              About Us
            </a>
            <a href="#" className="hover:text-secondary-dark-50">
              Blog
            </a>
          </div>
          {/* BUTTON */}
          <a
            href="#"
            className="text hidden rounded-md border-2 border-black px-6 pt-1.5 pb-0.5 hover:bg-secondary md:block"
            title="Sign In"
          >
            <Image
              src="/img/icon-user.svg"
              height={20}
              width={20}
              alt="sign-in button"
            />
          </a>
          {/* HAMBURGER */}
          <button
            id="menu-btn"
            className="hamburger mt-3 mr-3 ml-6 focus:outline-none md:hidden"
            onClick={(e) => {
              const btn = document.getElementById('menu-btn');
              const nav = document.getElementById('menu');
              btn.classList.toggle('open');
              nav.classList.toggle('flex');
              nav.classList.toggle('hidden');
            }}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
        {/* MOBILE MENU */}
        <div className="md:hidden">
          <div
            id="menu"
            className="absolute right-0 z-10 mt-0 hidden w-1/2 flex-col items-center self-end  rounded-sm border-2 border-black bg-white"
          >
            <a
              className="w-full py-3 text-center active:bg-secondary-dark-10"
              href="#"
            >
              How It Works
            </a>
            <a
              className="w-full py-3 text-center active:bg-secondary-dark-10"
              href="#"
            >
              About Us
            </a>
            <a
              className="w-full py-3 text-center active:bg-secondary-dark-10"
              href="#"
            >
              Blog
            </a>
            <a
              className="w-full py-3 text-center active:bg-secondary-dark-10"
              href="#"
            >
              <Image
                src="/img/icon-user.svg"
                height={20}
                width={20}
                alt="sign-in button"
              />
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          {/* FLEX CONTAINER */}
          <div className="container mx-auto flex flex-col-reverse items-center px-6 md:flex-row xl:px-20">
            {/* LEFT TEXT ITEM */}
            <div className="mb-16 mt-10 flex flex-col space-y-10 md:w-1/2">
              <div className="max-w-md">
                <h1 className="max-w-fit text-center text-6xl md:text-right md:text-8xl">
                  The <br className="hidden md:block" /> Planet is{' '}
                  <br className="hidden md:block" />
                  <span className="mt-2 inline-block rounded-xl border-2 border-black px-2">
                    F<span className="text-primary">****</span>ed.
                  </span>
                </h1>
              </div>
              <div className="space-y-4">
                <p className="max-w-sm text-center md:text-left">
                  Please enter your email address below so that we can invite
                  you to test our new website when it&apos;s ready!*
                </p>
                <p className="max-w-sm text-center md:text-left">
                  We might even send you one of our t-shirts to either proudly
                  wear in bed or at a concert - depending on where you do most
                  of your online shopping.
                </p>
                <p className="max-w-sm text-center text-xs text-secondary-dark-50 md:text-left">
                  *(should be around Q1 2023 but don&apos;t hold your breath...)
                </p>
              </div>
            </div>
            {/* IMAGE */}
            <div
              className="w-full rounded-tl-hero-flare
            bg-gradient-to-r from-secondary to-primary pl-7 md:w-1/2
            "
            >
              <Image
                className="rounded-tl-hero"
                src="/img/hero_image.png"
                alt="hero image"
                // height="640"
                // width="665"
                height="1354"
                width="1303"
                layout="responsive"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="bg-secondary">
          {/* FLEX CONTAINER */}
          <div className="container mx-auto flex flex-col items-center justify-between space-y-12 px-6 py-24 md:flex-row md:space-y-0 md:py-12 xl:px-20">
            <h2 className="md:text-align-left text-center text-3xl md:max-w-xl md:text-3xl xl:pl-36">
              Request Early Access
            </h2>
            <div className="flex flex-wrap justify-center space-y-2 sm:space-y-0 xl:pr-36">
              <input
                className="mr-1 rounded-md border-2 border-black p-2"
                type="email"
                id="email"
                pattern=".+@.+\.com"
                size={30}
                required
                placeholder="Your email..."
                onSubmit={() => alert('sub-text')}
                onKeyDown={(e) => {
                  console.log(e);
                  if (e.key === 'Enter') {
                    alert('sub-test');
                  }
                }}
              />
              <a
                href="#"
                className="rounded-md border-2 border-black bg-primary p-2.5 px-5 hover:bg-primary-light-20"
                onClick={() => alert('click-a')}
              >
                Submit
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black">
        {/* FLEX CONTAINER */}
        <div className="container mx-auto flex flex-col justify-between space-y-8 px-6 py-10 md:flex-row md:space-y-0 xl:px-20">
          {/* social links container*/}
          <div className="flex flex-col-reverse items-center justify-between md:ml-20 md:flex-row md:items-center">
            <div>
              <a
                href="https://www.instagram.com/givemechoice/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image
                  src="/img/icon-instagram.svg"
                  alt="GMC Logo"
                  height="40"
                  width="40"
                />
              </a>
            </div>
          </div>
          {/* List Container */}
          <div className="flex flex-col items-center space-y-3 text-white md:flex-row md:space-y-0 md:space-x-6">
            <a href="#" className="hover:text-primary">
              Contact Us
            </a>
            <a href="#" className="hover:text-primary">
              Blog
            </a>
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
          </div>
          {/* LOGO + COPYRIGHT md+ */}
          <div className="flex flex-col items-center space-y-3">
            <div>
              <Image
                src="/img/GMC_logotransp_white.svg"
                alt="GMC Logo"
                height="40"
                width="200"
              />
            </div>
            <div className="text-center text-white">
              Copyright &copy; 2022, All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
