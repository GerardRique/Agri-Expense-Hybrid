import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageDataPage } from './manage-data';

@NgModule({
  declarations: [
    ManageDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageDataPage),
  ],
})
export class ManageDataPageModule {}
