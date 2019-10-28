import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ISecteur } from 'app/shared/model/secteur.model';
import { AccountService } from 'app/core/auth/account.service';
import { SecteurService } from './secteur.service';

@Component({
  selector: 'jhi-secteur',
  templateUrl: './secteur.component.html'
})
export class SecteurComponent implements OnInit, OnDestroy {
  secteurs: ISecteur[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected secteurService: SecteurService,
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
      this.secteurService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<ISecteur[]>) => res.ok),
          map((res: HttpResponse<ISecteur[]>) => res.body)
        )
        .subscribe((res: ISecteur[]) => (this.secteurs = res));
      return;
    }
    this.secteurService
      .query()
      .pipe(
        filter((res: HttpResponse<ISecteur[]>) => res.ok),
        map((res: HttpResponse<ISecteur[]>) => res.body)
      )
      .subscribe((res: ISecteur[]) => {
        this.secteurs = res;
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
    this.registerChangeInSecteurs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISecteur) {
    return item.id;
  }

  registerChangeInSecteurs() {
    this.eventSubscriber = this.eventManager.subscribe('secteurListModification', response => this.loadAll());
  }
}
