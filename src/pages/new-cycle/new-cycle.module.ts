import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCyclePage } from './new-cycle';

@NgModule({
  declarations: [
    NewCyclePage,
  ],
  imports: [
    IonicPageModule.forChild(NewCyclePage),
  ],
})
export class NewCyclePageModule {}
