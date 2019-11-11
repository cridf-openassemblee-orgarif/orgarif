export interface ISecteur {
  id?: number;
  label?: string;
}

export class Secteur implements ISecteur {
  constructor(public id?: number, public label?: string) {}
}
