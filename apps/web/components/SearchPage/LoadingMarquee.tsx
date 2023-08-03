import React from 'react';
import Image from 'next/image';

const LoadingMarquee: React.FC = () => {
  return (
    <div className="relative flex w-full overflow-x-hidden border-y-1.5 border-black">
      <div className="animate-marquee whitespace-nowrap py-5">
        <span className="mx-4 text-2xl">GIVE ME CHOICE</span>
        <span className="mx-4 h-20 w-20 text-2xl">
          <Image
            draggable={false}
            src="/img/tree.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </span>
        <span className="mx-4 text-2xl">GIVE ME CHOICE</span>
        <span className="mx-4 h-20 w-20 text-2xl">
          <Image
            draggable={false}
            src="/img/person.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </span>
        <span className="mx-4 text-2xl">GIVE ME CHOICE</span>
        <span className="mx-4 h-20 w-20 text-2xl">
          <Image
            draggable={false}
            src="/img/cart.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </span>
        <span className="mx-4 text-2xl">GIVE ME CHOICE</span>
        <span className="mx-4 h-20 w-20 text-2xl">
          <Image
            draggable={false}
            src="/img/bananas.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </span>
      </div>

      <div className="animate-marquee2 absolute top-0 whitespace-nowrap py-5">
        <span className="mx-4 text-2xl">GIVE ME CHOICE</span>
        <span className="mx-4 h-20 w-20 text-2xl">
          <Image
            draggable={false}
            src="/img/tree.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </span>
        <span className="mx-4 text-2xl">GIVE ME CHOICE</span>
        <span className="mx-4 h-20 w-20 text-2xl">
          <Image
            draggable={false}
            src="/img/person.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </span>
        <span className="mx-4 text-2xl">GIVE ME CHOICE</span>
        <span className="mx-4 h-20 w-20 text-2xl">
          <Image
            draggable={false}
            src="/img/heart.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </span>
        <span className="mx-4 text-2xl">GIVE ME CHOICE</span>
        <span className="mx-4 h-20 w-20 text-2xl">
          <Image
            draggable={false}
            src="/img/home.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </span>
      </div>
    </div>
  );
};

export default LoadingMarquee;
