import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import Footer from '../../prelaunch/components/Footer';
import Navbar from '../../prelaunch/components/Navbar';
import NewsletterSubscribe from '../../prelaunch/components/NewsletterSubscribe';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const bar: HTMLElement = document.querySelector('#bar');
    const container: HTMLElement = document.querySelector('#container');
    // barTl.
    gsap.to(bar, {
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: true,
        snap: 1,

        // end: () => '+=' + container.offsetWidth,
      },
    });
  }, []);
  return (
    <>
      <Head>
        <title>Home | Give Me Choice</title>
      </Head>
      <div
        id="container"
        className="h-screen w-screen flex-col overflow-x-hidden"
      >
        <section id="dune" className="segment min-h-screen w-screen bg-white">
          {/* <div className="flex h-screen w-full items-center justify-center">
            <a href="/">
              <Image
                src="/img/GMC_logo.svg"
                alt="GMC Logo"
                height="50"
                width="320"
              />
            </a>
          </div> */}
          <div className="h- flex justify-end px-10 py-72">
            <div className="flex flex-col overflow-y-hidden px-2">
              <h2 className="decoration-5 text-7xl">We</h2>
              <div id="bar" className="border-b-5 w-72 border-black"></div>
              <h2 className="text- text-7xl opacity-80">believe</h2>
              <h2 className="text-7xl opacity-30">every</h2>
              <h2 className="text-7xl opacity-20">human</h2>
              <h2 className="text-7xl opacity-10">deserves</h2>
              <h2 className="text-7xl opacity-5">Choice</h2>
            </div>
          </div>
        </section>

        <section id="subscribe" className="segment h-screen w-screen">
          <Navbar />
          <div className="container mx-auto flex flex-col-reverse items-center px-6 md:mb-8 md:mt-4 md:flex-row md:space-x-10 xl:px-36">
            <div className="mb-16 mt-10 flex flex-col items-center space-y-6 md:mt-0 md:mb-0 md:w-1/2">
              <p className="max-w-md text-center text-4xl md:text-4xl">
                Planet conscious discovery, enabled by trustful curation.
              </p>
              <p className="max-w-md text-center">
                Give Me Choice empowers people to live a planet conscious life,
                bringing together a community that understands the impact of
                their actions on their health, and the health of the planet for
                future generations.
              </p>
              <p className="max-w-md text-center">
                We’re creating a discovery experience to enable planet conscious
                shoppers.{' '}
              </p>
              <strong className="max-w-md text-center text-lg font-bold">
                Subscribe to our newsletter and be amongst the first to get
                access when we launch.
              </strong>
            </div>
            <div className="mt-8 flex justify-center md:mt-0">
              <Image
                className="rounded-md"
                src="/img/hologif.gif"
                alt="Hologram"
                width={650}
                height={450}
                objectFit="cover"
                unoptimized
              />
            </div>
          </div>
          <div className="mb-10 border-t-2 border-b-2 border-black border-opacity-95 bg-white">
            <div className="container mx-auto flex flex-col items-center justify-center px-6 py-10 md:flex-row md:space-x-12">
              <NewsletterSubscribe />
            </div>
          </div>
          <Footer />
        </section>
      </div>
    </>
  );
}
