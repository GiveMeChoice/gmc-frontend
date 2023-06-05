import {
  initialData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ViewLink from '../../../shared/view-link';

interface Props {
  providerId: string;
}

const ViewSourcesLink: React.FC<Props> = ({ providerId }) => {
  const dataDispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();

  const onViewSources = () => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: sourceFilters });
    dataDispatch({
      type: 'SCREEN_REFRESH_CHANNELS',
      value: { data: [], meta: initialData.channelsMeta },
    });
    navigate('/product-sources/sources');
  };

  return <ViewLink title="View Sources" onClick={onViewSources} />;
};

export default ViewSourcesLink;
