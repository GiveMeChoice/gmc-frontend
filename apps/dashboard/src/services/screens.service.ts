import {
  ScreenDataAction,
  IScreenData,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import channelsService from './channels.service';
import dashboardService from './dashboard.service';
import jobsService from './jobs.service';
import merchantBrandsService from './merchant-brands.service';
import merchantCategoriesService from './merchant-categories.service';
import merchantLabelsService from './merchant-labels.service';
import productsService from './products.service';
import providersService from './providers.service';
import runsService from './runs.service';
import { PageRequest } from './shared/page-request.interface';
import { PageMeta } from './shared/page-response.interface';
import { IScreenControl } from './shared/screen-control.interface';
import merchantsService from './merchants.service';

/* 
  Contains array of screen-controls, which are used to dispatch
  screen refresh functions to the currently active screen
*/
class ScreensService {
  constructor(private screenControls: IScreenControl[]) {}

  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    const match = this.screenControls.find((s) => this.isActive(s));
    return await match.refreshData(filters, data);
  }

  async sortData(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IScreenData
  ) {
    const match = this.screenControls.find((s) => this.isActive(s));
    return await match.sortData(sort, direction, filters, data);
  }

  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    const match = this.screenControls.find((s) => this.isActive(s));
    return await match.changePage(page, filters);
  }

  getCurrentScreenMeta(data: IScreenData): PageMeta {
    const match = this.screenControls.find((s) => this.isActive(s));
    return match.readScreenMeta(data);
  }

  getCurrentScreen() {
    const match = this.screenControls.find((s) => this.isActive(s));
    return match;
  }

  isActive(screen: IScreenControl): boolean {
    return this.isActivePath(screen.pathname);
  }

  isActivePath(path: string): boolean {
    return path === '/'
      ? location.pathname === '/'
      : location.pathname.includes(path);
  }
}

const screensService = new ScreensService([
  dashboardService.dashboardScreenControl,
  providersService.providersScreenControl,
  channelsService.channelsScreenControl,
  runsService.runsScreenControl,
  productsService.productsScreenControl,
  // productsService.mappingAssistantScreenControl,
  // productsService.searchScreenControl,
  merchantsService.merchantsScreenControl,
  merchantLabelsService.labelsScreenControl,
  merchantCategoriesService.categoriesScreenControl,
  merchantBrandsService.brandsScreenControl,
  jobsService.jobsScreenControl,
]);

export default screensService;
