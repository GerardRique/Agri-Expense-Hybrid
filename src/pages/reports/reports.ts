import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportCreator } from '../../core/ReportCreator';
import { LabourManager } from '../../core/LabourManager';
import { CycleManager } from '../../core/CyclesModule/CycleManager';
import { ReportListingPage } from '../report-listing/report-listing';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportCreator: ReportCreator, public labourManager: LabourManager, public cycleManager: CycleManager) {
    
  }

  generateStandardReport(){
    this.reportCreator.getCycleSpreadsheetData(this.cycleManager).then((cycleData) => {
      let dataString = JSON.stringify(cycleData);
      let data = { 'tableData': dataString };
      this.navCtrl.push(ReportListingPage, data);
    });

  }

  generateADBReport(){
    this.reportCreator.generateADBOutflowReport(this.cycleManager).then((data) => {
      let dataString = JSON.stringify(data);
      let adbData = { 'tableData': dataString };
      this.navCtrl.push(ReportListingPage, adbData);
    });
  }

}
