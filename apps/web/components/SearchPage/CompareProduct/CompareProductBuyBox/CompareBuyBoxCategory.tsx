import { CategoryDocument } from 'gmc-types';
import React, { ReactFragment } from 'react';

interface Props {
  category: CategoryDocument;
}

const CompareBuyBoxCategory: React.FC<Props> = ({ category }) => {
  return (
    <div className="flex items-center gap-x-3 py-0.5 text-[14px] text-zinc-500 underline-offset-2">
      {CategoryLink(
        category.gmcCategory.slug,
        encodeURI(category.gmcCategory.slug)
      )}
      {category.gmcCategory.subcategory && (
        <>
          &gt;
          {CategoryLink(
            category.gmcCategory.subcategory.slug,
            `${encodeURI(category.gmcCategory.slug)}/${encodeURI(
              category.gmcCategory.subcategory.slug
            )}`
          )}
          {category.gmcCategory.subcategory.subcategory && (
            <>
              &gt;
              {CategoryLink(
                category.gmcCategory.subcategory.subcategory.slug,
                `${encodeURI(category.gmcCategory.slug)}/${encodeURI(
                  category.gmcCategory.subcategory.slug
                )}/${category.gmcCategory.subcategory.subcategory.slug}`
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

function CategoryLink(name: string, link: string): ReactFragment {
  return (
    <a
      className="hover:underline"
      href={`/shop/category/${link.toLowerCase()}`}
    >
      {name.toLocaleUpperCase()}
    </a>
  );
}

export default CompareBuyBoxCategory;
