import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { TypeStructureComponent } from './type-structure.component';
import { TypeStructureDetailComponent } from './type-structure-detail.component';
import { TypeStructureUpdateComponent } from './type-structure-update.component';
import { TypeStructureDeletePopupComponent, TypeStructureDeleteDialogComponent } from './type-structure-delete-dialog.component';
import { typeStructureRoute, typeStructurePopupRoute } from './type-structure.route';

const ENTITY_STATES = [...typeStructureRoute, ...typeStructurePopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TypeStructureComponent,
    TypeStructureDetailComponent,
    TypeStructureUpdateComponent,
    TypeStructureDeleteDialogComponent,
    TypeStructureDeletePopupComponent
  ],
  entryComponents: [TypeStructureDeleteDialogComponent]
})
export class OrgarifTypeStructureModule {}
