import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPurchasePage } from './select-purchase';

@NgModule({
  declarations: [
    SelectPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPurchasePage),
  ],
})
export class SelectPurchasePageModule {}
