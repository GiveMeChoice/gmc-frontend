import { CategoryDocument } from 'gmc-types';
import React, { ReactFragment } from 'react';

interface Props {
  category: CategoryDocument;
}

const ComparableProductBuyBoxCategory: React.FC<Props> = ({ category }) => {
  return (
    <div className="flex w-full gap-x-1.5 text-zinc-500">
      {CategoryLink(
        category.gmcCategory.name,
        encodeURI(category.gmcCategory.name)
      )}
      {category.gmcCategory.subcategory && (
        <>
          {'>'}
          {CategoryLink(
            category.gmcCategory.subcategory.name,
            `${encodeURI(category.gmcCategory.name)}/${encodeURI(
              category.gmcCategory.subcategory.name
            )}`
          )}
          {category.gmcCategory.subcategory.subcategory && (
            <>
              {'>'}
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

function CategoryLink(name, link): ReactFragment {
  return (
    <a className="hover:underline" href={`/discover/category/${link}`}>
      {name}
    </a>
  );
}

export default ComparableProductBuyBoxCategory;
