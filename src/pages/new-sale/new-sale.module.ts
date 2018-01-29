import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewSalePage } from './new-sale';

@NgModule({
  declarations: [
    NewSalePage,
  ],
  imports: [
    IonicPageModule.forChild(NewSalePage),
  ],
})
export class NewSalePageModule {}
