import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { TypeStructureDeleteDialogComponent } from './type-structure-delete-dialog.component';
import { TypeStructureDetailComponent } from './type-structure-detail.component';
import { TypeStructureUpdateComponent } from './type-structure-update.component';
import { TypeStructureComponent } from './type-structure.component';
import { typeStructureRoute } from './type-structure.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(typeStructureRoute)],
  declarations: [TypeStructureComponent, TypeStructureDetailComponent, TypeStructureUpdateComponent, TypeStructureDeleteDialogComponent],
  entryComponents: [TypeStructureDeleteDialogComponent],
})
export class OrgarifTypeStructureModule {}
