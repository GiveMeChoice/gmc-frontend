import React from 'react';
import ScreenSection from './shared/screen-section';

const GmcLabelsScreen: React.FC = () => {
  return (
    <ScreenSection
      title={'GMC Labels'}
      sortFields={[
        { name: 'code', title: 'Code' },
        { name: 'createdAt', title: 'Created At' },
      ]}
      meta={null}
    ></ScreenSection>
  );
};

export default GmcLabelsScreen;
