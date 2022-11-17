import React from 'react';
import { Avatar } from '../components/avatar';
import { Date } from '../components/date';
import { CoverImage } from '../components/cover-image';
import { PostTitle } from '../components/post-title';
import PostSocialShare from './post-social-share';
import PostCategories from './post-categories';

interface Props {
  title: string;
  coverImage: any;
  date: string;
  author: any;
  categories: any;
  readingTime: any;
}

export const PostHeader: React.FC<Props> = ({
  title,
  coverImage,
  date,
  author,
  categories,
  readingTime,
}) => (
  <>
    <PostTitle>{title}</PostTitle>
    <div className="mb-8 flex items-center justify-between space-x-3">
      <div className="flex flex-col items-start space-y-6 text-lg">
        {author && <Avatar name={author.name} picture={author.picture} />}
        <div className="flex flex-row items-center justify-between space-x-6 text-lg">
          <Date dateString={date} />
          <span>{readingTime.text}</span>
        </div>
      </div>
      <div className="hidden flex-col items-end space-y-6 md:flex">
        <PostSocialShare title={title} />
        {categories && <PostCategories categories={categories} />}
      </div>
    </div>
    <div className="mb-8 sm:mx-0 md:mb-16">
      <CoverImage title={title} image={coverImage} priority />
    </div>
    <div className="flex flex-col items-start space-y-6 md:hidden">
      <PostSocialShare title={title} />
      {categories && <PostCategories categories={categories} />}
    </div>
  </>
);
