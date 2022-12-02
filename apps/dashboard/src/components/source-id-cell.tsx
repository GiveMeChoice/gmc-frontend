import { useDataDispatch } from '@root/context-providers/data.provider';
import {
  IFilters,
  initialFilters,
  ProviderSelectType,
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CopyIdButton from './copy-id-button';
import ScreenSectionCell from './screen/screen-section-cell';
import cn from 'classnames';

interface Props {
  width: string;
  providerId: string;
  sourceIdentifier: string;
  sourceDescription: string;
  showLink?: boolean;
}

const SourceIdCell: React.FC<Props> = ({
  width,
  providerId,
  sourceIdentifier,
  sourceDescription,
  showLink,
}) => {
  const dataDispatch = useDataDispatch();
  const { options } = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();

  const getProviderKey = (providerId: string) => {
    let match: ProviderSelectType = null;
    if (options.providerSelect.length) {
      match = options.providerSelect.find((s) => s.id === providerId);
    }
    return match ? match.key : 'unknown';
  };

  const onViewSource = (providerId, sourceIdentifier) => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
      sourceIdentifier,
    };
    filtersDispatch({ type: 'SAVE_FILTERS', value: sourceFilters });
    dataDispatch({ type: 'REFRESH_SOURCES', value: { data: [], meta: {} } });
    navigate('/product-sources');
  };

  return (
    <ScreenSectionCell
      styles={`${width} flex flex-col justify-center space-y-1`}
    >
      <h2 className="text-sm font-bold">{getProviderKey(providerId)}</h2>
      <span className="ml-0.5 text-sm font-bold text-gmc-soil">
        {sourceDescription}
      </span>
      <div className="ml-0.5 flex w-full items-center">
        <span
          className={cn('w-full text-sm', {
            'cursor-pointer text-gmc-ocean underline-offset-2 hover:underline':
              showLink,
          })}
          onClick={() => {
            if (showLink) onViewSource(providerId, sourceIdentifier);
          }}
        >
          {sourceIdentifier}
        </span>
        <CopyIdButton id={sourceIdentifier} />
      </div>
    </ScreenSectionCell>
  );
};

export default SourceIdCell;
