import { IRepresentant } from 'app/shared/model/representant.model';
import { Civilite } from 'app/shared/model/enumerations/civilite.model';

export interface IElu {
  id?: number;
  sourceId?: string;
  sourceUid?: string;
  civilite?: Civilite;
  nom?: string;
  prenom?: string;
  groupePolitique?: string;
  groupePolitiqueCourt?: string;
  image?: string;
  actif?: boolean;
  representants?: IRepresentant[];
}

export class Elu implements IElu {
  constructor(
    public id?: number,
    public sourceId?: string,
    public sourceUid?: string,
    public civilite?: Civilite,
    public nom?: string,
    public prenom?: string,
    public groupePolitique?: string,
    public groupePolitiqueCourt?: string,
    public image?: string,
    public actif?: boolean,
    public representants?: IRepresentant[]
  ) {
    this.actif = this.actif || false;
  }
}
