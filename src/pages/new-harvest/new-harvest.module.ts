import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewHarvestPage } from './new-harvest';

@NgModule({
  declarations: [
    NewHarvestPage,
  ],
  imports: [
    IonicPageModule.forChild(NewHarvestPage),
  ],
})
export class NewHarvestPageModule {}
