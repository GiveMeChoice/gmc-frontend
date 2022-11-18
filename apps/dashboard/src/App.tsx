import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Layout from './components/layout';
import Providers from './components/providers';
import Runs from './components/runs';
import Sources from './components/sources';
import './styles.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="providers" element={<Providers />} />
        <Route path="product-sources" element={<Sources />} />
        <Route path="source-runs" element={<Runs />} />
      </Route>
    </Routes>
  );
}

export default App;
