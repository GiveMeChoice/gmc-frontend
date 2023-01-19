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

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyDZ1v4pyKEieDMNRT1QLzC5wydOG9B25lM',
//   authDomain: 'gmc-torino.firebaseapp.com',
//   projectId: 'gmc-torino',
//   storageBucket: 'gmc-torino.appspot.com',
//   messagingSenderId: '477493094145',
//   appId: '1:477493094145:web:ca78bbab387e9dbc75dd00',
//   measurementId: 'G-86D62N7MVX',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function App() {
  console.log(process.env.VERCEL_ENV);
  console.log('API URL: ' + process.env.API_URL);
  axios.defaults.baseURL = process.env.API_URL;
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
      <Route path="/" element={<Layout />}>
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
    </Routes>
  );
}

export default App;
