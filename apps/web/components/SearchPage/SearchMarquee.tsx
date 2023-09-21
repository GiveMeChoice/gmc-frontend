import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SearchMarquee: React.FC = () => {
  return (
    <div className="background-animate relative flex h-14 w-full overflow-x-hidden border-t-1.5 border-zinc-700 bg-gmc-surf from-gmc-ocean-light-40 via-secondary to-gmc-surf text-[18px] italic">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        <div className="flex h-full min-w-[100px] items-center justify-center px-6 text-center underline-offset-2 hover:underline">
          <Link href={'/shop/search?q=Eco-Friendly Shoes'} className="">
            Eco-Friendly Shoes
          </Link>
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={28}
            width={28}
          />
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6 text-center underline-offset-2 hover:underline">
          <Link href={'/shop/search?q=Palm Oil Free Chocolate'} className="">
            Palm Oil Free Chocolate
          </Link>
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={28}
            width={28}
          />
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6 text-center underline-offset-2 hover:underline">
          <Link href={'/shop/search?q=Organic Deodorant'} className="">
            Organic Deodorant
          </Link>
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={28}
            width={28}
          />
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6 text-center underline-offset-2 hover:underline">
          <Link href={'/shop/search?q=Local Oranges'} className="">
            Local Oranges
          </Link>
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={28}
            width={28}
          />
        </div>
      </div>

      <div className="absolute top-0 flex h-full animate-marquee2 whitespace-nowrap py-2.5">
        <div className="flex h-full min-w-[100px] items-center justify-center px-6 text-center underline-offset-2 hover:underline">
          <Link href={'/shop/search?q=Eco-Friendly Shoes'} className="">
            Eco-Friendly Shoes
          </Link>
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={28}
            width={28}
          />
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6 text-center underline-offset-2 hover:underline">
          <Link href={'/shop/search?q=Palm Oil Free Chocolate'} className="">
            Palm Oil Free Chocolate
          </Link>
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={28}
            width={28}
          />
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6 text-center underline-offset-2 hover:underline">
          <Link href={'/shop/search?q=Organic Deodorant'} className="">
            Organic Deodorant
          </Link>
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={28}
            width={28}
          />
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6 text-center underline-offset-2 hover:underline">
          <Link href={'/shop/search?q=Local Oranges'} className="">
            Local Oranges
          </Link>
        </div>
        <div className="flex h-full min-w-[100px] items-center justify-center px-6">
          <Image
            draggable={false}
            src="/img/GMC_G_black.svg"
            alt="Tree Icon"
            height={28}
            width={28}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchMarquee;
