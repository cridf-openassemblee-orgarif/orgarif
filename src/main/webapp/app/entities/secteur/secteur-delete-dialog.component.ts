import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISecteur } from 'app/shared/model/secteur.model';
import { JhiEventManager } from 'ng-jhipster';
import { SecteurService } from './secteur.service';

@Component({
  templateUrl: './secteur-delete-dialog.component.html',
})
export class SecteurDeleteDialogComponent {
  secteur?: ISecteur;

  constructor(protected secteurService: SecteurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.secteurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('secteurListModification');
      this.activeModal.close();
    });
  }
}
