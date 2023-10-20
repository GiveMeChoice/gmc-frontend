import React from 'react';
import Image from 'next/image';

const LoadingMarquee: React.FC = () => {
  return (
    <div className="relative flex w-full overflow-x-hidden border-y-1.5 border-black">
      <div className="animate-marquee whitespace-nowrap py-5">
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="GIVE ME"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/tree.svg"
            alt="Tree Icon"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="GIVE ME"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/person.svg"
            alt="Person Icon"
            height={26}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="GIVE ME"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/cart.svg"
            alt="Cart Icon"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="GIVE ME"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/bananas.svg"
            alt="Bananas Icon"
            height={24}
            width={90}
          />
        </span>
      </div>

      <div className="animate-marquee2 absolute top-0 whitespace-nowrap py-5">
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="GIVE ME"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/tree.svg"
            alt="Tree Icon"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="GIVE ME"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/person.svg"
            alt="Tree Icon"
            height={26}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="GIVE ME"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/bananas.svg"
            alt="Bananas Icon"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="GIVE ME"
            height={24}
            width={90}
          />
        </span>
        <span className="mx-4 w-48">
          <Image
            draggable={false}
            src="/img/cart.svg"
            alt="Cart Icon"
            height={24}
            width={90}
          />
        </span>
      </div>
    </div>
  );
};

export default LoadingMarquee;
