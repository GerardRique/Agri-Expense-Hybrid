import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLabourerPage } from './new-labourer';

@NgModule({
  declarations: [
    NewLabourerPage,
  ],
  imports: [
    IonicPageModule.forChild(NewLabourerPage),
  ],
})
export class NewLabourerPageModule {}
