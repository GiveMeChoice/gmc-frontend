const postFields = `
  _id,
  name,
  title,
  subtitle,
  date,
  excerpt,
  coverImage,
  "categories": categories[]->{"color": color.value, title, description, "slug": slug.current},
  "slug": slug.current,
  "author": author->{name, picture},
  `;

const categoryFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  "color": color.value
`;

const draftFilter = ' && !(_id in path("drafts.**"))';

export const allCategoriesQuery = (preview: boolean) =>
  `*[_type == 'category'${preview ? '' : draftFilter}] {${categoryFields}}`;

export const categoryBySlugQuery = (slug: string) =>
  `*[_type == 'category' && slug.current == '${slug}'] {${categoryFields}}`;

export const indexQuery = (preview: boolean) =>
  `*[_type == "post"${
    preview ? '' : draftFilter
  }] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const allPostsQuery = (preview: boolean) =>
  `*[_type == "post"${
    preview ? '' : draftFilter
  }] | order(date desc, _updatedAt desc) [0...10] {${postFields}}`;

export const categoryPostsQuery = (
  categoryId: string,
  preview: boolean,
  count?: number
) =>
  `*[_type == "post"${
    preview ? '' : draftFilter
  } && '${categoryId}' in categories[]._ref] | order(date desc, _updatedAt desc) [0...${
    count ? count - 1 : 10
  }] {${postFields}}`;

export const postQuery = (preview: boolean) => `
{
  "post": *[_type == "post"${
    preview ? '' : draftFilter
  } && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    contentImage,
    content2,
    ${postFields}
  },
  "morePosts": *[_type == "post"${
    preview ? '' : draftFilter
  } && slug.current != $slug] | order(date desc, _updatedAt desc) [0...6] {
    content,
    contentImage,
    content2,
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
