import { DataAction, IData } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import { matchesLocation } from '@root/helpers/matches-location';
import brandsService from './brands.service';
import categoriesService from './categories.service';
import dashboardService from './dashboard.service';
import jobsService from './jobs.service';
import labelsService from './labels.service';
import productsService from './products.service';
import providersService from './providers.service';
import runsService from './runs.service';
import { PageRequest } from './shared/page-request.interface';
import { PageMeta } from './shared/page-response.interface';
import sourcesService from './sources.service';

export interface IScreenControl {
  pathname: string;
  title: string;
  readScreenMeta(data: IData): PageMeta;
  // apply updated filters against current screen meta to refresh screen data
  refreshData(filters: IFilters, data: IData): Promise<DataAction>;
  // apply updated page against current filters
  refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction>;
  // apply updated sort/direction against current page and filters
  refreshSort(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IData
  ): Promise<DataAction>;
}

const refreshData = async (
  filters: IFilters,
  data: IData
): Promise<DataAction> => {
  const match = screenControls.find((s) => matchesLocation(s.pathname));
  return await match.refreshData(filters, data);
};

const refreshSort = async (
  sort: string,
  direction: string,
  filters: IFilters,
  data: IData
) => {
  const match = screenControls.find((s) => matchesLocation(s.pathname));
  return await match.refreshSort(sort, direction, filters, data);
};

const refreshPage = async (
  page: PageRequest,
  filters: IFilters
): Promise<DataAction> => {
  const match = screenControls.find((s) => matchesLocation(s.pathname));
  return await match.refreshPage(page, filters);
};

const readScreenMeta = (data: IData): PageMeta => {
  const match = screenControls.find((s) => matchesLocation(s.pathname));
  return match.readScreenMeta(data);
};

const getCurrentScreenTitle = () => {
  const match = screenControls.find((s) => matchesLocation(s.pathname));
  return match ? match.title : '<title>';
};

const screenControls: IScreenControl[] = [
  dashboardService.dashboardScreenControl,
  providersService.providersScreenControl,
  sourcesService.sourcesScreenControl,
  runsService.runsScreenControl,
  productsService.productsScreenControl,
  productsService.mappingAssistantScreenControl,
  productsService.searchScreenControl,
  labelsService.labelsScreenControl,
  categoriesService.categoriesScreenControl,
  brandsService.brandsScreenControl,
  jobsService.jobsScreenControl,
];

const screenControlsService = {
  refreshData,
  refreshSort,
  refreshPage,
  readScreenMeta,
  getCurrentScreenTitle,
};

export default screenControlsService;
