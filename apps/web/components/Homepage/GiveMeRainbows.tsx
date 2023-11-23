import Image from 'next/image';
import React from 'react';
import RainbowArm from './RainbowArm';

const GiveMeRainbows: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/*  */}
      <RainbowArm
        distance={6}
        color="#adbe00"
        title="Carbon Neutral Pet Accessories"
      />
      <RainbowArm
        distance={5}
        color="#0e2071"
        title="Rainforest Alliance Kitchenware"
      />
      <RainbowArm distance={4} color="#d1627e" title="FSC Educational Toys" />
      <RainbowArm distance={3} color="#adbe00" title="Gluten Free" />
      <RainbowArm distance={2} color="#b387ba" title="Made in Mexico " />
      <RainbowArm distance={1} color="#56e2b3" title="Organic Skincare" />
      <div className="flex w-full items-end pt-5">
        <div className="w-fit">
          <span className="flex h-16 w-64 cursor-pointer select-none items-center justify-center rounded-full border-1.5 border-zinc-700 bg-primary transition-transform  duration-200 ease-in-out hover:-translate-y-1.5 hover:translate-x-1 active:translate-x-0 active:translate-y-0 active:border-zinc-700">
            <Image
              className="h-fit select-none rounded-full"
              draggable={false}
              src="/img/GIVE_ME.svg"
              alt="give me"
              width="223"
              height="60"
            />
          </span>
        </div>
        <div className="h-fit w-fit border-b-[3.5px] border-black">
          <span className="px-2 text-[59px] leading-[1.04]">Choice</span>
        </div>
      </div>
      <RainbowArm distance={1} color="#f79cc4" title="Fair Trade" />
      <RainbowArm distance={2} color="#8b763b" title="Cruelty-Free" />
      <RainbowArm distance={3} color="#969eae" title="Recycled Dresses" />
      <RainbowArm distance={4} color="#029900" title="Closed Loop Jumpers" />
      <RainbowArm distance={5} color="#d1627e" title="Vegan Society Vitamins" />
    </div>
  );
};

export default GiveMeRainbows;
