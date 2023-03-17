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
  accent: string;
  dark: boolean;
}
