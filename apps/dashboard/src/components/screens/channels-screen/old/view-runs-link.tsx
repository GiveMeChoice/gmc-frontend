import {
  initialData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import runsService from '@root/services/runs.service';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ViewLink from '../../shared/view-link';

interface Props {
  providerId?: string;
  sourceIdentifier?: string;
}

const ViewRunsLink: React.FC<Props> = ({ providerId, sourceIdentifier }) => {
  const filtersDispatch = useFiltersDispatch();
  const dataDispatch = useScreenDataDispatch();
  const navigate = useNavigate();

  const onViewRuns = () => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
      channelId: sourceIdentifier,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: sourceFilters });
    dataDispatch({
      type: 'SCREEN_REFRESH_RUNS',
      value: { data: [], meta: initialData.runsMeta },
    });
    navigate(runsService.runsScreenControl.pathname);
  };

  return <ViewLink title="View Runs" onClick={onViewRuns} />;
};

export default ViewRunsLink;
