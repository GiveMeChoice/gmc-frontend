export const buildSlug = (entity) => {
  const parentSlug =
    entity.parent && entity.parent.slug !== 'root' ? entity.parent.slug : '';
  const superParentSlug =
    entity.parent &&
    entity.parent.slug !== 'root' &&
    entity.parent.parent &&
    entity.parent.parent.slug !== 'root'
      ? entity.parent.parent.slug
      : '';
  return `${superParentSlug ? superParentSlug + '/' : ''}${
    parentSlug ? parentSlug + '/' : ''
  }${entity.slug}`;
};

export const getBaseCategorySlug = (entity) => {
  if (!entity.parent || entity.parent.slug === 'root') return entity.slug;
  if (entity.parent.parent.slug === 'root') return entity.parent.slug;
  return entity.parent.parent.slug;
};
