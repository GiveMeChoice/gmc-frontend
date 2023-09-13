import React from 'react';
import { PostPreview } from './post-preview';

interface Props {
  title?: boolean;
  posts: any[];
}

export const MoreStories: React.FC<Props> = ({ title, posts }) => {
  return (
    <section>
      {title && (
        <h2 className="mb-8 text-5xl font-bold leading-tight tracking-normal md:text-7xl">
          More Posts
        </h2>
      )}

      <div className="mb-28 grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-14 md:gap-y-20 lg:gap-x-20">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            categories={post.categories}
          />
        ))}
      </div>
    </section>
  );
};
