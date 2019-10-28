export interface INatureJuridique {
  id?: number;
  label?: string;
}

export class NatureJuridique implements INatureJuridique {
  constructor(public id?: number, public label?: string) {}
}
