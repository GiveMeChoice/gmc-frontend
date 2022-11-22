import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Layout from './components/layout';
import ProvidersScreen from './components/providers/providers-screen';
import Runs from './components/runs';
import Sources from './components/sources';
import './styles.css';

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="providers" element={<ProvidersScreen />} />
        <Route path="product-sources" element={<Sources />} />
        <Route path="source-runs" element={<Runs />} />
      </Route>
    </Routes>
  );
}

export default App;
