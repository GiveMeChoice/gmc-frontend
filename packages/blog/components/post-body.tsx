import React from 'react';
const markdownStyles = require('./markdown-styles.module.css');
import { PortableText } from '@portabletext/react';

interface Props {
  content: any;
}

export const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div
      className={`mx-auto max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl ${markdownStyles.markdown}`}
    >
      <PortableText value={content} />
    </div>
  );
};
