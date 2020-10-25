import { IInstance } from 'app/shared/model/instance.model';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { Moment } from 'moment';

export interface IDeliberation {
  id?: number;
  label?: string;
  date?: Moment;
  creationDate?: Moment;
  organismes?: IOrganisme[];
  instances?: IInstance[];
}

export class Deliberation implements IDeliberation {
  constructor(
    public id?: number,
    public label?: string,
    public date?: Moment,
    public creationDate?: Moment,
    public organismes?: IOrganisme[],
    public instances?: IInstance[]
  ) {}
}
