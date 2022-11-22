import React from 'react';
import ScreenSection from './screen/screen-section';
import ScreenSectionRow from './screen/screen-section-row';

const Sources: React.FC = () => (
  <>
    <ScreenSection title={'Filters'}>
      <ScreenSectionRow>
        <h1>Filter...</h1>
      </ScreenSectionRow>
    </ScreenSection>
    <ScreenSection title={'Product Sources'}>
      <ScreenSectionRow>
        <h1>Some data...</h1>
      </ScreenSectionRow>
      <ScreenSectionRow>
        <h1>Some data...</h1>
      </ScreenSectionRow>
      <ScreenSectionRow>
        <h1>Some data...</h1>
      </ScreenSectionRow>
      <ScreenSectionRow>
        <h1>Some data...</h1>
      </ScreenSectionRow>
    </ScreenSection>
  </>
);

export default Sources;
