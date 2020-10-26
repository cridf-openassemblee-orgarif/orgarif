import { Component, Input } from '@angular/core';
import { IOrganisme } from '../../shared/model/organisme.model';

@Component({
  selector: 'jhi-orgarif-organisme-block',
  templateUrl: './organisme-block.component.html',
  styleUrls: ['organisme-block.scss'],
})
export class OrganismeBlockComponent {
  // TODO-lazy-init
  @Input()
  public organisme: IOrganisme = null!;
}
