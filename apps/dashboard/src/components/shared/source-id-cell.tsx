import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import cn from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenSectionCell from '../screens/shared/screen-section-cell';
import CopyIdButton from './copy-id-button';

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
  const dataDispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();
  const masterData = useMasterData();

  const onViewSource = (providerId, sourceIdentifier) => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
      channelId: sourceIdentifier,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: sourceFilters });
    dataDispatch({
      type: 'SCREEN_REFRESH_CHANNELS',
      value: { data: [], meta: {} },
    });
    navigate('/product-sources/sources');
  };

  return (
    <ScreenSectionCell
      styles={`w-44 break-all flex flex-col justify-center space-y-1`}
    >
      <h2 className="text-sm font-bold">
        {masterData.readProviderKey(providerId)}
      </h2>
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
