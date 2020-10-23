import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from './organisme.service';

@Component({
  templateUrl: './organisme-delete-dialog.component.html',
})
export class OrganismeDeleteDialogComponent {
  organisme?: IOrganisme;

  constructor(protected organismeService: OrganismeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.organismeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('organismeListModification');
      this.activeModal.close();
    });
  }
}
