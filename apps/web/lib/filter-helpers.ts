import { INestedFilter } from 'gmc-types';

export const readFilterName = (f: INestedFilter) => {
  let name = f.name ? f.name : f.value;
  if (f.subfilter) {
    name = f.subfilter.name ? f.subfilter.name : f.subfilter.value;
    if (f.subfilter.subfilter) {
      name = f.subfilter.subfilter.name
        ? f.subfilter.subfilter.name
        : f.subfilter.subfilter.value;
    }
  }
  return name;
};

export const pathToFilterDeepEqual = (
  pathSlugs: string[],
  b: INestedFilter
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
      } as INestedFilter,
    }),
  } as INestedFilter;
  return filterDeepEqual(pathFilter, b);
};

export const filterDeepEqual = (
  a: INestedFilter,
  b: INestedFilter
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
