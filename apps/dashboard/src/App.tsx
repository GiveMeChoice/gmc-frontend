import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/protected-route';
import Layout from './components/layout/layout';
import MappingAssistant from './components/mapping-assistant/mapping-assistant';
import ChannelsScreen from './components/screens/channels-screen';
import JobsScreen from './components/screens/jobs-screen/jobs';
import LoginScreen from './components/screens/login-screen';
import MerchantBrandsScreen from './components/screens/merchant-brands-screen';
import MerchantCategoriesScreen from './components/screens/merchant-categories-screen';
import MerchantLabelsScreen from './components/screens/merchant-labels-screen';
import MerchantsScreen from './components/screens/merchants-screen';
import ProductsScreen from './components/screens/products-screen';
import ProvidersScreen from './components/screens/providers-screen';
import RunsScreen from './components/screens/runs-screen';
import {
  useFilters,
  useFiltersDispatch,
} from './context-providers/filters.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from './context-providers/screen-data.provider';
import channelsService from './services/channels.service';
import merchantBrandsService from './services/merchant-brands.service';
import merchantCategoriesService from './services/merchant-categories.service';
import merchantLabelsService from './services/merchant-labels.service';
import merchantsService from './services/merchants.service';
import productsService from './services/products.service';
import providersService from './services/providers.service';
import runsService from './services/runs.service';
import screensService from './services/screens.service';
import './styles.css';
import { gmcCategoriesService } from './services/gmc-categories.service';
import { gmcLabelsService } from './services/gmc-labels.service';
import { gmcBrandsService } from './services/gmc-brands.service';
import GmcCategoriesScreen from './components/screens/gmc-categories-screen';
import GmcLabelsScreen from './components/screens/gmc-labels-screen';
import GmcBrandsScreen from './components/screens/gmc-brands-screen';

function App() {
  axios.defaults.baseURL = process.env.PI_API_URL;
  const { activeFilters } = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const dataDispatch = useScreenDataDispatch();
  const data = useScreenData();
  useEffect(() => {
    const handleKeydown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'r') {
        try {
          dataDispatch({ type: 'SCREEN_START_LOADING' });
          const action = await screensService.refreshData(activeFilters, data);
          if (action) dataDispatch(action);
        } catch (err) {
          console.error(err);
        } finally {
          dataDispatch({ type: 'SCREEN_END_LOADING' });
        }
      } else if (e.ctrlKey && e.key === 'c') {
        filtersDispatch({ type: 'FILTERS_CLEAR' });
      } else if (e.key === 'Escape') {
        if (data.previewProduct) {
          dataDispatch({
            type: 'CLOSE_PRODUCT_PREVIEW',
          });
        } else {
          filtersDispatch({
            type: 'FILTERS_BAR_TOGGLE',
          });
        }
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [data.previewProduct, activeFilters]);
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/">
          {/* <Route index element={<HomeScreen />} /> */}
          <Route
            index
            element={
              <Navigate to={gmcLabelsService.gmcLabelsScreenControl.pathname} />
            }
          />
          <Route
            path={runsService.runsScreenControl.pathname}
            element={<RunsScreen />}
          />
          <Route
            path={productsService.productsScreenControl.pathname}
            element={<ProductsScreen />}
          />
          <Route path="integration">
            <Route
              index
              element={
                <Navigate
                  to={merchantsService.merchantsScreenControl.pathname}
                />
              }
            />
            <Route
              path={merchantsService.merchantsScreenControl.pathname}
              element={<MerchantsScreen />}
            />
            <Route
              path={providersService.providersScreenControl.pathname}
              element={<ProvidersScreen />}
            />
            <Route
              path={channelsService.channelsScreenControl.pathname}
              element={<ChannelsScreen />}
            />
            <Route
              path={runsService.runsScreenControl.pathname}
              element={<RunsScreen />}
            />
          </Route>
          <Route path="config">
            <Route
              index
              element={
                <Navigate
                  to={gmcCategoriesService.gmcCategoriesScreenControl.pathname}
                  replace
                />
              }
            />
            <Route
              path={gmcCategoriesService.gmcCategoriesScreenControl.pathname}
              element={<GmcCategoriesScreen />}
            />
            <Route
              path={gmcLabelsService.gmcLabelsScreenControl.pathname}
              element={<GmcLabelsScreen />}
            />
            <Route
              path={gmcBrandsService.gmcBrandsScreenControl.pathname}
              element={<GmcBrandsScreen />}
            />
          </Route>
          <Route path="mappings">
            <Route
              index
              element={
                <Navigate
                  to={
                    merchantCategoriesService.categoriesScreenControl.pathname
                  }
                  replace
                />
              }
            />
            <Route
              path={merchantCategoriesService.categoriesScreenControl.pathname}
              element={<MerchantCategoriesScreen />}
            />
            <Route
              path={merchantLabelsService.labelsScreenControl.pathname}
              element={<MerchantLabelsScreen />}
            />
            <Route
              path={merchantBrandsService.brandsScreenControl.pathname}
              element={<MerchantBrandsScreen />}
            />
          </Route>
          <Route path="jobs" element={<JobsScreen />} />
          <Route
            path="products/:shortId/mapping-assistant"
            element={<MappingAssistant />}
          />
        </Route>
      </Route>
      {/* Public Routes \/\/\/ */}
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
