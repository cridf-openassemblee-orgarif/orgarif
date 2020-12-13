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

export type Dict<K extends NominalItem, T> = Record<
  // @ts-ignore
  K,
  T
>;

export const getOrNull = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K
): T | undefined => dict[key];

export const get = <K extends NominalItem, T>(dict: Dict<K, T>, key: K): T => {
  const r = getOrNull(dict, key);
  if (!r) {
    throw new Error(`Could not find item ${key}`);
  }
  return r;
};

export const set = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K,
  value: T
) => {
  const newDict = { ...dict };
  newDict[key] = value;
  return newDict;
};

export const mutableSet = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K,
  value: T
) => {
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
  delete dict[key];
};

export const deleteItem = <K extends NominalItem, T>(
  dict: Dict<K, T>,
  key: K
) => {
  const newDict = { ...dict };
  delete newDict[key];
  return newDict;
};

export const pairsToDict = <K extends NominalItem, T>(pairs: [K, T][]) => {
  const dict = {} as Dict<K, T>;
  pairs.forEach(pair => {
    dict[pair[0]] = pair[1];
  });
  return dict;
};

export const mergeDicts = <K extends NominalItem, T>(
  ...dicts: Dict<K, T>[]
) => {
  const dict = {} as Dict<K, T>;
  dicts.forEach(d => {
    dictEntries(d).forEach(p => {
      mutableSet(dict, p[0], p[1]);
    });
  });
  return dict;
};
