import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import jobsService from '@root/services/jobs.service';
import React, { useEffect } from 'react';
import ScreenSection from '../shared/screen-section';
import ScreenSectionRow from '../shared/screen-section-row';
import JobsListRow from './jobs-list-row';

const JobsScreen: React.FC = () => {
  const { jobs } = useScreenData();
  const dispatch = useScreenDataDispatch();

  useEffect(() => {
    jobsService.getAll().then((jobs) => {
      dispatch({ type: 'SCREEN_REFRESH_JOBS', value: jobs });
    });
  }, []);

  return (
    <ScreenSection title="Jobs">
      {jobs.length ? (
        jobs.map((j, i) => <JobsListRow key={i} job={j} />)
      ) : (
        <ScreenSectionRow>
          <h1>Loading...</h1>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default JobsScreen;
