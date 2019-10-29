import { Component, OnInit } from '@angular/core';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ListService } from 'app/list/list.service';

@Component({
  selector: 'jhi-orgarif-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.scss']
})
export class ListComponent implements OnInit {
  organismes: IOrganisme[];

  constructor(
    protected jhiAlertService: JhiAlertService,
    // FIXMENOW remove ?
    protected listService: ListService
  ) {}

  ngOnInit() {
    this.listService
      .lastOrganismes()
      .pipe(
        filter((mayBeOk: HttpResponse<IOrganisme[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrganisme[]>) => response.body)
      )
      .subscribe((res: IOrganisme[]) => (this.organismes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
