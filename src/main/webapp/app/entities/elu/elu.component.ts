import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IElu } from 'app/shared/model/elu.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { EluDeleteDialogComponent } from './elu-delete-dialog.component';
import { EluService } from './elu.service';

@Component({
  selector: 'jhi-elu',
  templateUrl: './elu.component.html',
})
export class EluComponent implements OnInit, OnDestroy {
  elus?: IElu[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected eluService: EluService,
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
      this.eluService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IElu[]>) => (this.elus = res.body || []));
      return;
    }

    this.eluService.query().subscribe((res: HttpResponse<IElu[]>) => (this.elus = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInElus();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IElu): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInElus(): void {
    this.eventSubscriber = this.eventManager.subscribe('eluListModification', () => this.loadAll());
  }

  delete(elu: IElu): void {
    const modalRef = this.modalService.open(EluDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.elu = elu;
  }
}
