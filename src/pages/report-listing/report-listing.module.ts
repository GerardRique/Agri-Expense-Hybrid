import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportListingPage } from './report-listing';

@NgModule({
  declarations: [
    ReportListingPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportListingPage),
  ],
})
export class ReportListingPageModule {}
