import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import { PageRequest } from './page-request.interface';
import { PageMeta } from './page-response.interface';

export interface IScreenControl {
  // relative path that identifies screen as currently rendered
  pathname: string;

  // displayed title of screen
  title: string;

  // return screen's current page and sort
  readScreenMeta(data: IScreenData): PageMeta;

  // fetch and refresh this screen's data against current filters and page/sort meta
  refreshData(filters: IFilters, data: IScreenData): Promise<ScreenDataAction>;

  // fetch different page of data against current filters
  changePage(page: PageRequest, filters: IFilters): Promise<ScreenDataAction>;

  // change sort field or direction of data against current filters
  sortData(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction>;
}
