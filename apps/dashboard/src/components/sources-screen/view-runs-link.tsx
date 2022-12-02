import {
  initialData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ViewLink from '../view-link';

interface Props {
  providerId?: string;
  sourceIdentifier?: string;
}

const ViewRunsLink: React.FC<Props> = ({ providerId, sourceIdentifier }) => {
  const filtersDispatch = useFiltersDispatch();
  const dataDispatch = useDataDispatch();
  const navigate = useNavigate();

  const onViewRuns = () => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
      sourceIdentifier,
    };
    filtersDispatch({ type: 'SAVE_FILTERS', value: sourceFilters });
    dataDispatch({
      type: 'REFRESH_RUNS',
      value: { data: [], meta: initialData.runsMeta },
    });
    navigate('/product-runs');
  };

  return <ViewLink title="View Runs" onClick={onViewRuns} />;
};

export default ViewRunsLink;
