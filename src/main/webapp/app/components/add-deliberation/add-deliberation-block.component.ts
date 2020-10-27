import { Component } from '@angular/core';
import { EditionService } from 'app/edition/edition.service';
import { Deliberation, IDeliberation } from 'app/shared/model/deliberation.model';
import { clientUid } from 'app/utils';
import { CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'jhi-orgarif-add-deliberation-block',
  templateUrl: './add-deliberation-block.component.html',
  styleUrls: ['add-deliberation-block.scss'],
})
export class AddDeliberationBlockComponent {
  delibInputFor = clientUid();
  dateInputFor = clientUid();
  deliberation: IDeliberation = new Deliberation();
  deliberationsDataService: CompleterData;

  constructor(protected editionService: EditionService) {
    this.deliberationsDataService = this.editionService.deliberationsDataService;
  }

  addDeliberation(item: CompleterItem): void {
    // this.editionService.addElu(elu, this.organismeId, this.instanceId, this.representantOrSuppleant);
  }
}
