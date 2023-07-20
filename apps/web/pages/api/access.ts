// api/password-protect.ts
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
  }
  const password = req.body.password;
  if (process.env.ACCESS_TOKEN === password) {
    const cookie = serialize('ACCESS_TOKEN_VALIDATED', 'true', {
      path: '/',
      httpOnly: true,
    });
    res.setHeader('Set-Cookie', cookie);
    res.redirect(302, '/');
  } else {
    const url = new URL('/access', req.headers['origin']);
    url.searchParams.append('error', 'Invalid');
    res.redirect(url.toString());
  }
}
