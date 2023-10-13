import { INestedEntity } from 'gmc-types';

export interface IEntityPageData {
  roots: INestedEntity[];
  pageTree: INestedEntity;
  entity: INestedEntity;
  slug: string;
  subslug1?: string;
  subslug2?: string;
}
