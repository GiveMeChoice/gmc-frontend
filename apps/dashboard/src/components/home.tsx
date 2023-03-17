import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import providersService, { IProvider } from '@root/services/providers.service';
import sourcesService from '@root/services/sources.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenContainer from './screen/screen-container';
import ScreenSection from './screen/screen-section';

const Home: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);
  const data = useData();
  const { activeFilters } = useFilters();
  const dataDispatch = useDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    providersService.find({}, {}).then((p) => {
      setProviders(p.data);
    });
  }, []);

  const handleViewSources = async (providerId: string) => {
    filtersDispatch({
      type: 'SAVE_FILTERS',
      value: {
        providerId,
      },
    });
    const action = await sourcesService.sourcesScreenControl.refreshData(
      { providerId },
      data
    );
    if (action) dataDispatch(action);
    navigate(sourcesService.sourcesScreenControl.pathname);
  };

  return (
    <div className="flex h-full w-full flex-col p-2">
      {/* <div className="h-16 w-full bg-secondary">Region: UK</div> */}
      <ScreenContainer>
        <div className="flex flex-wrap justify-evenly gap-8">
          {providers.map((p) => (
            <ScreenSection>
              <div className="flex max-w-sm flex-col gap-2.5 py-2">
                <div
                  className="group flex w-full cursor-pointer flex-col gap-2.5 rounded-md border-1.5 border-zinc-500 px-4 py-3 hover:bg-secondary-dark-10 active:bg-secondary-dark-20"
                  onClick={() => navigate('/providers')}
                >
                  <div className="flex w-full items-center justify-between px-2">
                    <span className="font-bold text-gmc-berry-dark-20 group-hover:underline">
                      {p.key}
                    </span>
                    <span
                      className={cn(
                        'rounded-full border border-zinc-500 py-1 px-2.5 text-center text-xs font-bold text-zinc-800',
                        {
                          'bg-primary': p.active,
                          'bg-gmc-heart': !p.active,
                        }
                      )}
                    >
                      {p.active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  {/* <hr className="border-black" /> */}
                  <span className="mt-1.5 py-1 text-center text-sm">
                    {p.description}
                  </span>
                </div>
                <div className="m-2 flex flex-wrap justify-evenly gap-4">
                  <button
                    className="group flex h-14 w-32 flex-col items-center justify-center gap-1 rounded-md border-1.5 border-zinc-500 bg-gmc-dune-light-50 px-2 py-8 text-sm shadow-sm hover:bg-gmc-dune-light-30 active:bg-gmc-dune"
                    onClick={() => handleViewSources(p.id)}
                  >
                    <span className="text-xs group-hover:underline">
                      SOURCES
                    </span>
                    <span className="font-bold">{p.sourcesCount}</span>
                  </button>
                  <button className="group flex h-14 w-32 flex-col items-center justify-center gap-1 rounded-md border-1.5 border-zinc-500 bg-gmc-dune-light-50 px-2 py-8 text-sm shadow-sm hover:bg-gmc-dune-light-30 active:bg-gmc-dune">
                    <span className="text-xs group-hover:underline">
                      PRODUCTS
                    </span>
                    <span className="font-bold">{p.productCount}</span>
                  </button>
                  <button className="group flex h-14 w-32 flex-col items-center justify-center gap-1 rounded-md border-1.5 border-zinc-500 bg-gmc-dune-light-50 px-2 py-8 text-sm shadow-sm hover:bg-gmc-dune-light-30 active:bg-gmc-dune">
                    <span className="text-xs group-hover:underline">
                      CATEGORIES
                    </span>
                    <span className="font-bold">{p.categoryCount}</span>
                  </button>
                  <button className="group flex h-14 w-32 flex-col items-center justify-center gap-1 rounded-md border-1.5 border-zinc-500 bg-gmc-dune-light-50 px-2 py-8 text-sm shadow-sm hover:bg-gmc-dune-light-30 active:bg-gmc-dune">
                    <span className="text-xs group-hover:underline">
                      LABELS
                    </span>
                    <span className="font-bold">{p.labelCount}</span>
                  </button>
                </div>
              </div>
            </ScreenSection>
          ))}
        </div>
      </ScreenContainer>
    </div>
  );
};

export default Home;
