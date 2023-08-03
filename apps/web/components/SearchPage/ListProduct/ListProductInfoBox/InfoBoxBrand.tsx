import { BrandDocument } from 'gmc-types';
import React from 'react';

interface Props {
  brand: BrandDocument;
}

const InfoBoxBrand: React.FC<Props> = ({ brand }) => {
  return (
    <div className="flex items-center justify-center gap-1 border-1.5 border-zinc-400 bg-white py-1.5 px-2.5 text-zinc-500">
      <span className="whitespace-nowrap text-xs">
        {`${brand.name.substring(0, 30).trim().toLocaleUpperCase()}${
          brand.name.length > 30 ? '...' : ''
        }`}
      </span>
    </div>
  );
};

export default InfoBoxBrand;
