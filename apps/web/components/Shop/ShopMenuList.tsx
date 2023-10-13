import React from 'react';

interface Props {
  title: string;
}

const ShopMenuList: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="mx-8 mt-10 flex flex-col divide-y divide-secondary-dark-10 pl-2">
      <div className="pl-1 text-[22px] font-bold">{title}</div>
      <div className="flex w-full flex-col gap-y-1 py-1.5 text-[19px]">
        {children}
      </div>
    </div>
  );
};

export default ShopMenuList;
