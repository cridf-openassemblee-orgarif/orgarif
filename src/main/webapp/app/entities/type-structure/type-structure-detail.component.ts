import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeStructure } from 'app/shared/model/type-structure.model';

@Component({
  selector: 'jhi-type-structure-detail',
  templateUrl: './type-structure-detail.component.html'
})
export class TypeStructureDetailComponent implements OnInit {
  typeStructure: ITypeStructure;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeStructure }) => {
      this.typeStructure = typeStructure;
    });
  }

  previousState() {
    window.history.back();
  }
}
