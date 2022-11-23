import React from 'react';
import ScreenSectionTitle from './screen-section-title';

interface Props {
  title: string;
}

const ScreenSection: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="space-y-2 divide-y divide-zinc-900 rounded-md bg-secondary px-6 pt-2  pb-6">
      <ScreenSectionTitle title={title} />
      {children}
    </div>
  );
};

export default ScreenSection;
