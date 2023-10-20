import { ITheme, Theme } from 'gmc-types';
import { IUserProfile } from '../components/Context/UserProvider';

export const themeClasses = {
  GMC_DEFAULT: {
    base: 'white',
    modal: 'secondary',
    dark: false,
    accent: 'secondary',
  },
  GMC_DUNE: {
    base: 'gmc-dune-light-50',
    modal: 'gmc-dune-light-30',
    dark: false,
    accent: 'secondary',
  },
  GMC_JUNGLE: {
    base: 'gmc-jungle-light-50',
    modal: 'gmc-jungle-light-30',
    dark: false,
    accent: 'secondary',
  },
  GMC_FOREST: {
    base: 'gmc-forest-light-50',
    modal: 'gmc-forest-light-30',
    accent: 'secondary',
    dark: false,
  },
  GMC_HEART: {
    base: 'gmc-heart-light-50',
    modal: 'gmc-heart-light-40',
    dark: false,
    accent: 'secondary',
  },
  GMC_GLACIER: {
    base: 'gmc-glacier-light-50',
    modal: 'gmc-glacier-light-40',
    dark: false,
    accent: 'secondary',
  },
  GMC_BEACH: {
    base: 'gmc-beach-light-30',
    modal: 'gmc-beach',
    dark: false,
    accent: 'secondary',
  },
  GMC_SURF: {
    base: 'gmc-surf-light-50',
    modal: 'gmc-surf-light-30',
    dark: false,
    accent: 'secondary',
  },
  GMC_SOIL: {
    base: 'gmc-soil-light-50',
    modal: 'gmc-soil-light-40',
    dark: false,
    accent: 'secondary',
  },
  GMC_BERRY: {
    base: 'gmc-berry-light-50',
    modal: 'gmc-berry-light-40',
    dark: false,
    accent: 'secondary',
  },
  GMC_SUNSET: {
    base: 'gmc-sunset-light-50',
    modal: 'gmc-sunset-light-40',
    dark: false,
    accent: 'secondary',
  },
  GMC_OCEAN: {
    base: 'gmc-ocean-light-50',
    modal: 'gmc-ocean-light-40',
    dark: false,
    accent: 'secondary',
  },
};

export const getUserTheme = (profile: IUserProfile): ITheme =>
  profile && profile.theme
    ? themeClasses[profile.theme]
    : themeClasses['GMC_DEFAULT'];

export const getTheme = (theme: Theme): ITheme =>
  theme ? themeClasses[theme] : themeClasses['GMC_DEFAULT'];
