import React from 'react';
import { parseISO, format } from 'date-fns';

interface Props {
  dateString: string;
}

const Date: React.FC<Props> = ({ dateString }) => {
  if (!dateString) return null;

  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
};

export default Date;
