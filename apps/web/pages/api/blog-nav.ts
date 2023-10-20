// api/blog-nav
import {
  BlogCategory,
  allCategoriesQuery,
  allPostsQuery,
  categoryPostsQuery,
  getClient,
  overlayDrafts,
} from 'blog';
import { NextApiRequest, NextApiResponse } from 'next';
import { IBlogNavContext } from '../../components/Context/BlogNavProvider';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = getClient(false);
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
  }
  const categoriesResponse: BlogCategory[] = await client.fetch(
    allCategoriesQuery(false)
  );
  const wellnessCategory = categoriesResponse.find((c) => c.slug == 'wellness');
  const indoorCategory = categoriesResponse.find((c) => c.slug == 'indoor');
  const outdoorCategory = categoriesResponse.find((c) => c.slug == 'outdoor');
  const joyCategory = categoriesResponse.find((c) => c.slug == 'joy');
  const communityCategory = categoriesResponse.find(
    (c) => c.slug == 'community'
  );
  Promise.all([
    client.fetch(allPostsQuery(false)),
    client.fetch(categoryPostsQuery(wellnessCategory._id, false, 5)),
    client.fetch(categoryPostsQuery(indoorCategory._id, false, 5)),
    client.fetch(categoryPostsQuery(outdoorCategory._id, false, 5)),
    client.fetch(categoryPostsQuery(joyCategory._id, false, 5)),
    client.fetch(categoryPostsQuery(communityCategory._id, false, 5)),
  ]).then(
    ([
      latestPostsRaw,
      wellnessPostsRaw,
      indoorPostsRaw,
      outdoorPostsRaw,
      joyPostsRaw,
      communityPostsRaw,
    ]) => {
      const data: IBlogNavContext = {
        latestPosts: overlayDrafts(latestPostsRaw),
        wellnessCategory,
        wellnessPosts: overlayDrafts(wellnessPostsRaw),
        indoorCategory,
        indoorPosts: overlayDrafts(indoorPostsRaw),
        outdoorCategory,
        outdoorPosts: overlayDrafts(outdoorPostsRaw),
        joyCategory,
        joyPosts: overlayDrafts(joyPostsRaw),
        communityCategory,
        communityPosts: overlayDrafts(communityPostsRaw),
      };
      res.send(data);
    }
  );
}
