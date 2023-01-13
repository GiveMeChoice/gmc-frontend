import React from 'react';
import Category from './category';

interface Props {
  categories: any[];
}

const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <section className="mx-10 mb-10 mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:mx-14 md:mx-16 md:mt-0 md:grid-cols-2 lg:mx-20 lg:grid-cols-3 xl:mx-36">
      {categories.map((category) => (
        <Category
          color={category.color}
          description={category.description}
          slug={category.slug}
          title={category.title}
        />
      ))}
    </section>
  );
};

export default CategoryList;
