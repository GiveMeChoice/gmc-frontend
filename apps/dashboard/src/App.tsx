import axios from 'axios';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import JobsScreen from './components/jobs-screen/jobs';
import Layout from './components/layout';
import ProductsScreen from './components/products';
import Providers from './components/providers-screen/providers';
import Runs from './components/runs';
import Sources from './components/sources-screen/sources';
import {
  useFilters,
  useFiltersDispatch,
} from './context-providers/filters.provider';
import './styles.css';

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  const filtersDispatch = useFiltersDispatch();
  const { filterBarVisible } = useFilters();
  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      console.log(filterBarVisible);
      if (e.key == 'Escape') {
        filtersDispatch({
          type: 'TOGGLE_FILTER_BAR',
        });
      }
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="providers" element={<Providers />} />
        <Route path="product-sources" element={<Sources />} />
        <Route path="source-runs" element={<Runs />} />
        <Route path="products" element={<ProductsScreen />} />
        <Route path="jobs" element={<JobsScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
