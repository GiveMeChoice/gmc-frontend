import cn from 'classnames';
import { buildSlug } from 'helpers';
import Image from 'next/image';
import React, { useState } from 'react';
import { IEntityPageData } from '../../lib/types';
import { useShop } from '../Context/ShopProvider';
import MobileEntityListScreen from './ShopMobile/MobileEntityListScreen';
import ShopPageIntroBreadcrumb from './ShopPageIntro/ShopPageIntroBreadcrumb';

interface Props {
  pageData: IEntityPageData;
  basePath: string;
}

const ShopPageIntro: React.FC<Props> = ({ pageData, basePath }) => {
  const shop = useShop();
  const { entity, pageTree } = pageData;
  const color = pageTree.color;
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
      <ShopPageIntroBreadcrumb
        pageData={pageData}
        basePath={basePath}
        onLinkClick={handleClick}
      />
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-y-6 px-4',
          {
            'py-12 pb-16': entity.children.length === 0,
            'py-8': entity.children.length > 0,
          }
        )}
      >
        <div
          style={{ backgroundColor: color ? color : 'white' }}
          className={cn('h-fit w-fit', {
            'rounded-full': isLabel,
          })}
          onClick={() => setShowMobileEntityList(true)}
        >
          <div
            className={cn(
              ` flex h-[46px] w-fit min-w-[50px] items-center  gap-x-2 border border-zinc-900 pl-[17px] pr-[10px] text-center font-bold leading-[1] tracking-wider text-black md:pr-[17px]`,
              {
                'rounded-full bg-white pr-[22px]': isLabel,
                'border-1.5': !isLabel,
                // 'border-b-2.5 border-l-2.5': !isLabel,
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
            <div className="md:hidden">
              <Image
                draggable={false}
                src="/img/expand-down.svg"
                alt="Expand down"
                height={20}
                width={20}
              />
            </div>
          </div>
        </div>
        <span className="w-11/12 text-center text-[16px] leading-[1.4] text-gray-900 sm:w-4/5">
          {entity.description
            ? entity.description
            : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta libero accumsan pulvinar placerat. Mauris eleifend, magna id rutrum ultrices, nisi erat vehicula quam, id mollis ipsum enim at enim.'}
        </span>
      </div>

      {!!entity.children.length && (
        <>
          <div className="border--1.5 flex flex-wrap justify-center gap-y-3 gap-x-4 border-zinc-700  px-8 pb-7 pt-3">
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
                    `w-fit min-w-[60px] translate-x-[1px] -translate-y-[1px] cursor-pointer border-1.5 border-zinc-800 font-bold text-zinc-900 transition-transform duration-150 active:-translate-y-[1px] active:translate-x-[1px] md:hover:translate-x-1 md:hover:-translate-y-1`,
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
      <MobileEntityListScreen
        title={isLabel ? 'LABEL' : 'CATEGORY'}
        basePath={basePath}
        pageData={pageData}
        show={showMobileEntityList}
        onClose={() => setShowMobileEntityList(false)}
      />
    </div>
  );
};

export default ShopPageIntro;
