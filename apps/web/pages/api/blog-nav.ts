// api/blog-nav
import { categoryPostsQuery, getClient, indexQuery, overlayDrafts } from 'blog';
import { NextApiRequest, NextApiResponse } from 'next';
import { IBlogNavContext } from '../../components/BlogNavProvider';

const WELLNESS_ID = '43f74e8d-8039-4c7e-a137-753fe05ec448';
const INDOOR_ID = 'e7b61ef8-f646-45fb-9a35-2fa659d34f4d';
const OUTDOOR_ID = '08eaa787-8dcc-43b7-9142-228afb58a3e5';
const JOY_ID = '85073659-53d3-4e5c-ad2f-d3109c063583';
const COMMUNITY_ID = 'c66a4460-c5ac-4cfa-989f-6aaea702efda';

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
    client.fetch(indexQuery(false)),
    client.fetch(categoryPostsQuery(WELLNESS_ID, false, 5)),
    client.fetch(categoryPostsQuery(INDOOR_ID, false, 5)),
    client.fetch(categoryPostsQuery(OUTDOOR_ID, false, 5)),
    client.fetch(categoryPostsQuery(JOY_ID, false, 5)),
    client.fetch(categoryPostsQuery(COMMUNITY_ID, false, 5)),
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
