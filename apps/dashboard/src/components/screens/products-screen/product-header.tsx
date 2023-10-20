import React from 'react';
import MerchantChip from '../merchants-screen/merchant-chip';
import ProductStatusChip from './product-status-chip';
import ChannelBanner from '../channels-screen/channel-banner';
import { IChannel, IMerchant, IProduct } from 'gmc-types';
import ProductIndexedChip from './product-indexed-chip';

interface Props {
  product: IProduct;
}

const ProductHeader: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex items-center justify-between border-zinc-500 p-4 px-6">
      <div className="flex items-center justify-start gap-x-12">
        <MerchantChip
          merchant={product.merchant as IMerchant}
          clickable={true}
        />
        <ChannelBanner channel={product.channel as IChannel} />
      </div>
      <div className="flex items-center gap-x-3">
        <ProductStatusChip status={product.status} />
        <ProductIndexedChip indexed={!!product.indexedAt} />
      </div>
    </div>
  );
};

export default ProductHeader;
