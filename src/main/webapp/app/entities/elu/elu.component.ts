import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IElu } from 'app/shared/model/elu.model';
import { AccountService } from 'app/core/auth/account.service';
import { EluService } from './elu.service';

@Component({
  selector: 'jhi-elu',
  templateUrl: './elu.component.html'
})
export class EluComponent implements OnInit, OnDestroy {
  elus: IElu[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected eluService: EluService,
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
      this.eluService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IElu[]>) => res.ok),
          map((res: HttpResponse<IElu[]>) => res.body)
        )
        .subscribe((res: IElu[]) => (this.elus = res));
      return;
    }
    this.eluService
      .query()
      .pipe(
        filter((res: HttpResponse<IElu[]>) => res.ok),
        map((res: HttpResponse<IElu[]>) => res.body)
      )
      .subscribe((res: IElu[]) => {
        this.elus = res;
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
    this.registerChangeInElus();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IElu) {
    return item.id;
  }

  registerChangeInElus() {
    this.eventSubscriber = this.eventManager.subscribe('eluListModification', response => this.loadAll());
  }
}
