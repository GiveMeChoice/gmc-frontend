import React from 'react';
import Category from './category';

interface Props {
  categories: any[];
}

const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <section className="mx-4 mb-10 grid grid-cols-1 gap-x-12 gap-y-2 md:mx-10 md:grid-cols-2 lg:mx-16 xl:mx-32">
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
