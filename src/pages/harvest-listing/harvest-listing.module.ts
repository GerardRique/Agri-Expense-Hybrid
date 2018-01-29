import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HarvestListingPage } from './harvest-listing';

@NgModule({
  declarations: [
    HarvestListingPage,
  ],
  imports: [
    IonicPageModule.forChild(HarvestListingPage),
  ],
})
export class HarvestListingPageModule {}
