import { format } from 'date-fns';

export const getDateFromISO = date => {
  return format(date, 'YYYY-MM-DD');
};
