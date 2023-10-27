import { buildSlug } from 'helpers';
import Image from 'next/image';
import React from 'react';
import { IEntityPageData } from '../../../lib/types';

interface Props {
  pageData: IEntityPageData;
  basePath: string;
  onLinkClick: (path) => void;
}

const ShopPageIntroBreadcrumb: React.FC<Props> = ({
  pageData,
  basePath,
  onLinkClick,
}) => {
  const { entity, pageTree } = pageData;
  const color = pageTree.color;

  return (
    <div
      // style={{ backgroundColor: color ? color : 'white' }}
      className="flex w-full items-center justify-start gap-x-2 border-b-1.5 border-zinc-700 bg-white py-[9px] px-4 text-[15px] md:pl-6"
    >
      {entity.parent &&
        entity.parent.parent &&
        entity.parent.parent.slug !== 'root' && (
          <>
            <span
              onClick={() =>
                onLinkClick(`${basePath}${buildSlug(entity.parent.parent)}`)
              }
              className="px-1 text-center leading-[1.2] hover:underline active:text-primary sm:w-auto"
            >
              {entity.parent.parent.name.toUpperCase()}
            </span>
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/right-arrow.svg"
              alt="angle right"
              width="17"
              height="17"
            />
          </>
        )}
      {entity.parent && entity.parent.slug !== 'root' && (
        <>
          <span
            onClick={() =>
              onLinkClick(`${basePath}${buildSlug(entity.parent)}`)
            }
            className="inline-block cursor-pointer  px-1 text-center leading-[1.2] hover:underline active:text-primary sm:w-auto"
          >
            {entity.parent.name.toUpperCase()}
          </span>
          <Image
            className="select-none rounded-full"
            draggable={false}
            src="/img/right-arrow.svg"
            alt="angle right"
            width="17"
            height="17"
          />
        </>
      )}
      <span className="px-1 text-center font-bold leading-[1.2] text-black">
        {entity.name.toUpperCase()}
      </span>
    </div>
  );
};

export default ShopPageIntroBreadcrumb;
