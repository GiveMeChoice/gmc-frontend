import { IUserProfile } from '../components/UserProvider';

export enum Theme {
  GMC_DEFAULT = 'GMC_DEFAULT',
  GMC_DUNE = 'GMC_DUNE',
  GMC_JUNGLE = 'GMC_JUNGLE',
  GMC_FOREST = 'GMC_FOREST',
  GMC_HEART = 'GMC_HEART',
  GMC_GLACIER = 'GMC_GLACIER',
  GMC_BEACH = 'GMC_BEACH',
  GMC_SURF = 'GMC_SURF',
  GMC_SOIL = 'GMC_SOIL',
  GMC_BERRY = 'GMC_BERRY',
  GMC_SUNSET = 'GMC_SUNSET',
  GMC_OCEAN = 'GMC_OCEAN',
}

export interface ITheme {
  base: string;
  modal: string;
}

export const themeClasses = {
  GMC_DEFAULT: {
    base: 'white',
    modal: 'white',
  },
  GMC_DUNE: {
    base: 'gmc-dune-light-20',
    modal: 'gmc-dune-light-10',
  },
  GMC_JUNGLE: {
    base: 'gmc-jungle-light-40',
    modal: 'gmc-jungle-light-30',
  },
  GMC_FOREST: {
    base: 'gmc-forest-light-40',
    modal: 'gmc-forest-light-30',
  },
  GMC_HEART: {
    base: 'gmc-heart-light-20',
    modal: 'gmc-heart-light-10',
  },
  GMC_GLACIER: {
    base: 'gmc-glacier-light-20',
    modal: 'gmc-glacier-light-10',
  },
  GMC_BEACH: {
    base: 'gmc-beach-light-10',
    modal: 'gmc-beach',
  },
  GMC_SURF: {
    base: 'gmc-surf-light-30',
    modal: 'gmc-surf-light-20',
  },
  GMC_SOIL: {
    base: 'gmc-soil-light-30',
    modal: 'gmc-soil-light-20',
  },
  GMC_BERRY: {
    base: 'gmc-berry-light-20',
    modal: 'gmc-berry-light-10',
  },
  GMC_SUNSET: {
    base: 'gmc-sunset-light-30',
    modal: 'gmc-sunset-light-20',
  },
  GMC_OCEAN: {
    base: 'gmc-ocean-light-50',
    modal: 'gmc-ocean-light-40',
  },
};

export const getUserTheme = (profile: IUserProfile): ITheme =>
  profile && profile.theme
    ? themeClasses[profile.theme]
    : themeClasses['GMC_DEFAULT'];

export const getTheme = (theme: Theme): ITheme =>
  theme ? themeClasses[theme] : themeClasses['GMC_DEFAULT'];
