import { ITheme, Theme } from 'gmc-types';
import { IUserProfile } from '../components/UserProvider';

export const themeClasses = {
  GMC_DEFAULT: {
    base: 'white',
    modal: 'secondary',
    dark: false,
  },
  GMC_DUNE: {
    base: 'gmc-dune-light-50',
    modal: 'gmc-dune-light-30',
    dark: false,
  },
  GMC_JUNGLE: {
    base: 'gmc-jungle-light-50',
    modal: 'gmc-jungle-light-30',
    dark: false,
  },
  GMC_FOREST: {
    base: 'gmc-forest-light-50',
    modal: 'gmc-forest-light-30',
    accent: 'secondary',
    dark: false,
  },
  GMC_HEART: {
    base: 'gmc-heart-light-50',
    modal: 'gmc-heart-light-30',
    dark: false,
  },
  GMC_GLACIER: {
    base: 'gmc-glacier-light-50',
    modal: 'gmc-glacier-light-30',
    dark: false,
  },
  GMC_BEACH: {
    base: 'gmc-beach-light-30',
    modal: 'gmc-beach',
    dark: false,
  },
  GMC_SURF: {
    base: 'gmc-surf-light-50',
    modal: 'gmc-surf-light-20',
    dark: false,
  },
  GMC_SOIL: {
    base: 'gmc-soil-light-50',
    modal: 'gmc-soil-light-30',
    dark: false,
  },
  GMC_BERRY: {
    base: 'gmc-berry-light-50',
    modal: 'gmc-berry-light-30',
    dark: false,
  },
  GMC_SUNSET: {
    base: 'gmc-sunset-light-50',
    modal: 'gmc-sunset-light-30',
    dark: false,
  },
  GMC_OCEAN: {
    base: 'gmc-ocean-light-50',
    modal: 'gmc-ocean-light-40',
    dark: false,
  },
};

export const getUserTheme = (profile: IUserProfile): ITheme =>
  profile && profile.theme
    ? themeClasses[profile.theme]
    : themeClasses['GMC_DEFAULT'];

export const getTheme = (theme: Theme): ITheme =>
  theme ? themeClasses[theme] : themeClasses['GMC_DEFAULT'];
