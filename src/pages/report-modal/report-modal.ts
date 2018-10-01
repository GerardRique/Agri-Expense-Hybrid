import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-report-modal',
  templateUrl: 'report-modal.html',
})
export class ReportModalPage {

  startDate: any;
  endDate: any;
  check: boolean;
  check2: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.check = false;
    this.check2 = false;
    console.log('ionViewDidLoad ReportModalPage');
  }

  dismiss() {
    let startDate1 = new Date(this.startDate);
    let endDate1 = new Date(this.endDate);
    if (this.endDate == null || this.startDate == null){
      this.check = true;
    }else if(endDate1 < startDate1 || startDate1.toDateString() === endDate1.toDateString()){
      this.check2 = true;
    }else {
      this.viewCtrl.dismiss({
        startDate: this.startDate,
        endDate: this.endDate,
        check: true
      });
    }
  }

  close(){
    this.viewCtrl.dismiss({
      check: false
    });
  }
}
