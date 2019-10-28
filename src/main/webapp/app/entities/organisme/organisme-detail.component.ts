import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganisme } from 'app/shared/model/organisme.model';

@Component({
  selector: 'jhi-organisme-detail',
  templateUrl: './organisme-detail.component.html'
})
export class OrganismeDetailComponent implements OnInit {
  organisme: IOrganisme;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ organisme }) => {
      this.organisme = organisme;
    });
  }

  previousState() {
    window.history.back();
  }
}
