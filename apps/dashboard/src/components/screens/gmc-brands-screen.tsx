import React, { useEffect, useState } from 'react';
import ScreenSection from './shared/screen-section';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import ScreenSectionRow from './shared/screen-section-row';
import { gmcBrandsService } from '@root/services/gmc-brands.service';
import { useFilters } from '@root/context-providers/filters.provider';
import CreateGmcBrandDialog from './gmc-brands-screen/create-gmc-brand-dialog';
import GmcBrandListItem from './gmc-brands-screen/gmc-brand-list-item';

const GmcBrandsScreen: React.FC = () => {
  const { gmcBrands, gmcBrandsMeta } = useScreenData();
  const dispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!gmcBrands.length) {
      setLoading(true);
      gmcBrandsService
        .find(activeFilters, gmcBrandsMeta)
        .then((labels) => {
          dispatch({
            type: 'SCREEN_REFRESH_GMC_BRANDS',
            value: labels,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleCreateRequest = () => {
    setCreating(true);
  };

  return (
    <div className="w-[100%]">
      <ScreenSection
        title={'GMC Brands'}
        sortFields={[{ name: 'name', title: 'Name' }]}
        meta={gmcBrandsMeta}
        onCreateRequest={handleCreateRequest}
      >
        {creating && (
          <CreateGmcBrandDialog onClose={() => setCreating(false)} />
        )}
        {gmcBrands.length ? (
          gmcBrands.map((gmcBrand, i) => (
            <ScreenSectionRow key={i}>
              <GmcBrandListItem gmcBrand={gmcBrand} />
            </ScreenSectionRow>
          ))
        ) : (
          <ScreenSectionRow>
            <span className="m-3 ml-6 text-sm italic">
              {loading ? 'Loading...' : 'No GMC Brands Found'}
            </span>
          </ScreenSectionRow>
        )}
      </ScreenSection>
    </div>
  );
};

export default GmcBrandsScreen;
