import { IScreenControl } from './shared/screen-control.interface';

const dashboardScreenControl: IScreenControl = {
  pathname: '/',
  title: 'Dashboard',
  readScreenMeta: () => null,
  refreshData: () => null,
  changePage: () => null,
  sortData: () => null,
};

const dashboardService = {
  dashboardScreenControl,
};
export default dashboardService;
