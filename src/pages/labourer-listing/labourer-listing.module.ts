import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabourerListingPage } from './labourer-listing';

@NgModule({
  declarations: [
    LabourerListingPage,
  ],
  imports: [
    IonicPageModule.forChild(LabourerListingPage),
  ],
})
export class LabourerListingPageModule {}
