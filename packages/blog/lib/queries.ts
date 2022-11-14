const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`;

const previewFilter = ' && !(_id in path("drafts.**"))';

export const indexQuery = (preview: boolean) =>
  // `*[_type == "post" && !(_id in path("drafts.**"))][0...2]`;
  `*[_type == "post"${
    preview ? '' : previewFilter
  }] | order(publishedAt desc, _updatedAt desc) {
  ${postFields}
}`;

export const postQuery = (preview: boolean) => `
{
  "post": *[_type == "post"${
    preview ? '' : previewFilter
  } && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post"${
    preview ? '' : previewFilter
  } && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`;

export const postSlugsQuery = (preview: boolean) => `
*[_type == "post"${
  preview ? '' : previewFilter
} && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = (preview: boolean) => `
*[_type == "post"${preview ? '' : previewFilter} && slug.current == $slug][0] {
  ${postFields}
}
`;
