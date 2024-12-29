export type NominalItem = NominalString<any> | NominalNumber<any>;

export type NominalString<T extends string> = string &
  TypeGuardedNominalString<T>;

abstract class TypeGuardedNominalString<T extends string> {
  private _typeGuard!: T;
}

export type NominalNumber<T extends string> = number &
  TypeGuardedNominalNumber<T>;

abstract class TypeGuardedNominalNumber<T extends string> {
  private _typeGuard!: T;
}

// [doc] undefined is needed for interfaces with nullable Nominal
export const nominal = <
  T extends NominalNumber<any> | NominalString<any> | undefined
>(
  value: string | number
) => value as T;
