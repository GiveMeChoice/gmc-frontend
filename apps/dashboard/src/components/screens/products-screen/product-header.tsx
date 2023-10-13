import React from 'react';
import MerchantChip from '../merchants-screen/merchant-chip';
import ProductStatusChip from './product-status-chip';
import ChannelBanner from '../channels-screen/channel-banner';
import { IChannel, IMerchant, IProduct } from 'gmc-types';

interface Props {
  product: IProduct;
}

const ProductHeader: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex items-center justify-between border-zinc-500 p-3 px-6">
      <div className="flex w-full items-center gap-x-12">
        <MerchantChip
          merchant={product.merchant as IMerchant}
          clickable={true}
        />
        <ChannelBanner channel={product.channel as IChannel} />
      </div>
      <ProductStatusChip status={product.status} />
    </div>
  );
};

export default ProductHeader;
