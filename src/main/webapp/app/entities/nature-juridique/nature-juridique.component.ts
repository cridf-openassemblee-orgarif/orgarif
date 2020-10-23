import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { NatureJuridiqueService } from './nature-juridique.service';
import { NatureJuridiqueDeleteDialogComponent } from './nature-juridique-delete-dialog.component';

@Component({
  selector: 'jhi-nature-juridique',
  templateUrl: './nature-juridique.component.html',
})
export class NatureJuridiqueComponent implements OnInit, OnDestroy {
  natureJuridiques?: INatureJuridique[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected natureJuridiqueService: NatureJuridiqueService,
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
      this.natureJuridiqueService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<INatureJuridique[]>) => (this.natureJuridiques = res.body || []));
      return;
    }

    this.natureJuridiqueService.query().subscribe((res: HttpResponse<INatureJuridique[]>) => (this.natureJuridiques = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNatureJuridiques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INatureJuridique): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNatureJuridiques(): void {
    this.eventSubscriber = this.eventManager.subscribe('natureJuridiqueListModification', () => this.loadAll());
  }

  delete(natureJuridique: INatureJuridique): void {
    const modalRef = this.modalService.open(NatureJuridiqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.natureJuridique = natureJuridique;
  }
}
