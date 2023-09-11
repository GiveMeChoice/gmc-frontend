// api/blog-nav
import { categoryPostsQuery, getClient, overlayDrafts } from 'blog';
import { NextApiRequest, NextApiResponse } from 'next';
import { IBlogNavContext } from '../../components/BlogNavProvider';

const WELLNESS_ID = '5bfb673d-4e5e-4df8-9ca6-d0898a1c3ea7';
const INDOOR_ID = '7bde7029-929a-4fdd-8e9a-9bcbe93179bd';
const OUTDOOR_ID = '08eaa787-8dcc-43b7-9142-228afb58a3e5';
const JOY_ID = '85073659-53d3-4e5c-ad2f-d3109c063583';
const COMMUNITY_ID = '5bfb673d-4e5e-4df8-9ca6-d0898a1c3ea7';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = getClient(false);
  console.log('!!!!!!!! FETCHING BLOG NAV !!!!!!!!!!! ' + new Date());
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
  }
  Promise.all([
    client.fetch(categoryPostsQuery(WELLNESS_ID, false, 5)),
    client.fetch(categoryPostsQuery(INDOOR_ID, false, 5)),
    client.fetch(categoryPostsQuery(OUTDOOR_ID, false, 5)),
    client.fetch(categoryPostsQuery(JOY_ID, false, 5)),
    client.fetch(categoryPostsQuery(COMMUNITY_ID, false, 5)),
  ]).then(
    ([
      wellnessPostsRaw,
      indoorPostsRaw,
      outdoorPostsRaw,
      joyPostsRaw,
      communityPostsRaw,
    ]) => {
      const data: IBlogNavContext = {
        wellnessPosts: overlayDrafts(wellnessPostsRaw),
        indoorPosts: overlayDrafts(indoorPostsRaw),
        outdoorPosts: overlayDrafts(outdoorPostsRaw),
        joyPosts: overlayDrafts(joyPostsRaw),
        communityPosts: overlayDrafts(communityPostsRaw),
      };
      res.send(data);
    }
  );
}
