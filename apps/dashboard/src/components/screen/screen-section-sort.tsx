import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import screenControlsService from '@root/services/screen-controls.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

interface Props {
  fields: SortField[];
}

export type SortField = {
  name: string;
  title: string;
};

const ScreenSectionSort: React.FC<Props> = ({ fields }) => {
  const { activeFilters } = useFilters();
  const data = useData();
  const dataDispatch = useDataDispatch();
  const [activeField, setActiveField] = useState('');
  const [activeDirection, setActiveDirection] = useState('');

  useEffect(() => {
    const { sort, direction } = getCurrentSort();
    console.log('current sort: ' + sort + ' ' + direction);
    setActiveField(sort);
    setActiveDirection(direction);
  }, []);

  const handleSelectField = (e) => {
    let fieldName = e.target.id;
    let direction = '';
    if (activeField === fieldName) {
      if (activeDirection === 'DESC') {
        direction = 'ASC';
      } else {
        // remove sort from field
        fieldName = '';
        direction = '';
      }
    } else {
      direction = 'DESC';
    }
    setActiveField(fieldName);
    setActiveDirection(direction);
    refreshData(fieldName, direction);
  };

  const refreshData = async (fieldName, direction) => {
    dataDispatch(
      await screenControlsService.refreshSort(
        fieldName,
        direction,
        activeFilters,
        data
      )
    );
  };

  const getCurrentSort = () => {
    return screenControlsService.readScreenMeta(data);
  };

  return (
    <div className="mb-1 flex flex-wrap divide-x divide-white rounded-full text-xs font-bold ">
      {fields.map((field, i) => (
        <button
          key={i}
          id={field.name}
          className={cn('mt-1 h-7 w-24', {
            'rounded-l-full': i === 0,
            'rounded-r-full': i === fields.length - 1,
            'bg-zinc-800 text-white': activeField !== field.name,
            'bg-gmc-sunset text-zinc-800':
              activeField === field.name && activeDirection === 'ASC',
            'bg-gmc-surf text-zinc-800':
              activeField === field.name && activeDirection === 'DESC',
          })}
          onClick={handleSelectField}
        >
          {activeField === field.name && (
            <span className="mr-1">
              {activeDirection === 'ASC' ? 'Δ' : 'ᐁ'}
            </span>
          )}
          {field.title}
        </button>
      ))}
    </div>
  );
};

export default ScreenSectionSort;
