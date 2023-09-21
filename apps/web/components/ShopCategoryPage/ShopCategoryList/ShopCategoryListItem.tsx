import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import cn from 'classnames';
import ShopSubcategoryListItem from './ShopSubcategoryListItem';

interface Props {
  title: string;
  color: string;
  subcategories?: string[];
}

const ShopCategoryListItem: React.FC<Props> = ({
  title,
  color,
  subcategories,
}) => {
  const router = useRouter();
  return (
    <>
      <Link href={`/shop/category/${title.toLowerCase()}`}>
        <div
          className={cn(
            'group flex w-full cursor-pointer items-center gap-x-2 text-[20px]',
            {
              'cursor-default pt-0.5 font-bold':
                (router.query.category as string).toLowerCase() ===
                title.toLowerCase(),
            }
          )}
        >
          <div
            style={{ backgroundColor: color }}
            className={cn('h-0 w-0 rounded-full transition-all duration-150 ', {
              'group-hover:h-2.5 group-hover:w-2.5':
                (router.query.category as string).toLowerCase() !==
                title.toLowerCase(),
            })}
          />
          <span
            className={cn({
              'active:text-zinc-600':
                (router.query.category as string).toLowerCase() !==
                title.toLowerCase(),
            })}
          >
            {title}
          </span>
        </div>
      </Link>
      {(router.query.category as string).toLowerCase() ===
        title.toLowerCase() && (
        <div className="flex flex-col gap-y-0.5 pl-5 pb-1.5">
          {subcategories.map((subcat) => (
            <ShopSubcategoryListItem
              category={title}
              title={subcat}
              color={color}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ShopCategoryListItem;
