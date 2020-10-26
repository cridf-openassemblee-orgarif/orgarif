import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IElu } from 'app/shared/model/elu.model';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-orgarif-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['edition.scss'],
})
export class EditionComponent implements OnInit {
  elus: IElu[] = [];
  organisme: IOrganisme | undefined;

  constructor(protected jhiAlertService: JhiAlertService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.organisme = data.organisme;
      this.elus = data.elus;
    });
  }

  protected onSaveSuccess(): void {}

  protected onSaveError(): void {}
}
