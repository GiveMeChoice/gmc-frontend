import { CategoryDocument } from 'gmc-types';
import React, { ReactFragment } from 'react';

interface Props {
  category: CategoryDocument;
}

const CompareBuyBoxCategory: React.FC<Props> = ({ category }) => {
  return (
    <div className="flex items-center gap-x-3 pt-1 text-[14px] text-zinc-500 underline-offset-2">
      {CategoryLink(
        category.gmcCategory.name,
        encodeURI(category.gmcCategory.name)
      )}
      {category.gmcCategory.subcategory && (
        <>
          &gt;
          {CategoryLink(
            category.gmcCategory.subcategory.name,
            `${encodeURI(category.gmcCategory.name)}/${encodeURI(
              category.gmcCategory.subcategory.name
            )}`
          )}
          {category.gmcCategory.subcategory.subcategory && (
            <>
              &gt;
              {CategoryLink(
                category.gmcCategory.subcategory.subcategory.name,
                `${encodeURI(category.gmcCategory.name)}/${encodeURI(
                  category.gmcCategory.subcategory.name
                )}/${category.gmcCategory.subcategory.subcategory.name}`
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

function CategoryLink(name: string, link): ReactFragment {
  return (
    <a className="hover:underline" href={`/discover/category/${link}`}>
      {name.toLocaleUpperCase()}
    </a>
  );
}

export default CompareBuyBoxCategory;
