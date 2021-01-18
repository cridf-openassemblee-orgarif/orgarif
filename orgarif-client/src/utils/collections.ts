export const filterNotNull = <T>(list: (T | undefined)[]) =>
  list.filter(it => it) as T[];
