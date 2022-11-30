export const toDateString = (
  date: Date | string,
  omitTime?: boolean
): string => {
  if (!date) return '1776-07-04T04:20';
  let dateRaw = typeof date == 'string' ? date : date.toString();
  let formattedDate = `${dateRaw.substring(5, 7)}/${dateRaw.substring(
    8,
    10
  )}/${dateRaw.substring(2, 4)}`;
  return omitTime
    ? formattedDate
    : `${formattedDate} ${dateRaw.substring(11, 19)}`;
};
