import { postBySlugQuery } from './queries';
import { previewClient } from './sanity.server';

function redirectToPreview(res: any, Location: string) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
    path: '/blog', // The preview mode cookies apply to paths with /blog
  });
  // Redirect to a preview capable route
  res.writeHead(307, { Location });
  res.end();
}

export default async function previewHandler(req: any, res: any) {
  const { secret, slug } = req.query;

  const envSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;
  console.log(secret);
  console.log(envSecret);
  // Only require a secret when in production
  if (!secret || !envSecret) {
    return res.status(401).json({ message: 'Missing Secret' });
  }
  // Check the secret if it's provided, enables running preview mode locally before the env var is setup
  if (envSecret !== secret) {
    return res.status(401).json({ message: 'Secret Mismatch' });
  }
  // If no slug is provided open preview mode on the frontpage
  if (!slug) {
    return redirectToPreview(res, '/blog');
  }

  // Check if the post with the given `slug` exists
  const post = await previewClient.fetch(postBySlugQuery(true), {
    slug: req.query.slug,
  });

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/blog/${post.slug}`);
}
