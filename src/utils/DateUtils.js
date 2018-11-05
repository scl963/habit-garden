import { format } from 'date-fns';

// This function wraps around date-fns format function and manually splits the UTC time in order
// to prevent timezone differences from affecting displayed dates, since all dates are stored
// in database in ISO 8601 format as UTC midnight.
export const customFormat = (date, formatStr) => {
  const splitDate = date.split('T')[0];
  const [year, month, day] = splitDate.split('-');
  const newStr = new Date(year, month - 1, day).toString();
  return format(newStr, formatStr);
};
