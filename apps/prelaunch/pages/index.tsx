import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Head>
        <title>Give Me Choice</title>
      </Head>
      {/* NAVBAR */}
      <nav className="relative mx-auto mt-4 w-full ">
        {/* FLEX CONTAINER */}
        <div className="container mx-auto flex items-center justify-between px-6 xl:px-36">
          {/* LOGO */}
          <div className="pt-2 md:pt-0">
            <a href="/">
              <Image
                src="/img/GMC_logo.svg"
                alt="GMC Logo"
                height="40"
                width="250"
              />
            </a>
          </div>
          {/* MENU ITEMS */}
          <div className="hidden space-x-6 md:mr-2 md:flex">
            <a href="about-us" className="hover:text-secondary-dark-50">
              About Us
            </a>
            <a href="blog" className="hover:text-secondary-dark-50">
              Blog
            </a>
          </div>
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
            className="absolute right-0 z-10 mt-0 hidden w-1/2 flex-col items-center self-end rounded-sm border-2 border-black bg-white"
          >
            <a className="glow-effect w-full py-3 text-center " href="about">
              About Us
            </a>
            <a className="glow-effect w-full py-3 text-center " href="blog">
              Blog
            </a>
          </div>
        </div>
      </nav>

      <main className="relative pb-10">
        {/* HERO SECTION */}
        <section id="hero">
          {/* HERO FLEX CONTAINER */}
          <div className="container mx-auto flex flex-col-reverse items-center px-6 md:mb-12 md:flex-row md:py-12 xl:px-36">
            {/* LEFT TEXT ITEM */}
            <div className="mb-16 mt-10 flex flex-col items-center space-y-4 md:mb-0 md:w-1/2">
              <p className="max-w-sm text-center text-2xl md:text-left">
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
                  F<span className="text-primary">****</span>ed.
                </span>
              </h1>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          className="border-t-2 border-b-2 border-black bg-secondary"
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
      </main>
      <footer className=" h-fit w-full bg-black text-white">
        {/* FOOTER FLEX CONTAINER */}
        <div className="container mx-auto flex flex-col justify-between space-y-8 py-5 md:flex-row md:space-y-0 xl:px-20">
          {/* social links container*/}
          <div className="flex flex-col-reverse items-center justify-between md:ml-20 md:flex-row md:items-center">
            <div>
              <a
                href="https://www.instagram.com/giveme.choice/"
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
          <div className="flex flex-col items-center space-y-3  md:flex-row md:space-y-0 md:space-x-6">
            <a
              href="mailto:hello@givemechoice.com?subject=Hello"
              className="hover:text-primary"
            >
              Contact Us
            </a>
            <a href="privacy" className="hover:text-primary">
              Privacy Policy
            </a>
          </div>
          {/* LOGO + COPYRIGHT md+ */}
          <div className="flex flex-col items-center space-y-3">
            <div>
              <Image
                src="/img/GMC_logotransp.svg"
                alt="GMC Logo"
                height="35"
                width="200"
              />
            </div>
            <div className="text-center text-xs ">
              Copyright &copy; 2022, All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
