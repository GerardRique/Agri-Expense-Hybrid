import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseListingPage } from './purchase-listing';

@NgModule({
  declarations: [
    PurchaseListingPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseListingPage),
  ],
})
export class PurchaseListingPageModule {}
