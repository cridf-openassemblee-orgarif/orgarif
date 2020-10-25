import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrganisme } from 'app/shared/model/organisme.model';

@Component({
  selector: 'jhi-organisme-detail',
  templateUrl: './organisme-detail.component.html',
})
export class OrganismeDetailComponent implements OnInit {
  organisme: IOrganisme | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organisme }) => (this.organisme = organisme));
  }

  previousState(): void {
    window.history.back();
  }
}
