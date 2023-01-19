import { IScreenControl } from './screen-controls.service';

const dashboardScreenControl: IScreenControl = {
  pathname: '/',
  title: 'Dashboard',
  readScreenMeta: () => null,
  refreshFilters: () => null,
  refreshPage: () => null,
  refreshSort: () => null,
};

const dashboardService = {
  dashboardScreenControl,
};
export default dashboardService;
