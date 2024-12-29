import { NominalItem } from './nominal-class';

type RecordKey = NominalItem | string;

export class RecordUtils {
  static getValue = <K extends RecordKey, T>(
    result: Record<K, T>,
    key: K
  ): Exclude<T, undefined> => {
    const r: T = result[key];
    if (!r) {
      throw new Error(`Could not find item ${key}`);
    }
    // @ts-ignore
    return r;
  };

  static fromEntries = <K extends RecordKey, T>(pairs: [K, T][]) =>
    // @ts-ignore
    Object.fromEntries(pairs) as Record<K, T | undefined>;

  static associateBy = <K extends RecordKey, T>(
    a: T[],
    key: (i: T) => K
  ): Record<K, T | undefined> => {
    const d = {} as Record<K, T>;
    a.forEach(i => (d[key(i)] = i));
    return d;
  };

  static immutableSet = <K extends RecordKey, T>(
    record: Record<K, T>,
    key: K,
    value: T
  ): Record<K, T> => {
    const newRecord = { ...record } as Record<K, T>;
    newRecord[key] = value;
    return newRecord;
  };

  static immutableSetAll = <K extends RecordKey, T>(
    record: Record<K, T>,
    entries: [K, T][]
  ): Record<K, T> => {
    const newRecord = { ...record } as Record<K, T>;
    entries.forEach(([k, v]) => (newRecord[k] = v));
    return newRecord;
  };

  static keys = <K extends RecordKey, T>(record: Record<K, T>) =>
    Object.keys(record) as K[];

  static values = <K extends RecordKey, T>(record: Record<K, T>) =>
    Object.values(record) as T[];

  static entries = <K extends RecordKey, T>(record: Record<K, T>) =>
    Object.entries(record) as [K, T][];

  static immutableRemove = <K extends RecordKey, T>(
    record: Record<K, T>,
    ...keys: K[]
  ): Record<K, T> => {
    const newRecord = { ...record } as Record<K, T>;
    keys.forEach(k => {
      // @ts-ignore
      delete newRecord[k];
    });
    return newRecord;
  };

  // TODO[tmpl][doc] last item will replace
  static merge = <K extends RecordKey, T>(...records: Record<K, T>[]) => {
    const result = {} as Record<K, T>;
    records.forEach(record => {
      RecordUtils.entries(record).forEach(([key, value]) => {
        result[key] = value;
      });
    });
    return result;
  };

  static groupBy = <K extends RecordKey, T>(
    a: T[],
    key: (i: T) => K
  ): Record<K, T[] | undefined> => {
    const result = {} as Record<K, T[]>;
    a.forEach(item => {
      const k = key(item);
      const existing = result[k];
      const list = existing ? existing : [];
      if (!existing) {
        result[k] = list;
      }
      list.push(item);
    });
    return result;
  };
}
