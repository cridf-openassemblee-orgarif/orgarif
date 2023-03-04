export const filterNotNull = <T>(list: (T | undefined)[]) =>
  list.filter(it => it) as T[];

export const distinct = <T>(list: T[]) => {
  const d: T[] = [];
  list.forEach(e => {
    if (!d.includes(e)) {
      d.push(e);
    }
  });
  return d;
};
