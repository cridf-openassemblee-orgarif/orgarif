import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISecteur } from 'app/shared/model/secteur.model';

@Component({
  selector: 'jhi-secteur-detail',
  templateUrl: './secteur-detail.component.html'
})
export class SecteurDetailComponent implements OnInit {
  secteur: ISecteur;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ secteur }) => {
      this.secteur = secteur;
    });
  }

  previousState() {
    window.history.back();
  }
}
