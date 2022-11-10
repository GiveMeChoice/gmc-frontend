import React from 'react';
import Avatar from '../components/avatar';
import Date from '../components/date';
import CoverImage from './cover-image';
import Link from 'next/link';

interface Props {
  title: string;
  coverImage: any;
  date: string;
  excerpt: any;
  author: any;
  slug: string;
}

const PostPreview: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) => (
  <div>
    <div className="mb-5">
      <CoverImage slug={slug} title={title} image={coverImage} />
    </div>
    <h3 className="mb-3 text-3xl leading-snug">
      <Link href={`/posts/${slug}`} className="hover:underline">
        {title}
      </Link>
    </h3>
    <div className="mb-4 text-lg">
      <Date dateString={date} />
    </div>
    <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
    {author && <Avatar name={author.name} picture={author.picture} />}
  </div>
);

export default PostPreview;
