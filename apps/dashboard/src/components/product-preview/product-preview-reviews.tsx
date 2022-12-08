import { IProduct } from '@root/services/products.service';
import React from 'react';
import cn from 'classnames';
import { toDateString } from '@root/helpers/to-date-string';

interface Props {
  product: Partial<IProduct>;
}

const ProductPreviewReviews: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full flex-col space-y-3 rounded-sm border-2 border-black p-2 text-sm">
      <div className="flex w-full justify-between font-bold">
        <span>Rating: {product.rating ? product.rating : '<rating>'}</span>
        <span>
          Reviews:{' '}
          {product.ratingsTotal ? product.ratingsTotal : '<ratingsTotal>'}
        </span>
      </div>
      <div className="flex flex-col space-y-4 overflow-y-auto ">
        {product.reviews && product.reviews.length ? (
          product.reviews.map((review) => (
            <div className="flex flex-col space-y-1 rounded-md bg-gmc-dune p-2">
              <span>{review.rating ? review.rating : '<rating>'}</span>
              <span>{review.text ? review.text : '<text>'}</span>
              <span>{review.author ? review.author : '<author>'}</span>
              <span>
                {review.submittedOn
                  ? toDateString(review.submittedOn, true)
                  : '<submittedOn>'}
              </span>
            </div>
          ))
        ) : (
          <span>{'<reviews>'}</span>
        )}
      </div>
    </div>
  );
};

export default ProductPreviewReviews;
