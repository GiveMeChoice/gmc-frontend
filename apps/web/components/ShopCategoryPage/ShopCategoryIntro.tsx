import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  category?: string;
  subcategory1?: string;
  subcategory2?: string;
  description: string;
  color: string;
  subcategories?: string[];
}

const ShopCategoryIntro: React.FC<Props> = ({
  category,
  subcategory1,
  subcategory2,
  description,
  color,
  subcategories,
}) => {
  const router = useRouter();
  return (
    <div className="flex w-full max-w-[1100px] flex-col items-center justify-evenly gap-y-2 px-8 py-7">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <div className="h-fit w-fit bg-black">
          <Link href={`/shop/category/${category}`}>
            <div
              style={{ backgroundColor: color }}
              className={cn(
                `h-fit w-fit min-w-[60px] border-1.5 border-zinc-800 text-center font-bold text-zinc-900`,
                {
                  'translate-x-[1px] -translate-y-[1px] cursor-pointer py-[8px] px-[11px] text-[13px] transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 active:-translate-y-[1px] active:translate-x-[1px]':
                    subcategory1,
                  'py-[10px] px-[28px] text-[18px]': !subcategory1,
                }
              )}
            >
              {category.toUpperCase()}
            </div>
          </Link>
        </div>
        {subcategory1 && (
          <>
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/angle-right.svg"
              alt="angle right"
              width="32"
              height="32"
            />
            <div className="h-fit w-fit bg-black">
              <Link href={`/shop/category/${category}/${subcategory1}`}>
                <div
                  style={{ backgroundColor: color }}
                  className={cn(
                    `h-fit w-fit min-w-[60px] border-1.5 border-zinc-800 text-center font-bold text-zinc-900`,
                    {
                      'translate-x-[1px] -translate-y-[1px] cursor-pointer py-[8px] px-[11px] text-[13px] transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 active:-translate-y-[1px] active:translate-x-[1px]':
                        subcategory2,
                      'py-[10px] px-[28px] text-[18px]': !subcategory2,
                    }
                  )}
                >
                  {subcategory1.toUpperCase()}
                </div>
              </Link>
            </div>
          </>
        )}
        {subcategory2 && (
          <>
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/angle-right.svg"
              alt="angle right"
              width="32"
              height="32"
            />
            <div
              style={{ backgroundColor: color }}
              className={`w-fit min-w-[60px] border-1.5 border-zinc-800 bg-zinc-900 py-[10px] px-[28px] text-center text-[18px] font-bold text-zinc-900`}
            >
              {subcategory2.toUpperCase()}
            </div>
          </>
        )}
      </div>
      <span className="w-3/5 px-6 pt-6 pb-4 text-center text-[18px] font-bold text-gray-700">
        {description}
      </span>
      {!subcategory2 && subcategories && subcategories.length > 0 && (
        <>
          <hr
            style={{
              backgroundColor: color,
              borderColor: color,
            }}
            className="h-[4px] w-full border-zinc-800 bg-zinc-800"
          />
          <div className="mt-6 flex flex-wrap justify-center gap-y-4 gap-x-8 px-8">
            {subcategories.map((subcategory) => (
              <div className="h-fit w-fit bg-black">
                <Link href={`/${router.asPath}/${subcategory}`}>
                  <div
                    style={{ backgroundColor: color }}
                    className={`w-fit min-w-[60px] translate-x-[1px] -translate-y-[1px] cursor-pointer border-1.5 border-zinc-800 bg-white py-[8px] px-[11px] text-center text-[12px] font-bold text-zinc-900 transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 active:-translate-y-[1px] active:translate-x-[1px]`}
                  >
                    {subcategory.toUpperCase()}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopCategoryIntro;
