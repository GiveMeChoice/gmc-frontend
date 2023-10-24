import { IGmcCategory, IProduct } from 'gmc-types';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { flattenCategory } from '../../lib/categories';

interface Props {
  category: IGmcCategory;
}

interface LinkProps {
  path: string;
  title: string;
}

const ProductPageCategory: React.FC<Props> = ({ category }) => {
  const categoryFlat = flattenCategory(category);
  return (
    <div
      style={{ backgroundColor: categoryFlat.category.color }}
      className="h-fit w-full font-normal"
    >
      <div className="flex w-full items-center bg-white bg-opacity-20 py-2 text-black md:px-8">
        <CategoryLink
          path={categoryFlat.category.slug}
          title={categoryFlat.category.name.toUpperCase()}
        />
        {categoryFlat.subcategory1 && (
          <>
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/right-arrow.svg"
              alt="angle right"
              width="20"
              height="20"
            />
            <CategoryLink
              path={`${categoryFlat.category.slug}/${categoryFlat.subcategory1.slug}`}
              title={categoryFlat.subcategory1.name.toUpperCase()}
            />
          </>
        )}
        {categoryFlat.subcategory2 && (
          <>
            <Image
              className="h-1/2 select-none rounded-full"
              draggable={false}
              src="/img/right-arrow.svg"
              alt="angle right"
              width="20"
              height="20"
            />
            <CategoryLink
              path={`${categoryFlat.category.slug}/${categoryFlat.subcategory1.slug}/${categoryFlat.subcategory2.slug}`}
              title={categoryFlat.subcategory2.name.toUpperCase()}
            />
          </>
        )}
      </div>
    </div>
  );
};

const CategoryLink: React.FC<LinkProps> = ({ path, title }) => (
  <Link href={`/shop/category/${path}`}>
    <div className="group flex h-full w-1/3 cursor-pointer items-center justify-center px-4 text-[13px] active:text-primary sm:text-[15px]">
      <span className="text-center leading-tight group-hover:underline">
        {title}
      </span>
    </div>
  </Link>
);

export default ProductPageCategory;
