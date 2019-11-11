import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INatureJuridique } from 'app/shared/model/nature-juridique.model';

@Component({
  selector: 'jhi-nature-juridique-detail',
  templateUrl: './nature-juridique-detail.component.html'
})
export class NatureJuridiqueDetailComponent implements OnInit {
  natureJuridique: INatureJuridique;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ natureJuridique }) => {
      this.natureJuridique = natureJuridique;
    });
  }

  previousState() {
    window.history.back();
  }
}
