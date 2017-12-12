import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPurchasePage } from './edit-purchase';

@NgModule({
  declarations: [
    EditPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(EditPurchasePage),
  ],
})
export class EditPurchasePageModule {}
