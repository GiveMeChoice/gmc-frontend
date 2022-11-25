import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DataProvider } from './context-providers/data.provider';
import { FiltersProvider } from './context-providers/filters.provider';

ReactDOM.render(
  <BrowserRouter>
    <DataProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </DataProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
