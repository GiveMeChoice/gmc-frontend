import cn from 'classnames';
import { INestedEntity } from 'gmc-types';
import { buildSlug } from 'helpers';
import Image from 'next/image';
import React from 'react';
import { useSearch } from '../SearchProvider';

interface Props {
  entity: INestedEntity;
  color: string;
  basePath: string;
}

const ShopPageIntro: React.FC<Props> = ({ entity, color, basePath }) => {
  const search = useSearch();

  const handleClick = (path) => {
    search.execute({
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
        'flex w-full max-w-[1100px] flex-col items-center justify-center gap-y-4 bg-white px-8 py-10'
      )}
    >
      <div
        style={{ backgroundColor: color ? color : 'white' }}
        className={cn(
          `flex h-14 w-fit min-w-[60px] items-center gap-x-2 rounded-none border-1.5  border-b-2.5 border-l-2.5 border-zinc-900 bg-white px-[26px] text-center font-bold leading-[1] tracking-wider text-black`
        )}
      >
        {entity.parent &&
          entity.parent.parent &&
          entity.parent.parent.slug !== 'root' && (
            <>
              <div
                onClick={() =>
                  handleClick(`${basePath}${buildSlug(entity.parent.parent)}`)
                }
                className="group flex h-full cursor-pointer items-center"
              >
                <span className="text-[14px] decoration-[1.5px] underline-offset-[2px] group-hover:underline group-active:text-primary">
                  {entity.parent.parent.name.toUpperCase()}
                </span>
              </div>
              <div className="min-h-[10px] min-w-[10px] ">
                <Image
                  className="select-none rounded-full"
                  draggable={false}
                  src="/img/angle-right.svg"
                  alt="angle right"
                  width="20"
                  height="20"
                />
              </div>
            </>
          )}
        {entity.parent && entity.parent.slug !== 'root' && (
          <>
            <div
              onClick={() =>
                handleClick(`${basePath}${buildSlug(entity.parent)}`)
              }
              className="group flex h-full cursor-pointer items-center"
            >
              <span className="text-[16px] decoration-[1.5px] underline-offset-[2px] group-hover:underline group-active:text-primary">
                {entity.parent.name.toUpperCase()}
              </span>
            </div>
            <div className="min-h-[10px] min-w-[10px] ">
              <Image
                className="select-none rounded-full"
                draggable={false}
                src="/img/angle-right.svg"
                alt="angle right"
                width="18"
                height="18"
              />
            </div>
          </>
        )}
        <span className="cursor-default text-[20px]">
          {entity.name.toUpperCase()}
        </span>
      </div>
      <span className="w-3/5 px-6 pt-2.5 text-center text-[16px] text-gray-900">
        {entity.description}
      </span>
      <hr className="my-2.5 h-[3px] w-full border-zinc-800 bg-zinc-800" />
      {!!entity.children.length && (
        <>
          <div className="flex flex-wrap justify-center gap-y-3 gap-x-4 px-8 pt-1.5">
            {entity.children.map((child) => (
              <div className="h-fit w-fit rounded-sm bg-black">
                <div
                  onClick={() =>
                    handleClick(`${basePath}${buildSlug(entity)}/${child.slug}`)
                  }
                  style={{ backgroundColor: color ? color : 'white' }}
                  className={`w-fit min-w-[60px] translate-x-[1px] -translate-y-[1px] cursor-pointer rounded-sm border-1.5 border-zinc-800 bg-secondary py-[8px] px-[11px] text-center text-[12px] font-bold text-zinc-900 transition-transform duration-150 hover:translate-x-1 hover:-translate-y-1 hover:bg-primary active:-translate-y-[1px] active:translate-x-[1px]`}
                >
                  {child.name.toUpperCase()}
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
