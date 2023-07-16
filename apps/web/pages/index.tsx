import Head from 'next/head';
import DiscoverFooter from '../components/DiscoverFooter';
import GiveMeBarHome from '../components/GiveMeBarHome';
import LinkChips from '../components/Navbar/LinkChips/LinkChips';
import ProfileButton from '../components/Navbar/ProfileButton';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Give Me Choice</title>
      </Head>

      <section className="max-w-screen container mx-auto flex h-screen flex-col items-center justify-between">
        <div className="flex w-full justify-end space-x-6 p-4">
          <LinkChips />
          <ProfileButton />
        </div>
        <div className="flex h-1/2 w-2/3 items-center justify-center">
          <GiveMeBarHome />
        </div>

        <svg
          className="mb-10 animate-bounce"
          viewBox="0 0 72 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="LandingPage-DownArrow"
          height="19px"
          width="72px"
        >
          <path
            d="m1.571 5.256 30.793 12.3c.569.239 1.167.463 1.796.673.658.21 1.271.314 1.84.314.569 0 1.167-.105 1.795-.314.659-.21 1.287-.434 1.886-.674L70.429 5.256c.509-.21.898-.509 1.167-.898.27-.389.404-.793.404-1.212 0-.718-.24-1.316-.718-1.795-.479-.509-1.093-.763-1.84-.763-.36 0-.764.075-1.213.224-.448.15-.823.285-1.122.404L34.34 14.28h3.322L4.893 1.216c-.33-.12-.718-.254-1.167-.404A3.597 3.597 0 0 0 2.514.588c-.718 0-1.317.254-1.796.763C.24 1.83 0 2.428 0 3.146c0 .42.135.823.404 1.212.27.39.658.689 1.167.898Z"
            fill="#AEAEB2"
          ></path>
        </svg>
      </section>
      <section className="flex h-screen w-full items-center">
        <div className="relative flex h-4/5 w-1/4 shadow-2xl">
          <Image
            priority
            src="/img/images/hero9.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="hero"
          />
        </div>
        <div className="relative flex h-full w-3/5 shadow-2xl">
          <Image
            priority
            className="rounded-md"
            src="/img/images/hero10.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="hero"
          />
        </div>
        <div className="relative flex h-4/5 w-1/4 shadow-2xl">
          <Image
            priority
            src="/img/images/hero4.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="hero"
          />
        </div>
      </section>
      <section className="flex w-full items-center justify-center bg-white pt-36 pb-24">
        <div className="flex items-center space-x-6">
          <Image
            src="/img/G_LOGO_GREEN.svg"
            alt="GMC Logo"
            height="100"
            width="100"
          />
          <p className="max-w-md text-2xl md:text-3xl">
            Planet conscious discovery, enabled by trustful curation.
          </p>
        </div>
      </section>
      <section className="flex flex-wrap bg-secondary px-8 py-28">
        <div className="flex w-1/3 items-center justify-center">
          <div className="flex aspect-3/4 w-4/5 cursor-pointer flex-col rounded-3xl bg-white shadow-2xl">
            <div className="flex h-1/2 flex-col items-center justify-evenly p-3 px-8">
              <div className="flex w-full flex-col items-center justify-center space-y-4">
                <div className="flex aspect-square w-10 items-center justify-center rounded-full border border-zinc-600 bg-gmc-beach lg:w-14">
                  <Image
                    className="select-none rounded-full"
                    draggable={false}
                    src="/img/search.svg"
                    alt="give me"
                    width="30"
                    height="30"
                  />
                </div>
                <span className="text-2xl">Search & Compare</span>
              </div>
              <p className="text-center text-sm font-bold">
                Search for sustainable products from hundreds of brands and
                compare labels, price and shop for values you care about most.
              </p>
            </div>

            <div className="relative flex h-1/2 w-full flex-grow">
              <Image
                priority
                className="rounded-b-xl"
                src="/img/images/hero8.jpg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="hero"
              />
            </div>
          </div>
        </div>

        <div className="flex w-1/3 items-center justify-center">
          <div className="flex aspect-3/4 w-4/5 cursor-pointer flex-col rounded-3xl bg-white shadow-2xl">
            <div className="flex h-1/2 flex-col items-center justify-evenly p-3 px-8">
              <div className="flex w-full flex-col items-center justify-center space-y-4">
                <div className="flex aspect-square w-10 items-center justify-center rounded-full border border-zinc-600 bg-gmc-surf lg:w-14">
                  <Image
                    className="select-none rounded-full"
                    draggable={false}
                    src="/img/tree.svg"
                    alt="give me"
                    width="30"
                    height="30"
                  />
                </div>
                <span className="text-2xl">Discover</span>
              </div>
              <p className="text-center text-sm font-bold">
                Discover new products and brands with curated and personalised
                recommendations.
              </p>
            </div>

            <div className="relative flex h-1/2 w-full flex-grow">
              <Image
                priority
                className="rounded-b-xl"
                src="/img/images/hero5.jpg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="hero"
              />
            </div>
          </div>
        </div>
        <div className="flex w-1/3 items-center justify-center">
          <div className="flex aspect-3/4 w-4/5 cursor-pointer flex-col rounded-3xl bg-white shadow-2xl">
            <div className="flex h-1/2 flex-col items-center justify-evenly p-3 px-8">
              <div className="flex w-full flex-col items-center justify-center space-y-4">
                <div className="flex aspect-square w-10 items-center justify-center rounded-full border border-zinc-600 bg-gmc-sunset lg:w-14">
                  <Image
                    className="select-none rounded-full"
                    draggable={false}
                    src="/img/person.svg"
                    alt="give me"
                    width="30"
                    height="30"
                  />
                </div>
                <span className="text-2xl">Personalise</span>
              </div>
              <p className="text-center text-sm font-bold">
                Highlight the causes and goals you care about and let us help
                you find the products and brands that represent your values.
              </p>
            </div>

            <div className="relative flex h-1/2 w-full flex-grow">
              <Image
                priority
                className="rounded-b-xl"
                src="/img/images/hero2.jpg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="hero"
              />
            </div>
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
