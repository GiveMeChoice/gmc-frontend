import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className=" h-fit w-full bg-inherit text-black">
      {/* FOOTER FLEX CONTAINER */}
      <div className="container mx-auto flex flex-col justify-between space-y-8 py-7 md:flex-row md:space-y-0 xl:px-20">
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
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            Contact Us
          </a>
          <a href="privacy-policy" className="hover:text-primary">
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
  );
};

export default Footer;
