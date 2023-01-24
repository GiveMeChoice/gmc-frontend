import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/auth/auth.provider';
import { DataProvider } from './context-providers/data.provider';
import { FiltersProvider } from './context-providers/filters.provider';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
