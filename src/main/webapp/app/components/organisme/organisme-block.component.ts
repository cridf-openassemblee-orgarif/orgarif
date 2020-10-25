import { Component, Input } from '@angular/core';
import { IOrganisme } from '../../shared/model/organisme.model';

@Component({
  selector: 'jhi-orgarif-organisme-block',
  templateUrl: './organisme-block.component.html',
  styleUrls: ['organisme-block.scss'],
})
export class OrganismeBlockComponent {
  // TODO-lazy-init
  private _organisme: IOrganisme = null!;

  @Input()
  set organisme(organisme: IOrganisme) {
    this._organisme = organisme;
  }

  get organisme(): IOrganisme {
    return this._organisme;
  }
}
