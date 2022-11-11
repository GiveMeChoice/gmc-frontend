import React from 'react';
const markdownStyles = require('./markdown-styles.module.css');
import { PortableText } from '@portabletext/react';

interface Props {
  content: any;
}

export const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div className={`mx-auto max-w-2xl ${markdownStyles.markdown}`}>
      <PortableText value={content} />
    </div>
  );
};
