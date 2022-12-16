import { useDataDispatch } from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import screenControlsService from '@root/services/screen-controls.service';
import { PageRequest } from '@root/services/shared/page-request.interface';
import { PageMeta } from '@root/services/shared/page-response.interface';
import React, { useEffect, useState } from 'react';
import PageButtonIcon from '../page-button-icon';

interface Props {
  meta: PageMeta;
}

const ScreenSectionMeta: React.FC<Props> = ({ meta }) => {
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
      dispatch(
        await screenControlsService.refreshPage(pageRequest, activeFilters)
      );
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
