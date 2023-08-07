import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SearchMarquee: React.FC = () => {
  return (
    <div className="background-animate relative my-4 flex h-12 w-full overflow-x-hidden border-y-1.5 border-zinc-700 bg-gradient-to-r from-gmc-sunset via-primary to-gmc-surf">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        <div className="mx-6 flex w-20 justify-center underline-offset-2 hover:underline">
          <Link href={'/search?q=Eco-Friendly Shoes'} className="">
            Eco-Friendly Shoes
          </Link>
        </div>
        <div className="mx-6 flex w-20 justify-center text-2xl">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={10}
            width={20}
          />
        </div>
        <div className="mx-6 flex w-20 justify-center underline-offset-2 hover:underline">
          <Link href={'/search?q=Palm Oil Free Chocolate'} className="">
            Palm Oil Free Chocolate
          </Link>
        </div>
        <div className="mx-6 flex w-20 justify-center text-2xl">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={10}
            width={20}
          />
        </div>
        <div className="mx-6 flex w-20 justify-center underline-offset-2 hover:underline">
          <Link href={'/search?q=Organic Deodorant'} className="">
            Organic Deodorant
          </Link>
        </div>
        <div className="mx-6 flex w-20 justify-center text-2xl">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={10}
            width={20}
          />
        </div>
        <div className="mx-6 flex w-20 justify-center underline-offset-2 hover:underline">
          <Link href={'/search?q=Local Oranges'} className="">
            Local Oranges
          </Link>
        </div>
        <div className="mx-6 flex w-20 justify-center text-2xl">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={10}
            width={20}
          />
        </div>
      </div>

      <div className="animate-marquee2 absolute top-0 flex whitespace-nowrap py-2.5">
        <div className="mx-6 flex w-20 justify-center underline-offset-2 hover:underline">
          <Link href={'/search?q=Eco-Friendly Shoes'} className="">
            Eco-Friendly Shoes
          </Link>
        </div>
        <div className="mx-6 flex w-20 justify-center text-2xl">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={10}
            width={20}
          />
        </div>
        <div className="mx-6 flex w-20 justify-center underline-offset-2 hover:underline">
          <Link href={'/search?q=Palm Oil Free Chocolate'} className="">
            Palm Oil Free Chocolate
          </Link>
        </div>
        <div className="mx-6 flex w-20 justify-center text-2xl">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={10}
            width={20}
          />
        </div>
        <div className="mx-6 flex w-20 justify-center underline-offset-2 hover:underline">
          <Link href={'/search?q=Organic Deodorant'} className="">
            Organic Deodorant
          </Link>
        </div>
        <div className="mx-6 flex w-20 justify-center text-2xl">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={10}
            width={20}
          />
        </div>
        <div className="mx-6 flex w-20 justify-center underline-offset-2 hover:underline">
          <Link href={'/search?q=Local Oranges'} className="">
            Local Oranges
          </Link>
        </div>
        <div className="mx-6 flex w-20 justify-center text-2xl">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={10}
            width={20}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchMarquee;
