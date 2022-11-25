import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import jobsService from '@root/services/jobs.service';
import providersService from '@root/services/providers.service';
import sourcesService from '@root/services/sources.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

interface Props {
  fields: string[];
}

const ScreenSectionSort: React.FC<Props> = ({ fields }) => {
  const { activeFilters } = useFilters();
  const data = useData();
  const dataDispatch = useDataDispatch();
  const [activeField, setActiveField] = useState('');
  const [activeDirection, setActiveDirection] = useState('');

  useEffect(() => {
    const { sort, direction } = getCurrentSort();
    setActiveField(sort);
    setActiveDirection(direction);
  }, []);

  const handleSelectField = (e) => {
    let field = e.target.id;
    let direction = '';
    if (activeField === field) {
      if (activeDirection === 'DESC') {
        direction = 'ASC';
      } else {
        // remove sort from field
        field = '';
        direction = '';
      }
    } else {
      direction = 'DESC';
    }
    setActiveField(field);
    setActiveDirection(direction);
    refreshData(field, direction);
  };

  const refreshData = async (field, direction) => {
    console.log('refreshing sort...', field, direction);
    if (location.pathname.includes('/providers')) {
      dataDispatch({
        type: 'REFRESH_PROVIDERS',
        value: await providersService.search(activeFilters, {
          ...data.providersMeta,
          sort: field,
          direction,
        }),
      });
    } else if (location.pathname.includes('/product-sources')) {
      dataDispatch({
        type: 'REFRESH_SOURCES',
        value: await sourcesService.search(activeFilters, {
          ...data.sourcesMeta,
          sort: field,
          direction,
        }),
      });
    } else if (location.pathname.includes('/jobs')) {
      dataDispatch({
        type: 'REFRESH_JOBS',
        value: await jobsService.getAll(),
      });
    }
  };
  const getCurrentSort = () => {
    if (location.pathname.includes('/providers')) {
      return data.providersMeta;
    } else if (location.pathname.includes('/product-sources')) {
      return data.sourcesMeta;
    } else if (location.pathname.includes('/jobs')) {
    }
  };
  return (
    <div className="mb-4 flex h-7 w-1/2 justify-evenly divide-x divide-white rounded-full bg-zinc-800 text-xs font-bold text-white">
      {fields.map((field, i) => (
        <button
          key={i}
          id={field}
          className={cn('h-full flex-grow lg:w-20', {
            'rounded-l-full': i === 0,
            'rounded-r-full': i === fields.length - 1,
            'bg-gmc-sunset text-zinc-800':
              activeField === field && activeDirection === 'ASC',
            'bg-gmc-surf text-zinc-800':
              activeField === field && activeDirection === 'DESC',
          })}
          onClick={handleSelectField}
        >
          {field}
        </button>
      ))}
    </div>
  );
};

export default ScreenSectionSort;
