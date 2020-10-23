import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeStructure } from 'app/shared/model/type-structure.model';
import { TypeStructureService } from './type-structure.service';
import { TypeStructureDeleteDialogComponent } from './type-structure-delete-dialog.component';

@Component({
  selector: 'jhi-type-structure',
  templateUrl: './type-structure.component.html',
})
export class TypeStructureComponent implements OnInit, OnDestroy {
  typeStructures?: ITypeStructure[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected typeStructureService: TypeStructureService,
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
      this.typeStructureService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ITypeStructure[]>) => (this.typeStructures = res.body || []));
      return;
    }

    this.typeStructureService.query().subscribe((res: HttpResponse<ITypeStructure[]>) => (this.typeStructures = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTypeStructures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITypeStructure): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTypeStructures(): void {
    this.eventSubscriber = this.eventManager.subscribe('typeStructureListModification', () => this.loadAll());
  }

  delete(typeStructure: ITypeStructure): void {
    const modalRef = this.modalService.open(TypeStructureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.typeStructure = typeStructure;
  }
}
