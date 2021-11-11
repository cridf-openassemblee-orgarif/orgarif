import { LocalDate } from './domain/time';
import { Errors } from './errors';
import { asString } from './utils/nominal-class';

export const formatLocaleDate = (value: LocalDate) => {
  const parts = asString(value).split('-');
  if (parts.length !== 3) {
    throw Errors._41dcf9d3();
  }
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};
