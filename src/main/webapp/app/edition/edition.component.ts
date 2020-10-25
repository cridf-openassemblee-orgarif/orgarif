import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-orgarif-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['edition.scss'],
})
export class EditionComponent implements OnInit {
  organisme: IOrganisme | undefined;

  constructor(protected jhiAlertService: JhiAlertService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organisme }) => {
      this.organisme = organisme;
    });
  }

  protected onSaveSuccess(): void {}

  protected onSaveError(): void {}
}
