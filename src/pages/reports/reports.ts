import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportCreator } from '../../core/ReportCreator';
import { LabourManager } from '../../core/LabourManager';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportCreator: ReportCreator, public labourManager: LabourManager) {
    this.reportCreator.createReport(this.labourManager)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

}
