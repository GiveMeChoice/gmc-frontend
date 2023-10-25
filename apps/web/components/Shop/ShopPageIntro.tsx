import cn from 'classnames';
import { buildSlug } from 'helpers';
import Image from 'next/image';
import React, { useState } from 'react';
import { IEntityPageData } from '../../lib/types';
import { useShop } from '../Context/ShopProvider';
import Link from 'next/link';
import MobileEntityListScreen from './ShopMobile/MobileEntityListScreen';

interface Props {
  pageData: IEntityPageData;
  basePath: string;
}

const ShopPageIntro: React.FC<Props> = ({ pageData, basePath }) => {
  const shop = useShop();
  const { entity, pageTree } = pageData;
  const color = pageData.pageTree.color;
  const isLabel = basePath.includes('/shop/label');
  const [showMobileEntityList, setShowMobileEntityList] = useState(false);

  const handleClick = (path) => {
    shop.search({
      ...(path.includes('/shop/category') && {
        categoryPageRequest: true,
      }),
      ...(path.includes('/shop/label') && {
        labelPageRequest: true,
      }),
      basePath: path,
    });
  };

  return (
    <div
      className={cn(
        'viasecondary bggradient-to-b flex w-full  max-w-[1100px] flex-col bg-secondary from-secondary-light-50 via-secondary to-gmc-glacier-light-50'
      )}
    >
      <div className="flex w-full items-center justify-start gap-x-2 border-b-1.5 border-zinc-700 bg-white py-[9px] pl-6 text-[15px]">
        <Link href={'/shop'}>
          <div
            // style={{ backgroundColor: color }}
            className="group mr-1 flex cursor-pointer items-center rounded-full border border-black bg-secondary p-1"
          >
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/tree.svg"
              alt="angle right"
              width="16"
              height="16"
            />
          </div>
        </Link>
        {/* <Image
          className="select-none rounded-full"
          draggable={false}
          src="/img/right-arrow.svg"
          alt="angle right"
          width="17"
          height="17"
        /> */}
        {isLabel ? (
          // <Link href={'/shop/label'}>
          <div className="flex items-center gap-x-[2px] rounded-md border-1.5 border-secondary-dark-10">
            <span
              className="cursor-pointer hover:underline active:text-primary"
              onClick={() => setShowMobileEntityList(true)}
            >
              SHOP BY LABEL
            </span>
            <Image
              draggable={false}
              src="/img/expand-down.svg"
              alt="Filters Icon"
              height={20}
              width={20}
            />
            <MobileEntityListScreen
              title={isLabel ? 'LABELS' : 'CATGORIES'}
              basePath={basePath}
              pageData={pageData}
              show={showMobileEntityList}
              onClose={() => setShowMobileEntityList(false)}
            />
          </div>
        ) : (
          // </Link>
          <Link href={'/shop/category'}>
            <span className="cursor-pointer hover:underline active:text-primary">
              SHOP BY CATEGORY
            </span>
          </Link>
        )}
        {entity.parent &&
          entity.parent.parent &&
          entity.parent.parent.slug !== 'root' && (
            <>
              <Image
                className="select-none rounded-full"
                draggable={false}
                src="/img/right-arrow.svg"
                alt="angle right"
                width="17"
                height="17"
              />
              <div
                onClick={() =>
                  handleClick(`${basePath}${buildSlug(entity.parent.parent)}`)
                }
                className="group flex h-full cursor-pointer items-center"
              >
                <span className="group-hover:underline group-active:text-primary">
                  {entity.parent.parent.name.toUpperCase()}
                </span>
              </div>
            </>
          )}
        {entity.parent && entity.parent.slug !== 'root' && (
          <>
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/right-arrow.svg"
              alt="angle right"
              width="17"
              height="17"
            />
            <div
              onClick={() =>
                handleClick(`${basePath}${buildSlug(entity.parent)}`)
              }
              className="group flex h-full cursor-pointer items-center"
            >
              <span className="group-hover:underline group-active:text-primary">
                {entity.parent.name.toUpperCase()}
              </span>
            </div>
          </>
        )}
        <Image
          className="select-none rounded-full"
          draggable={false}
          src="/img/right-arrow.svg"
          alt="angle right"
          width="17"
          height="17"
        />
        <div className="group flex h-full cursor-default items-center">
          <span className="font-bold text-gmc-ocean">
            {entity.name.toUpperCase()}
          </span>
        </div>
      </div>
      <div
        className={cn('flex flex-col items-center justify-center gap-y-6', {
          'py-12 pb-16': entity.children.length === 0,
          'py-8': entity.children.length > 0,
        })}
      >
        <div
          style={{ backgroundColor: color ? color : 'white' }}
          className={cn('h-fit w-fit', {
            'rounded-full': isLabel,
          })}
        >
          <div
            className={cn(
              ` flex h-[46px] w-fit min-w-[50px] items-center  gap-x-2 border border-zinc-900 px-[17px] text-center font-bold leading-[1] tracking-wider text-black`,
              {
                'rounded-full bg-white pr-[22px]': isLabel,
                'border-b-2.5 border-l-2.5': !isLabel,
              }
            )}
          >
            {isLabel && (
              <div
                style={{ backgroundColor: color ? color : 'white' }}
                className="mr-[5px] aspect-square h-[14px] rounded-full"
              />
            )}
            <span className="cursor-default text-[20px]">
              {entity.name.toUpperCase()}
            </span>
          </div>
        </div>
        <span className="w-3/5 text-center text-[16px] leading-[1.4] text-gray-900">
          {entity.description
            ? entity.description
            : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta libero accumsan pulvinar placerat. Mauris eleifend, magna id rutrum ultrices, nisi erat vehicula quam, id mollis ipsum enim at enim.'}
        </span>
      </div>

      {!!entity.children.length && (
        <>
          <div className="hidden flex-wrap justify-center gap-y-3 gap-x-4 border-t-1.5 border-zinc-700 px-8  py-7 md:flex">
            {entity.children.map((child) => (
              <div
                className={cn('h-fit w-fit bg-black', {
                  'rounded-full': isLabel,
                  'rouded-sm': !isLabel,
                })}
              >
                <div
                  style={{ backgroundColor: color ? color : 'white' }}
                  onClick={() =>
                    handleClick(`${basePath}${buildSlug(entity)}/${child.slug}`)
                  }
                  className={cn(
                    `w-fit min-w-[60px] translate-x-[1px] -translate-y-[1px] cursor-pointer border-1.5 border-zinc-800 font-bold text-zinc-900 transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 active:-translate-y-[1px] active:translate-x-[1px]`,
                    {
                      'rounded-full': isLabel,
                      'rounded-sm': !isLabel,
                    }
                  )}
                >
                  <div
                    className={cn(
                      'flex h-full w-full items-center justify-center py-[8px] px-[11px] text-center text-[12px]',
                      {
                        'rounded-full bg-white': isLabel,
                        'bg-white bg-opacity-10 hover:bg-opacity-0': !isLabel,
                      }
                    )}
                  >
                    {isLabel && (
                      <div
                        style={{ backgroundColor: color ? color : 'white' }}
                        className="mr-2 aspect-square h-2.5 rounded-full"
                      />
                    )}
                    {child.name.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopPageIntro;
