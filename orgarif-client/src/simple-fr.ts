import { LocalDate } from './domain/time';
import { Errors } from './errors';
import { stringifyNominalString } from './utils/nominal-class';

export const formatDate = (value: LocalDate) => {
  const parts = stringifyNominalString(value).split('-');
  if (parts.length !== 3) {
    throw Errors._41dcf9d3();
  }
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};
