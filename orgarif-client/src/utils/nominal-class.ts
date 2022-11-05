export type NominalItem = NominalString<any> | NominalNumber<any>;

export type NominalString<T extends string> = string &
  TypeGuardedNominalString<T>;

class TypeGuardedNominalString<T extends string> {
  private _typeGuard!: T;
}

export type NominalNumber<T extends string> = number &
  TypeGuardedNominalNumber<T>;

export abstract class TypeGuardedNominalNumber<T extends string> {
  private _typeGuard!: T;
}

export const asNominalString = <T extends NominalString<any>>(value: string) =>
  value as unknown as T;

export const asNominalNumber = <T extends NominalNumber<any>>(value: number) =>
  value as unknown as T;

export class Dict<K extends NominalItem | string, T> {
  private _typeGuardKey!: K;
  private _typeGuardValue!: T;
}

export const dict = <K extends NominalItem | string, T>(
  pairs: [K, T][] = []
): Dict<K, T> => {
  const d = {} as Dict<K, T>;
  pairs.forEach(pair => {
    // @ts-ignore
    d[pair[0]] = pair[1];
  });
  return d;
};

export const get = <K extends NominalItem | string, T>(
  dict: Dict<K, T>,
  key: K
): T | undefined =>
  // @ts-ignore
  dict[key];

export const getValue = <K extends NominalItem | string, T>(
  dict: Dict<K, T>,
  key: K
): T => {
  const r = get(dict, key);
  if (!r) {
    throw new Error(`Could not find item ${key}`);
  }
  return r;
};

export const set = <K extends NominalItem | string, T>(
  dict: Dict<K, T>,
  key: K,
  value: T
): Dict<K, T> => {
  const newDict = { ...dict } as Dict<K, T>;
  // @ts-ignore
  newDict[key] = value;
  return newDict;
};

export const setMutable = <K extends NominalItem | string, T>(
  dict: Dict<K, T>,
  key: K,
  value: T
) => {
  // @ts-ignore
  dict[key] = value;
};

export const dictKeys = <K extends NominalItem | string, T>(dict: Dict<K, T>) =>
  Object.keys(dict) as unknown as K[];

export const dictValues = <K extends NominalItem | string, T>(
  dict: Dict<K, T>
) => Object.values(dict) as T[];

export const dictEntries = <K extends NominalItem | string, T>(
  dict: Dict<K, T>
) => Object.entries(dict) as unknown as [K, T][];

// FIXME[fmk] remove usage for an immutable deleteItem
export const deleteItemOld = <K extends NominalItem | string, T>(
  dict: Dict<K, T>,
  key: K
) => {
  // @ts-ignore
  delete dict[key];
};

export const deleteFromDict = <K extends NominalItem | string, T>(
  dict: Dict<K, T>,
  ...keys: K[]
): Dict<K, T> => {
  const newDict = { ...dict } as Dict<K, T>;
  keys.forEach(k => {
    // @ts-ignore
    delete newDict[k];
  });
  return newDict;
};

export const mergeDicts = <K extends NominalItem | string, T>(
  ...dicts: Dict<K, T>[]
) => {
  const d = dict<K, T>();
  dicts.forEach(d => {
    dictEntries(d).forEach(p => {
      setMutable(d, p[0], p[1]);
    });
  });
  return d;
};

export const associateBy = <K extends NominalItem | string, T>(
  a: T[],
  key: (i: T) => K
): Dict<K, T> => {
  const d = dict<K, T>();
  a.forEach(i => setMutable(d, key(i), i));
  return d;
};

export const groupBy = <K extends NominalItem | string, T>(
  a: T[],
  key: (i: T) => K
): Dict<K, T[]> => {
  const map = dict<K, T[]>();
  a.forEach(item => {
    const k = key(item);
    const existing = get(map, k);
    const list = existing ? existing : [];
    if (!existing) {
      setMutable(map, k, list);
    }
    list.push(item);
  });
  return map;
};

export const flatMap = <T, R>(a: T[], lambda: (o: T, i: number) => R) =>
  Array.prototype.concat.apply([], a.map(lambda));
