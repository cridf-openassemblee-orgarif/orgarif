import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISecteur } from 'app/shared/model/secteur.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { SecteurDeleteDialogComponent } from './secteur-delete-dialog.component';
import { SecteurService } from './secteur.service';

@Component({
  selector: 'jhi-secteur',
  templateUrl: './secteur.component.html',
})
export class SecteurComponent implements OnInit, OnDestroy {
  secteurs?: ISecteur[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected secteurService: SecteurService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.secteurService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ISecteur[]>) => (this.secteurs = res.body || []));
      return;
    }

    this.secteurService.query().subscribe((res: HttpResponse<ISecteur[]>) => (this.secteurs = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSecteurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISecteur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSecteurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('secteurListModification', () => this.loadAll());
  }

  delete(secteur: ISecteur): void {
    const modalRef = this.modalService.open(SecteurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.secteur = secteur;
  }
}
