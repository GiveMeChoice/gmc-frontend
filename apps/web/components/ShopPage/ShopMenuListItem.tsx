import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  color: string;
  path: string;
}

const ShopMenuListItem: React.FC<Props> = ({ title, color, path }) => {
  return (
    <Link href={`/shop${path}`}>
      <div className="group flex w-full cursor-pointer items-center gap-x-2">
        <div
          style={{ backgroundColor: color }}
          className="h-0 w-0 rounded-full transition-all duration-150 group-hover:h-2.5 group-hover:w-2.5"
        />
        <span className="active:text-zinc-600">{title}</span>
      </div>
    </Link>
  );
};

export default ShopMenuListItem;
