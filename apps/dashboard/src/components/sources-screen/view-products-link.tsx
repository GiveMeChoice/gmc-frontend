import { useDataDispatch } from '@root/context-providers/data.provider';
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

const ViewProductsLink: React.FC<Props> = ({
  providerId,
  sourceIdentifier,
}) => {
  const filtersDispatch = useFiltersDispatch();
  const dataDispatch = useDataDispatch();
  const navigate = useNavigate();

  const onViewProducts = () => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
      sourceIdentifier,
    };
    filtersDispatch({ type: 'SAVE_FILTERS', value: sourceFilters });
    dataDispatch({ type: 'REFRESH_PRODUCTS', value: { data: [], meta: {} } });
    navigate('/products');
  };

  return <ViewLink title="View Products" onClick={onViewProducts} />;
};

export default ViewProductsLink;
