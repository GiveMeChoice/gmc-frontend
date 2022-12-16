import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BrandsScreen from './components/brands';
import CategoriesScreen from './components/categories';
import Home from './components/home';
import JobsScreen from './components/jobs-screen/jobs';
import LabelsScreen from './components/labels';
import Layout from './components/layout';
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
  axios.defaults.baseURL = 'http://localhost:5000';
  const filtersDispatch = useFiltersDispatch();
  const { previewProduct } = useData();
  const dataDisptach = useDataDispatch();
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
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Home />} />
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
    </Routes>
  );
}

export default App;
