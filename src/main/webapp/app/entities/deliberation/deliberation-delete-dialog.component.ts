import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from './deliberation.service';

@Component({
  templateUrl: './deliberation-delete-dialog.component.html',
})
export class DeliberationDeleteDialogComponent {
  deliberation?: IDeliberation;

  constructor(
    protected deliberationService: DeliberationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deliberationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('deliberationListModification');
      this.activeModal.close();
    });
  }
}
