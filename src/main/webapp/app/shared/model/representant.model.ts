import { IElu } from 'app/shared/model/elu.model';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { IInstance } from 'app/shared/model/instance.model';

export interface IRepresentant {
  id?: number;
  position?: number;
  elu?: IElu;
  representantOrganisme?: IOrganisme;
  suppleantOrganisme?: IOrganisme;
  representantInstance?: IInstance;
  suppleantInstance?: IInstance;
}

export class Representant implements IRepresentant {
  constructor(
    public id?: number,
    public position?: number,
    public elu?: IElu,
    public representantOrganisme?: IOrganisme,
    public suppleantOrganisme?: IOrganisme,
    public representantInstance?: IInstance,
    public suppleantInstance?: IInstance
  ) {}
}
