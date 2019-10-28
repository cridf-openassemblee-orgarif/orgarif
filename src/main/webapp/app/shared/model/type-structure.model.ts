export interface ITypeStructure {
  id?: number;
  label?: string;
}

export class TypeStructure implements ITypeStructure {
  constructor(public id?: number, public label?: string) {}
}
