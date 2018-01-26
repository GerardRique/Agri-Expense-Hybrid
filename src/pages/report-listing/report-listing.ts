import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportCreator } from '../../core/ReportCreator';

/**
 * Generated class for the ReportListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-listing',
  templateUrl: 'report-listing.html',
})
export class ReportListingPage {

  dataList: Array<Array<any>>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportCreator: ReportCreator) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportListingPage');
  }

  ionViewDidEnter(){
    let dataString = this.navParams.get('tableData');

    this.dataList = JSON.parse(dataString);
    console.log(this.dataList);

    this.reportCreator.createExcelSpreadSheet(this.dataList);

    
  }

}
