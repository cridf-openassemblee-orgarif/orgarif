import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';
import { UserManagementDetailComponent } from './user-management-detail.component';
import { UserManagementUpdateComponent } from './user-management-update.component';
import { UserManagementComponent } from './user-management.component';
import { userManagementRoute } from './user-management.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(userManagementRoute)],
  declarations: [
    UserManagementComponent,
    UserManagementDetailComponent,
    UserManagementUpdateComponent,
    UserManagementDeleteDialogComponent,
  ],
  entryComponents: [UserManagementDeleteDialogComponent],
})
export class UserManagementModule {}
