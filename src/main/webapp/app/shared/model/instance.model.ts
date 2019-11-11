import { IOrganisme } from 'app/shared/model/organisme.model';
import { IRepresentant } from 'app/shared/model/representant.model';
import { IDeliberation } from 'app/shared/model/deliberation.model';

export interface IInstance {
  id?: number;
  nom?: string;
  nombreRepresentants?: number;
  nombreSuppleants?: number;
  organisme?: IOrganisme;
  representants?: IRepresentant[];
  suppleants?: IRepresentant[];
  deliberations?: IDeliberation[];
}

export class Instance implements IInstance {
  constructor(
    public id?: number,
    public nom?: string,
    public nombreRepresentants?: number,
    public nombreSuppleants?: number,
    public organisme?: IOrganisme,
    public representants?: IRepresentant[],
    public suppleants?: IRepresentant[],
    public deliberations?: IDeliberation[]
  ) {}
}
