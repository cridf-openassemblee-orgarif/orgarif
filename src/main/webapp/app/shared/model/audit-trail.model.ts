import { AuditTrailAction } from 'app/shared/model/enumerations/audit-trail-action.model';
import { Moment } from 'moment';

export interface IAuditTrail {
  id?: number;
  entity?: string;
  entityId?: number;
  parentEntity?: string;
  parentEntityId?: number;
  action?: AuditTrailAction;
  user?: string;
  date?: Moment;
  details?: string;
  updateDescription?: string;
}

export class AuditTrail implements IAuditTrail {
  constructor(
    public id?: number,
    public entity?: string,
    public entityId?: number,
    public parentEntity?: string,
    public parentEntityId?: number,
    public action?: AuditTrailAction,
    public user?: string,
    public date?: Moment,
    public details?: string,
    public updateDescription?: string
  ) {}
}
