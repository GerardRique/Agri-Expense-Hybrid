import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartUpScreenPage } from './start-up-screen';

@NgModule({
  declarations: [
    StartUpScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(StartUpScreenPage),
  ],
})
export class StartUpScreenPageModule {}
