import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ReportCreator } from '../../core/ReportCreator';
import { File, FileSaver, Entry } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

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

  reportList: Array<string>;

  fileList: Array<Entry>;

  displayMessage: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportCreator: ReportCreator, private file: File, private toastCtrl: ToastController) {
    this.displayMessage = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportListingPage');
  }

  ionViewDidEnter(){
    let dataString = this.navParams.get('tableData');

    this.dataList = JSON.parse(dataString);
    console.log(this.dataList);

    this.reportCreator.createExcelSpreadSheet(this.dataList);

    this.file.listDir(this.file.externalRootDirectory, 'NewAgriExpense').then((entries) => {
      this.fileList = entries;
    })

    
  }

  getReports(){

    let toast = this.toastCtrl.create({
      message: '',
      duration: 5000,
      position: 'top'
    });

    this.file.listDir(this.file.externalRootDirectory, 'NewAgriExpense').then((entries) => {
      
      // let message = 'Number of files ' + entries.length;
      // toast.setMessage(message);
      // toast.present();

      this.fileList = entries;
    })
  }

}
