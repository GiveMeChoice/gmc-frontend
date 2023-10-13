import { NestedFilterDto } from 'gmc-types';

export const pathToFilterDeepEqual = (
  pathSlugs: string[],
  b: NestedFilterDto
): boolean => {
  if (!pathSlugs || !pathSlugs.length) return false;
  const pathFilter = {
    value: pathSlugs[0],
    ...(pathSlugs.length > 1 && {
      subfilter: {
        value: pathSlugs[1],
        ...(pathSlugs.length > 2 && {
          subfilter: {
            value: pathSlugs[2],
          },
        }),
      } as NestedFilterDto,
    }),
  } as NestedFilterDto;
  return filterDeepEqual(pathFilter, b);
};

export const filterDeepEqual = (
  a: NestedFilterDto,
  b: NestedFilterDto
): boolean => {
  // console.log('comparing ' + JSON.stringify(a) + ' and ' + JSON.stringify(b));
  if (!a || !b) return false;
  if (a.value === b.value) {
    if (!a.subfilter && !b.subfilter) {
      return true;
    } else if (
      a.subfilter &&
      b.subfilter &&
      a.subfilter.value === b.subfilter.value
    ) {
      if (!a.subfilter.subfilter && !b.subfilter.subfilter) {
        return true;
      } else if (
        a.subfilter.subfilter &&
        b.subfilter.subfilter &&
        a.subfilter.subfilter.value === b.subfilter.subfilter.value
      ) {
        return true;
      }
    }
  }
};
