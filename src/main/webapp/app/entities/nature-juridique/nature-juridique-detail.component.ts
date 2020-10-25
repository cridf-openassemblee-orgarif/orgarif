import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INatureJuridique } from 'app/shared/model/nature-juridique.model';

@Component({
  selector: 'jhi-nature-juridique-detail',
  templateUrl: './nature-juridique-detail.component.html',
})
export class NatureJuridiqueDetailComponent implements OnInit {
  natureJuridique: INatureJuridique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ natureJuridique }) => (this.natureJuridique = natureJuridique));
  }

  previousState(): void {
    window.history.back();
  }
}
