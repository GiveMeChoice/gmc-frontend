import { SanityDocument } from '@sanity/client';

type Post = {
  title: string;
};

export type SanityPost = SanityDocument<Post>;
