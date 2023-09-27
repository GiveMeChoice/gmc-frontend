import React from 'react';
import ScreenSection from './shared/screen-section';

const GmcBrandsScreen: React.FC = () => {
  return (
    <ScreenSection
      title={'GMC Brands'}
      sortFields={[
        { name: 'code', title: 'Code' },
        { name: 'createdAt', title: 'Created At' },
      ]}
      meta={null}
    ></ScreenSection>
  );
};

export default GmcBrandsScreen;
