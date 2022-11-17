const postFields = `
  _id,
  name,
  title,
  subtitle,
  date,
  excerpt,
  coverImage,
  "categories": categories[]->{color, title, description},
  "slug": slug.current,
  "author": author->{name, picture},
`;

const draftFilter = ' && !(_id in path("drafts.**"))';

export const indexQuery = (preview: boolean) =>
  `*[_type == "post"${
    preview ? '' : draftFilter
  }] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postQuery = (preview: boolean) => `
{
  "post": *[_type == "post"${
    preview ? '' : draftFilter
  } && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post"${
    preview ? '' : draftFilter
  } && slug.current != $slug] | order(date desc, _updatedAt desc) [0...4] {
    content,
    ${postFields}
  }
}`;

export const postSlugsQuery = (preview: boolean) => `
*[_type == "post"${
  preview ? '' : draftFilter
} && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = (preview: boolean) => `
*[_type == "post"${preview ? '' : draftFilter} && slug.current == $slug][0] {
  ${postFields}
}
`;
