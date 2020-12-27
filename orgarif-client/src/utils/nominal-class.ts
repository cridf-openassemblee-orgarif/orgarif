export type NominalItem = NominalString<any> | NominalNumber<any>;

export abstract class NominalString<T extends string> {
  private _typeGuard!: T;
}

export abstract class NominalNumber<T extends string> {
  private _typeGuard!: T;
}

export const stringifyNominalString = (value: NominalString<any> | string) =>
  value as string;

export const numberifyNominalNumber = (value: NominalNumber<any>) =>
  (value as unknown) as number;

export const instanciateNominalString = <T extends NominalString<any>>(
  value: string
) => (value as unknown) as T;

export const instanciateNominalNumber = <T extends NominalNumber<any>>(
  value: number
) => (value as unknown) as T;

export class Dict<K extends NominalItem, T> {
  private _typeGuardKey!: K;
  private _typeGuardValue!: T;
}

export const dict = <K extends NominalItem, T>() => {
  return {} as Dict<K, T>;
};

export const get = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K
): T | undefined =>
  // @ts-ignore
  dict[key];

export const getValue = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K
): T => {
  const r = get(dict, key);
  if (!r) {
    throw new Error(`Could not find item ${key}`);
  }
  return r;
};

export const set = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K,
  value: T
): Dict<K, T> => {
  const newDict = { ...dict } as Dict<K, T>;
  // @ts-ignore
  newDict[key] = value;
  return newDict;
};

export const setMutable = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K,
  value: T
) => {
  // @ts-ignore
  dict[key] = value;
};

export const dictKeys = <K extends NominalItem, T>(dict: Dict<K, T>) =>
  (Object.keys(dict) as unknown) as K[];

export const dictValues = <K extends NominalItem, T>(dict: Dict<K, T>) =>
  Object.values(dict) as T[];

export const dictEntries = <K extends NominalItem, T>(dict: Dict<K, T>) =>
  (Object.entries(dict) as unknown) as [K, T][];

// FIXME remove usage pour un deleteItem immuable
export const deleteItemOld = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K
) => {
  // @ts-ignore
  delete dict[key];
};

export const deleteFromDict = <K extends NominalItem, T>(
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

export const pairsToDict = <K extends NominalItem, T>(pairs: [K, T][]) => {
  const d = dict<K, T>();
  pairs.forEach(pair => {
    // @ts-ignore
    d[pair[0]] = pair[1];
  });
  return d;
};

export const mergeDicts = <K extends NominalItem, T>(
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

export const associateBy = <K extends NominalItem, T>(
  a: T[],
  key: (i: T) => K
): Dict<K, T> => {
  const d = dict<K, T>();
  a.forEach(i => setMutable(d, key(i), i));
  return d;
};
