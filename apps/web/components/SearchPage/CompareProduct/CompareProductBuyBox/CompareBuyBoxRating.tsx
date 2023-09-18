import React from 'react';

interface Props {
  rating: number;
}

const CompareBuyBoxRating: React.FC<Props> = ({ rating }) => {
  return (
    <div className="flex items-center justify-center">
      {[...Array(Math.floor(rating))].map((i) => (
        <>star</>
      ))}
    </div>
  );
};

export default CompareBuyBoxRating;
