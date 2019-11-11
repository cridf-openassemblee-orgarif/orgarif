import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeStructure } from 'app/shared/model/type-structure.model';
import { AccountService } from 'app/core/auth/account.service';
import { TypeStructureService } from './type-structure.service';

@Component({
  selector: 'jhi-type-structure',
  templateUrl: './type-structure.component.html'
})
export class TypeStructureComponent implements OnInit, OnDestroy {
  typeStructures: ITypeStructure[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected typeStructureService: TypeStructureService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.typeStructureService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<ITypeStructure[]>) => res.ok),
          map((res: HttpResponse<ITypeStructure[]>) => res.body)
        )
        .subscribe((res: ITypeStructure[]) => (this.typeStructures = res));
      return;
    }
    this.typeStructureService
      .query()
      .pipe(
        filter((res: HttpResponse<ITypeStructure[]>) => res.ok),
        map((res: HttpResponse<ITypeStructure[]>) => res.body)
      )
      .subscribe((res: ITypeStructure[]) => {
        this.typeStructures = res;
        this.currentSearch = '';
      });
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTypeStructures();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITypeStructure) {
    return item.id;
  }

  registerChangeInTypeStructures() {
    this.eventSubscriber = this.eventManager.subscribe('typeStructureListModification', response => this.loadAll());
  }
}
