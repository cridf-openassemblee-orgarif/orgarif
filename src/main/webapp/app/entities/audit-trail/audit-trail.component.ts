import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAuditTrail } from 'app/shared/model/audit-trail.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { AuditTrailDeleteDialogComponent } from './audit-trail-delete-dialog.component';
import { AuditTrailService } from './audit-trail.service';

@Component({
  selector: 'jhi-audit-trail',
  templateUrl: './audit-trail.component.html',
})
export class AuditTrailComponent implements OnInit, OnDestroy {
  auditTrails?: IAuditTrail[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected auditTrailService: AuditTrailService,
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
      this.auditTrailService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IAuditTrail[]>) => (this.auditTrails = res.body || []));
      return;
    }

    this.auditTrailService.query().subscribe((res: HttpResponse<IAuditTrail[]>) => (this.auditTrails = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAuditTrails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAuditTrail): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAuditTrails(): void {
    this.eventSubscriber = this.eventManager.subscribe('auditTrailListModification', () => this.loadAll());
  }

  delete(auditTrail: IAuditTrail): void {
    const modalRef = this.modalService.open(AuditTrailDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.auditTrail = auditTrail;
  }
}
