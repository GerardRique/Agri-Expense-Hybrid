import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CycleDataPage } from './cycle-data';

@NgModule({
  declarations: [
    CycleDataPage,
  ],
  imports: [
    IonicPageModule.forChild(CycleDataPage),
  ],
})
export class CycleDataPageModule {}
