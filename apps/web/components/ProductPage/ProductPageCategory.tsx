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
    <div className="flex w-full py-2 px-8 text-[15px] text-zinc-700">
      <CategoryLink
        path={categoryFlat.category.slug}
        title={categoryFlat.category.name.toUpperCase()}
      />
      {categoryFlat.subcategory1 && (
        <>
          <Image
            className="select-none rounded-full"
            draggable={false}
            src="/img/angle-right.svg"
            alt="angle right"
            width="15"
            height="15"
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
            className="select-none rounded-full"
            draggable={false}
            src="/img/angle-right.svg"
            alt="angle right"
            width="15"
            height="15"
          />
          <CategoryLink
            path={`${categoryFlat.category.slug}/${categoryFlat.subcategory1.slug}/${categoryFlat.subcategory2.slug}`}
            title={categoryFlat.subcategory2.name.toUpperCase()}
          />
        </>
      )}
    </div>
  );
};

const CategoryLink: React.FC<LinkProps> = ({ path, title }) => (
  <Link href={`/shop/category/${path}`}>
    <div className="group flex h-full cursor-pointer items-center justify-center px-4 active:text-primary">
      <span className="group-hover:underline">{title}</span>
    </div>
  </Link>
);

export default ProductPageCategory;
