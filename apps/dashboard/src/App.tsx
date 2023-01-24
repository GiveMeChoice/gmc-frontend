import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/protected-route';
import BrandsScreen from './components/brands';
import CategoriesScreen from './components/categories';
import Home from './components/home';
import JobsScreen from './components/jobs-screen/jobs';
import LabelsScreen from './components/labels';
import Layout from './components/layout';
import LoginScreen from './components/login-screen';
import MappingAssistant from './components/mapping-assistant';
import ProductsScreen from './components/products';
import Providers from './components/providers-screen/providers';
import RunsScreen from './components/runs';
import SearchScreen from './components/search';
import Sources from './components/sources-screen/sources';
import { useData, useDataDispatch } from './context-providers/data.provider';
import { useFiltersDispatch } from './context-providers/filters.provider';
import './styles.css';

function App() {
  axios.defaults.baseURL = process.env.PI_API_URL;
  const filtersDispatch = useFiltersDispatch();
  const dataDisptach = useDataDispatch();
  const { previewProduct } = useData();
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        if (previewProduct) {
          dataDisptach({
            type: 'CLOSE_PRODUCT_PREVIEW',
          });
        } else {
          filtersDispatch({
            type: 'TOGGLE_FILTER_BAR',
          });
        }
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [previewProduct]);
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
          <Route index element={<Home />} />
          <Route path="providers" element={<Providers />} />
          <Route path="product-sources" element={<Sources />} />
          <Route path="product-runs" element={<RunsScreen />} />
          <Route path="products" element={<ProductsScreen />} />
          <Route path="mappings">
            <Route index element={<Navigate to="labels" replace />} />
            <Route path="labels" element={<LabelsScreen />} />
            <Route path="categories" element={<CategoriesScreen />} />
            <Route path="brands" element={<BrandsScreen />} />
          </Route>
          <Route path="jobs" element={<JobsScreen />} />
          <Route path="search" element={<SearchScreen />} />
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
