import Head from 'next/head';
import Image from 'next/image';
import GiveMeBarHome from '../components/GiveMeBarHome';
import LinkChips from '../components/Navbar/LinkChips/LinkChips';
import ProfileButton from '../components/Navbar/ProfileButton';
import { useUser } from '../components/UserProvider';
import LoginButton from '../components/Navbar/LoginButton';
import DiscoverFooter from '../components/DiscoverFooter';

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Home | Give Me Choice</title>
      </Head>
      <section className="max-w-screen container mx-auto flex h-screen flex-col items-center justify-between">
        <div className="border-secondar-dark-10 z-10 flex h-24 w-full items-center justify-end gap-x-6 bg-white px-10 pb-1">
          <LinkChips />
          {user ? <ProfileButton /> : <LoginButton />}
        </div>
        <div className="flex h-3/5 w-2/3 items-center justify-center pt-10">
          <GiveMeBarHome />
        </div>
        <DiscoverFooter />
        <div className="animate-bounce">
          <Image
            className="select-none rounded-full"
            draggable={false}
            src="/img/down-arrow.svg"
            alt="give me"
            width="30"
            height="30"
          />
        </div>
      </section>
      <section className="flex w-full flex-col items-center justify-center">
        {/* {arrowDown()} */}

        <div className="via-gmc-sunset-light flex w-10/12 flex-wrap border-x-2 border-zinc-800 bg-secondary from-gmc-heart-light-50 via-gmc-ocean-light-50 to-gmc-surf-light-50 px-8 py-16 pb-24">
          <div className="flex w-1/3 items-center justify-center">
            <a
              className="flex aspect-3/4 w-4/5 cursor-pointer flex-col rounded-3xl bg-gmc-soil-light-50 shadow-lg shadow-gmc-soil-dark-10"
              href="/search"
            >
              <div className="flex h-3/5 flex-col items-center justify-evenly p-3 px-8">
                <div className="flex items-center justify-center rounded-full border border-zinc-800 bg-gmc-soil-light-10 py-1 pl-1.5 pr-3 shadow-md">
                  <div className="flex aspect-square w-8 items-center justify-center rounded-full border border-zinc-800 bg-secondary lg:w-12">
                    <Image
                      className="select-none rounded-full"
                      draggable={false}
                      src="/img/search.svg"
                      alt="give me"
                      width="26"
                      height="26"
                    />
                  </div>
                  <span className="px-6 text-2xl">Search</span>
                </div>
                <p className="text-center text-sm font-bold">
                  Search for sustainable products from hundreds of brands and
                  compare labels, price and shop for values you care about most.
                </p>
              </div>

              <div className="relative flex h-2/5 w-full flex-grow border-t-1.5 border-zinc-800">
                <Image
                  priority
                  className="rounded-b-2xl"
                  src="/img/images/hero8.jpg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="hero"
                />
              </div>
            </a>
          </div>

          <div className="flex w-1/3 items-center justify-center">
            <a
              className="flex aspect-3/4 w-4/5 cursor-pointer flex-col rounded-3xl border-secondary-dark-20 bg-gmc-surf-light-40 shadow-lg shadow-gmc-surf-dark-40"
              href="/discover"
            >
              <div className="flex h-3/5 flex-col items-center justify-evenly p-3 px-8">
                <div className="flex items-center justify-center rounded-full border border-zinc-800 bg-gmc-surf py-1 pl-1.5 pr-3 shadow-md">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border border-zinc-800 bg-secondary lg:w-12">
                    <Image
                      className="select-none rounded-full"
                      draggable={false}
                      src="/img/tree.svg"
                      alt="give me"
                      width="26"
                      height="26"
                    />
                  </div>
                  <span className="px-6 text-2xl">Discover</span>
                </div>
                <p className="text-center text-sm font-bold">
                  Discover new products and brands with curated and personalised
                  recommendations.
                </p>
              </div>

              <div className="relative flex h-2/5 w-full flex-grow border-t-1.5 border-zinc-800">
                <Image
                  priority
                  className="rounded-b-3xl"
                  src="/img/images/hero7.jpg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="hero"
                />
              </div>
            </a>
          </div>
          <div className="flex w-1/3 items-center justify-center">
            <a
              className="flex aspect-3/4 w-4/5 cursor-pointer flex-col rounded-3xl border-zinc-800 bg-gmc-forest-light-40 shadow-lg shadow-gmc-forest-dark-20"
              href="/"
            >
              <div className="flex h-3/5 flex-col items-center justify-evenly p-3 px-8">
                <div className="flex items-center justify-center rounded-full border border-zinc-800 bg-gmc-forest py-1 pl-1.5 pr-3 shadow-md">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border border-zinc-600 bg-secondary lg:w-12">
                    <Image
                      className="select-none rounded-full"
                      draggable={false}
                      src="/img/person.svg"
                      alt="give me"
                      width="26"
                      height="26"
                    />
                  </div>
                  <span className="px-6 text-2xl">Personalise</span>
                </div>
                <p className="text-center text-sm font-bold">
                  Highlight the causes and goals you care about and let us help
                  you find the products and brands that represent your values.
                </p>
              </div>

              <div className="relative flex h-2/5 w-full flex-grow border-t-1.5 border-zinc-800">
                <Image
                  priority
                  className="rounded-b-3xl"
                  src="/img/images/hero3.jpg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="hero"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="relative flex h-screen w-full items-center justify-center">
        {/* <div className="absolute top-0 left-0 flex h-full w-full justify-center">
          <div className="h-screen w-10/12 rounded-md border-2 border-zinc-800 bg-gradient-to-bl from-gmc-surf-light-50 via-primary to-gmc-sunset" />
        </div> */}
        <div className="mt-10 flex h-screen w-11/12 items-center justify-center overflow-x-visible">
          <div className="relative flex h-3/5 w-1/4 shadow-2xl shadow-secondary-dark-50">
            <Image
              priority
              src="/img/images/hero6.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="hero"
            />
          </div>
          <div className="relative flex h-full w-1/2 rounded-sm shadow-2xl shadow-secondary-dark-50">
            <Image
              priority
              className="rounded-sm"
              src="/img/images/hero10.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="hero"
            />
          </div>
          <div className="relative flex h-3/5 w-1/4 shadow-2xl shadow-secondary-dark-50">
            <Image
              priority
              className="rounded-sm"
              src="/img/images/hero4.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="hero"
            />
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        {/* <div className="mb-16 flex w-10/12 justify-center rounded-b-full border-2 border-t-0 border-zinc-800 bg-secondary py-10">
          <div className="h-10 w-1/2" />
        </div> */}

        <div className="mt-8 flex w-10/12 items-center justify-center rounded-t-md border-2 border-b-0 border-zinc-800 bg-secondary from-gmc-surf-light-50  to-gmc-heart-light-50 pt-20 pb-10">
          <div className="background-animate flex w-fit items-center justify-start space-x-6 rounded-full border border-zinc-800 bg-gradient-to-br from-gmc-surf-light-20 via-gmc-sunset-light-40 to-gmc-ocean-light-50 p-5 pr-12 text-zinc-900 shadow-none shadow-secondary-dark-50 drop-shadow-none">
            <div className="boder flex items-center justify-center rounded-full border-zinc-400 shadow-sm shadow-zinc-800">
              <Image
                src="/img/G_LOGO_GREEN.svg"
                alt="GMC Logo"
                height="80"
                width="80"
              />
            </div>
            <p className="text-3xl text-zinc-900">
              Planet conscious discovery, <br />
              enabled by trustful curation.
            </p>
          </div>
        </div>
      </section>

      <footer className="flex h-64 w-full items-end justify-between bg-secondary px-28 pb-20">
        <div className="flex flex-col-reverse items-center justify-between md:flex-row md:items-center">
          <div>
            <a
              href="https://www.instagram.com/giveme_choice/"
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
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            Contact Us
          </a>
          <a href="privacy" className="hover:text-primary">
            Privacy Policy
          </a>
          <a href="blog" className="hover:text-primary">
            Blog
          </a>
        </div>
        {/* LOGO + COPYRIGHT md+ */}
        <div className="flex flex-col items-center space-y-3">
          <div>
            <Image
              src="/img/GMC_LOGO_black.svg"
              alt="GMC Logo"
              height="35"
              width="200"
            />
          </div>
          <div className="text-center text-xs ">
            Copyright &copy; 2023, All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
}
