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
  providerId: string;
}

const ViewSourcesLink: React.FC<Props> = ({ providerId }) => {
  const dataDispatch = useDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();

  const onViewSources = () => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
    };
    filtersDispatch({ type: 'SAVE_FILTERS', value: sourceFilters });
    dataDispatch({
      type: 'REFRESH_SOURCES',
      value: { data: [], meta: initialData.sourcesMeta },
    });
    navigate('/product-sources/sources');
  };

  return <ViewLink title="View Sources" onClick={onViewSources} />;
};

export default ViewSourcesLink;
