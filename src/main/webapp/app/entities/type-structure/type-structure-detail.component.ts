import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITypeStructure } from 'app/shared/model/type-structure.model';

@Component({
  selector: 'jhi-type-structure-detail',
  templateUrl: './type-structure-detail.component.html',
})
export class TypeStructureDetailComponent implements OnInit {
  typeStructure: ITypeStructure | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeStructure }) => (this.typeStructure = typeStructure));
  }

  previousState(): void {
    window.history.back();
  }
}
