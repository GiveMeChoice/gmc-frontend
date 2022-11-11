import createImageUrlBuilder from '@sanity/image-url';
import { createPreviewSubscriptionHook, ProjectConfig } from 'next-sanity';
import { sanityConfig } from './config';

export const imageBuilder = createImageUrlBuilder(
  sanityConfig as ProjectConfig
);

export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('max');

export const usePreviewSubscription = createPreviewSubscriptionHook(
  sanityConfig as ProjectConfig
);
