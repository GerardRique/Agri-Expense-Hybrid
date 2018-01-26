import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleListingPage } from './sale-listing';

@NgModule({
  declarations: [
    SaleListingPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleListingPage),
  ],
})
export class SaleListingPageModule {}
