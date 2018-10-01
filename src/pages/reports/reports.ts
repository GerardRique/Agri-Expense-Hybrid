import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ReportCreator } from '../../core/ReportCreator';
import { LabourManager } from '../../core/LabourManager';
import { CycleManager } from '../../core/CyclesModule/CycleManager';
import { ReportListingPage } from '../report-listing/report-listing';
import { ReportModalPage } from '../report-modal/report-modal';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public reportCreator: ReportCreator, public labourManager: LabourManager, public cycleManager: CycleManager) {

  }

  generateStandardReport(){
    this.reportCreator.getCycleSpreadsheetData(this.cycleManager).then((cycleData) => {
      let dataString = JSON.stringify(cycleData);
      this.reportCreator.createExcelSpreadSheet1(JSON.parse(dataString)).then((result) => {
        console.log('standard report');
        console.log('File successfully created');
      }).catch((error) => {
        console.log(JSON.stringify(error));
      });
      let data = { 'tableData': dataString };
      this.navCtrl.push(ReportListingPage, data);
    });

  }

  generateADBReport(){
    this.navCtrl.pop();
    let modal = this.modalCtrl.create(ReportModalPage);
    modal.onDidDismiss(data=> {
      if (data.check){
        this.reportCreator.generateADBOutflowReport(data.startDate,data.endDate).then((data1) => {
          // let dataString = JSON.stringify(data1[2][1]);
          // let dataList = JSON.parse(dataString);
          // console.log(data1[3]);
          this.reportCreator.createExcelSpreadSheet(data1[0],data1[1],data1[2],data1[3]).then((result) => {
            console.log('adb report');
            console.log('File successfully created');
          }).catch((error) => {
            console.log(JSON.stringify(error));
          });

          // let adbData = { 'tableData': dataString };
          this.navCtrl.pop();
          this.navCtrl.push(ReportListingPage);
        });
      }else{

      }
    });
    modal.present();
  }

}
