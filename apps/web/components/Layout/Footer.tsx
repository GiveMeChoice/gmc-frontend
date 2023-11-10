import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="w-full overflow-x-hidden border-t-1.5 border-zinc-600">
      <div className="flex w-full flex-col-reverse justify-between bg-secondary md:h-[420px] md:flex-row">
        <div className="flex h-full w-full flex-col-reverse justify-evenly p-10 md:w-3/5 md:flex-row">
          <div className="mt-6 w-full justify-end pr-4 md:hidden">
            <div className="flex flex-col items-center gap-x-4">
              <div>
                <Image
                  src="/img/GMC_LOGO_black.svg"
                  alt="GMC Logo"
                  height="35"
                  width="140"
                />
              </div>
              <div className="text-center text-[14px]">
                &copy; Give Me Choice B.V.
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-4 border-y-1.5 border-secondary-dark-20 px-12 py-8 md:w-2/5 md:border-y-0 md:border-r-1.5 md:pb-0">
            <div className="h-[120px] w-[120px] rounded-full border-1.5 border-black">
              <Image
                src="/img/G_LOGO_GREEN.svg"
                alt="GMC Logo"
                height="120"
                width="120"
              />
            </div>
            <span className="text-center text-[24px] leading-[1.3]">
              Sustainability Simplified
            </span>
          </div>
          <div className="flex flex-col gap-y-8 py-4 md:w-3/5 md:py-0">
            <div className="flex h-4/5 w-full flex-col gap-x-4 md:flex-row md:pt-12">
              <div className="flex w-3/5 ">
                <div className="flex flex-col justify-start gap-y-3 pb-6 text-3xl md:pl-12 lg:pl-16">
                  <span className="cursor-pointer underline-offset-2 hover:underline">
                    Shop
                  </span>
                  <span className="cursor-pointer underline-offset-2 hover:underline">
                    Discover
                  </span>
                  <span className="cursor-pointer underline-offset-2 hover:underline">
                    Blog
                  </span>
                </div>
              </div>
              <div className="flex w-2/5 pt-8 font-bold md:pt-0">
                <div className="flex flex-col justify-start gap-y-1 md:pl-4">
                  <span className="cursor-pointer underline-offset-2 hover:underline">
                    About Us
                  </span>
                  <span className="cursor-pointer underline-offset-2 hover:underline">
                    Contact
                  </span>
                  <span className="cursor-pointer underline-offset-2 hover:underline">
                    Terms
                  </span>
                  <span className="cursor-pointer underline-offset-2 hover:underline">
                    Privacy
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-8 py-8 md:flex-row md:justify-evenly">
              <a
                href="https://www.instagram.com/giveme_choice/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image
                  src="/img/icon-instagram.svg"
                  alt="GMC Logo"
                  height="45"
                  width="45"
                />
              </a>
              <a
                href="https://www.weare8.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="h-[45px] w-[45px] rounded-xl border-2.5 border-zinc-900">
                  <Image
                    className="rounded-xl"
                    src="data:image/png;base64,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"
                    alt="GMC Logo"
                    height="40"
                    width="40"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between bg-black px-8 pt-10 pb-16 text-white md:w-2/5 md:px-16 md:pt-16 md:pb-10">
          <div className="flex flex-col items-center gap-y-10">
            <span className="max-w-[475px] text-center text-[36px] leading-[1.2] md:text-left md:font-normal">
              Get more Choice every month.
            </span>
            <div className="flex h-16 w-full max-w-[475px] divide-x-1.5 divide-zinc-900 ">
              <input
                type="text"
                placeholder="Your Email"
                className="h-full w-full rounded-l-sm py-4 px-6 text-[20px] text-zinc-800 outline-none placeholder:text-zinc-800"
              />
              <button className="flex h-full w-20 items-center justify-center rounded-r-sm bg-primary outline-none hover:bg-gmc-sunset">
                <Image
                  src="/img/right-arrow.svg"
                  alt="GMC Logo"
                  height="30"
                  width="30"
                />
              </button>
            </div>
          </div>
          <div className="hidden w-full justify-end pr-4 md:flex">
            <div className="flex flex-col items-center gap-x-4">
              <div>
                <Image
                  // src="/img/G_LOGO_GREEN.svg"
                  src="/img/GMC_LOGO_white.svg"
                  alt="GMC Logo"
                  height="35"
                  width="140"
                />
              </div>
              <div className="text-center text-[14px]">
                &copy; Give Me Choice B.V.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
