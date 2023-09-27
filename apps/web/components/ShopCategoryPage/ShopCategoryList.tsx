import React from 'react';
import ShopCategoryListItem from './ShopCategoryList/ShopCategoryListItem';

interface Props {}

const ShopCategoryList: React.FC<Props> = () => {
  return (
    <div className="mx-7 mt-8 mb-6 flex w-full flex-col py-[3px] pl-2 text-zinc-900">
      <ShopCategoryListItem
        title="APPAREL"
        color="#6e79aa"
        subcategories={[
          'subcats & supercats',
          'subcat2 r us',
          'subcat3',
          'subcat4 u my fren',
        ]}
      />
      <ShopCategoryListItem
        title="HOME & KITCHEN"
        color="#aa7ab2"
        subcategories={[
          'subcats & supercats',
          'subcat2 r us',
          'subcat3',
          'subcat4 u my fren',
        ]}
      />
      <ShopCategoryListItem
        title="BATH & BEAUTY"
        color="#adbe00"
        subcategories={[
          'subcats & supercats',
          'subcat2 r us',
          'subcat3',
          'subcat4 u my fren',
        ]}
      />
      <ShopCategoryListItem
        title="BABY"
        color="#dcb586"
        subcategories={[
          'subcats & supercats',
          'subcat2 r us',
          'subcat3',
          'subcat4 u my fren',
        ]}
      />
      <ShopCategoryListItem
        title="PETS"
        color="#f8ff93"
        subcategories={[
          'subcats & supercats',
          'subcat2 r us',
          'subcat3',
          'subcat4 u my fren',
        ]}
      />
    </div>
  );
};

export default ShopCategoryList;
