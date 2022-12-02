import { useDataDispatch } from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import productsService from '@root/services/products.service';
import providersService from '@root/services/providers.service';
import runsService from '@root/services/runs.service';
import { PageRequest } from '@root/services/shared/page-request.interface';
import { PageMeta } from '@root/services/shared/page-response.interface';
import sourcesService from '@root/services/sources.service';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageButtonIcon from '../page-button-icon';

interface Props {
  meta: PageMeta;
}

const ScreenSectionMeta: React.FC<Props> = ({ meta }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDataDispatch();
  const { activeFilters } = useFilters();

  useEffect(() => {
    setLoading(false);
  }, [meta]);

  const onNextPage = () => {
    setLoading(true);
    refreshData({ ...meta, page: meta.pageNumber + 1 });
  };

  const onPrevPage = () => {
    setLoading(true);
    refreshData({ ...meta, page: meta.pageNumber - 1 });
  };

  const refreshData = async (pageRequest: PageRequest) => {
    try {
      if (location.pathname.includes('/product-sources')) {
        dispatch({
          type: 'REFRESH_SOURCES',
          value: await sourcesService.search(activeFilters, pageRequest),
        });
      } else if (location.pathname.includes('/providers')) {
        dispatch({
          type: 'REFRESH_PROVIDERS',
          value: await providersService.search(activeFilters, pageRequest),
        });
      } else if (location.pathname.includes('/product-runs')) {
        dispatch({
          type: 'REFRESH_RUNS',
          value: await runsService.search(activeFilters, pageRequest),
        });
      } else if (location.pathname.includes('/products')) {
        dispatch({
          type: 'REFRESH_PRODUCTS',
          value: await productsService.search(activeFilters, pageRequest),
        });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="space-x-1.5">
        <span className="">
          {`${meta.pageNumber * meta.pageSize + 1} - ${
            meta.pageNumber * meta.pageSize + meta.count
          }`}
        </span>
        <span>{`(of ${meta.totalCount})`}</span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          disabled={loading || meta.pageNumber === 0}
          onClick={onPrevPage}
        >
          <PageButtonIcon
            disabled={loading || meta.pageNumber === 0}
            direction="PREV"
            size={8}
          />
        </button>
        <div>
          <span className="font-bold">{meta.pageNumber + 1}</span>
          <span>{' ... '}</span>
          <span>{meta.totalPages}</span>
        </div>
        <button
          disabled={loading || meta.pageNumber === meta.totalPages - 1}
          onClick={onNextPage}
        >
          <PageButtonIcon
            disabled={loading || meta.pageNumber === meta.totalPages - 1}
            direction="NEXT"
            size={8}
          />
        </button>
      </div>
    </div>
  );
};

export default ScreenSectionMeta;
