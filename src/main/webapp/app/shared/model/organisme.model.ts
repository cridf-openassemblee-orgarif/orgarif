import { Moment } from 'moment';
import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { ISecteur } from 'app/shared/model/secteur.model';
import { ITypeStructure } from 'app/shared/model/type-structure.model';
import { IInstance } from 'app/shared/model/instance.model';
import { IRepresentant } from 'app/shared/model/representant.model';
import { IDeliberation } from 'app/shared/model/deliberation.model';

export interface IOrganisme {
  id?: number;
  nom?: string;
  nombreRepresentants?: number;
  nombreSuppleants?: number;
  creationDate?: Moment;
  lastModificationDate?: Moment;
  partageRepresentants?: boolean;
  natureJuridique?: INatureJuridique;
  secteur?: ISecteur;
  typeStructure?: ITypeStructure;
  instances?: IInstance[];
  representants?: IRepresentant[];
  suppleants?: IRepresentant[];
  deliberations?: IDeliberation[];
}

export class Organisme implements IOrganisme {
  constructor(
    public id?: number,
    public nom?: string,
    public nombreRepresentants?: number,
    public nombreSuppleants?: number,
    public creationDate?: Moment,
    public lastModificationDate?: Moment,
    public partageRepresentants?: boolean,
    public natureJuridique?: INatureJuridique,
    public secteur?: ISecteur,
    public typeStructure?: ITypeStructure,
    public instances?: IInstance[],
    public representants?: IRepresentant[],
    public suppleants?: IRepresentant[],
    public deliberations?: IDeliberation[]
  ) {
    this.partageRepresentants = this.partageRepresentants || false;
  }
}
