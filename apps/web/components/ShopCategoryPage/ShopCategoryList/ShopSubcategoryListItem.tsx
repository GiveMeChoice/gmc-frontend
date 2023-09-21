import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import cn from 'classnames';

interface Props {
  category: string;
  title: string;
  color: string;
  subcategories?: string[];
}

const ShopSubcategoryListItem: React.FC<Props> = ({
  category,
  title,
  color,
  subcategories,
}) => {
  const router = useRouter();
  return (
    <>
      <Link href={`/shop/category/${category}/${title}`}>
        <div
          className={cn(
            'group flex w-full cursor-pointer items-center gap-x-2 text-[16px]',
            {
              'cursor-default font-bold':
                router.query.subcategory1 &&
                (router.query.subcategory1 as string).toLowerCase() ===
                  title.toLowerCase(),
            }
          )}
        >
          <div
            style={{ backgroundColor: color }}
            className={cn('h-0 w-0 rounded-full transition-all duration-150', {
              'group-hover:h-2 group-hover:w-2':
                !router.query.subcategory1 ||
                (router.query.subcategory1 as string).toLowerCase() !==
                  title.toLowerCase(),
            })}
          />
          <span className={cn('active:text-zinc-600', {})}>
            {title.toUpperCase()}
          </span>
        </div>
      </Link>
      {router.query.subcategory1 &&
        (router.query.subcategory1 as string).toLowerCase() ===
          title.toLowerCase() &&
        subcategories &&
        subcategories.map(() => <></>)}
    </>
  );
};

export default ShopSubcategoryListItem;
