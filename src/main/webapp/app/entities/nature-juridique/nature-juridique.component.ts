import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { AccountService } from 'app/core/auth/account.service';
import { NatureJuridiqueService } from './nature-juridique.service';

@Component({
  selector: 'jhi-nature-juridique',
  templateUrl: './nature-juridique.component.html'
})
export class NatureJuridiqueComponent implements OnInit, OnDestroy {
  natureJuridiques: INatureJuridique[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected natureJuridiqueService: NatureJuridiqueService,
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
      this.natureJuridiqueService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<INatureJuridique[]>) => res.ok),
          map((res: HttpResponse<INatureJuridique[]>) => res.body)
        )
        .subscribe((res: INatureJuridique[]) => (this.natureJuridiques = res));
      return;
    }
    this.natureJuridiqueService
      .query()
      .pipe(
        filter((res: HttpResponse<INatureJuridique[]>) => res.ok),
        map((res: HttpResponse<INatureJuridique[]>) => res.body)
      )
      .subscribe((res: INatureJuridique[]) => {
        this.natureJuridiques = res;
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
    this.registerChangeInNatureJuridiques();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INatureJuridique) {
    return item.id;
  }

  registerChangeInNatureJuridiques() {
    this.eventSubscriber = this.eventManager.subscribe('natureJuridiqueListModification', response => this.loadAll());
  }
}
