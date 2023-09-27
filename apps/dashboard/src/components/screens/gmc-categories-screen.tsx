import React from 'react';
import ScreenSection from './shared/screen-section';

const GmcCategoriesScreen: React.FC = () => {
  return (
    <ScreenSection
      title={'GMC Categories'}
      sortFields={[
        { name: 'code', title: 'Code' },
        { name: 'createdAt', title: 'Created At' },
      ]}
      meta={null}
    ></ScreenSection>
  );
};

export default GmcCategoriesScreen;
