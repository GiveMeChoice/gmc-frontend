import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import jobsService from '@root/services/jobs.service';
import productsService from '@root/services/products.service';
import providersService from '@root/services/providers.service';
import runsService from '@root/services/runs.service';
import sourcesService from '@root/services/sources.service';
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
    if (location.pathname.includes('/providers')) {
      dataDispatch({
        type: 'REFRESH_PROVIDERS',
        value: await providersService.search(activeFilters, {
          ...data.providersMeta,
          sort: fieldName,
          direction,
        }),
      });
    } else if (location.pathname.includes('/product-sources')) {
      dataDispatch({
        type: 'REFRESH_SOURCES',
        value: await sourcesService.search(activeFilters, {
          ...data.sourcesMeta,
          sort: fieldName,
          direction,
        }),
      });
    } else if (location.pathname.includes('/product-runs')) {
      dataDispatch({
        type: 'REFRESH_RUNS',
        value: await runsService.search(activeFilters, {
          ...data.runsMeta,
          sort: fieldName,
          direction,
        }),
      });
    } else if (location.pathname.includes('/products')) {
      dataDispatch({
        type: 'REFRESH_PRODUCTS',
        value: await productsService.search(activeFilters, {
          ...data.productsMeta,
          sort: fieldName,
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
    } else if (location.pathname.includes('/product-runs')) {
      return data.runsMeta;
    } else if (location.pathname.includes('/products')) {
      return data.productsMeta;
    } else if (location.pathname.includes('/jobs')) {
    }
  };
  return (
    <div className="mb-4 flex h-7 w-1/2 justify-evenly divide-x divide-white rounded-full bg-zinc-800 text-xs font-bold text-white">
      {fields.map((field, i) => (
        <button
          key={i}
          id={field.name}
          className={cn('h-full flex-grow lg:w-20', {
            'rounded-l-full': i === 0,
            'rounded-r-full': i === fields.length - 1,
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
