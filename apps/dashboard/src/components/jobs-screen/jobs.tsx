import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import jobsService from '@root/services/jobs.service';
import React, { useEffect } from 'react';
import ScreenSection from '../screen/screen-section';
import ScreenSectionRow from '../screen/screen-section-row';
import JobsListRow from './jobs-list-row';

const JobsScreen: React.FC = () => {
  const { jobs } = useData();
  const dispatch = useDataDispatch();

  useEffect(() => {
    jobsService.getAll().then((jobs) => {
      dispatch({ type: 'REFRESH_JOBS', value: jobs });
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
