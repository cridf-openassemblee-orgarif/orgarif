import { Component, Input } from '@angular/core';
import { IOrganisme } from 'app/shared/model/organisme.model';

@Component({
  selector: 'jhi-orgarif-organisme-block',
  templateUrl: './organisme-block.component.html',
  styleUrls: ['organisme-block.scss'],
})
export class OrganismeBlockComponent {
  _organisme: IOrganisme;

  @Input()
  // TODO dans la liste des lol : IOrganisme plantera le compilo ici...
  // mais Organisme semble marcher
  set organisme(organisme: any) {
    this._organisme = organisme;
  }

  get organisme() {
    return this._organisme;
  }
}
