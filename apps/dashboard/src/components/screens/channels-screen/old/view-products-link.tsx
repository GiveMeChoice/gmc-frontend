import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ViewLink from '../../shared/view-link';

interface Props {
  providerId?: string;
  sourceIdentifier?: string;
}

const ViewProductsLink: React.FC<Props> = ({
  providerId,
  sourceIdentifier,
}) => {
  const filtersDispatch = useFiltersDispatch();
  const dataDispatch = useScreenDataDispatch();
  const navigate = useNavigate();

  const onViewProducts = () => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
      channelId: sourceIdentifier,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: sourceFilters });
    dataDispatch({
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: { data: [], meta: {} },
    });
    navigate('/products');
  };

  return <ViewLink title="View Products" onClick={onViewProducts} />;
};

export default ViewProductsLink;
