import { format, subDays, eachDay } from 'date-fns';
import React from 'react';

export const createDateOptions = () => {
  const today = Date.now();
  const start = subDays(today, 7);
  const dateArr = eachDay(start, today).reverse();
  return dateArr.map(d => {
    const text = format(d, 'MM/DD');
    const value = format(d, 'YYYY-MM-DD');
    return (
      <option key={text} value={value}>
        {text}
      </option>
    );
  });
};

export const goalReached = (dayAmount, goal, direction) => {
  if (direction === 'Increase') {
    return dayAmount >= goal ? true : false;
  } else {
    return dayAmount <= goal ? true : false;
  }
};
