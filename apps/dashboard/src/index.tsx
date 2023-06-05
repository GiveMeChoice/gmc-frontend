import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/auth/auth.provider';
import { ScreenDataProvider } from './context-providers/screen-data.provider';
import { FiltersProvider } from './context-providers/filters.provider';
import { MasterDataProvider } from './context-providers/master-data.provider';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <MasterDataProvider>
        <ScreenDataProvider>
          <FiltersProvider>
            <App />
          </FiltersProvider>
        </ScreenDataProvider>
      </MasterDataProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
