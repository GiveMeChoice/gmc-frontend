import React from 'react';
import LoadingMarquee from './LoadingScreen/LoadingMarquee';
import Image from 'next/image';

const SearchLoadingScreen: React.FC = () => {
  return (
    <div className="background-animate boder-1.5 flex aspect-video h-screen w-full flex-col items-center justify-evenly rounded-sm border-zinc-800 bg-gmc-surf from-gmc-surf via-primary to-gmc-sunset pb-24">
      <LoadingMarquee />
      <div className="flex items-center justify-center rounded-full border-black bg-black p-[20px]">
        <Image
          className="rounded-full"
          alt="G Logo"
          src="/img/GMC_G_white.svg"
          height={95}
          width={95}
        />
      </div>
      <LoadingMarquee />
    </div>
  );
};

export default SearchLoadingScreen;
