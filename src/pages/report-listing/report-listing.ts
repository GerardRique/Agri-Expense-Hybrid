import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  PopoverController,
  AlertController,
  Platform,
  LoadingController
} from 'ionic-angular';
import { ReportCreator } from '../../core/ReportCreator';
import { File, FileSaver, Entry } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { PopoverPage } from '../../core/UIComponents/PopoverPage';
import { ReportsPage } from '../reports/reports';
import { ShareManager } from '../../core/ShareManager';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public reportCreator: ReportCreator,
              private file: File,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public popOverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public shareManager: ShareManager,
              private platform: Platform) {
    this.displayMessage = false;
  }

  ionViewDidEnter(){
    let dataString = this.navParams.get('tableData');

    this.updateFileList();

    if(dataString != null){
      this.dataList = JSON.parse(dataString);
      //Create an excel spreadsheet with the data supplied;
      this.reportCreator.createExcelSpreadSheet(this.dataList[0],this.dataList[1],this.dataList[2],this.dataList[3]).then((result) => {
        console.log('File successfully created');
        this.updateFileList();
      }).catch((error) => {
        console.log(JSON.stringify(error));
      });
    }
  }

  public updateFileList(){

    const loadingSpinner = this.loadingCtrl.create({
      content: 'Loading Reports',
      enableBackdropDismiss: false,
      showBackdrop: false
    });
    loadingSpinner.present();
    // Retrieve Files for the report and dismiss if successful or notify in error occurs
    this.reportCreator.retrieveFiles('AgriExpense').then((entries) => {
      this.fileList = entries;
      if(this.platform.is('core') || this.platform.is('mobileweb')){
        this.fileList = [];
      }
      loadingSpinner.dismiss();
    }).catch((error) => {
      loadingSpinner.dismiss();
      this.toastCtrl.create({
        message: "Error retrieving files. ",
        duration: 5000,
        position: "bottom"
      }).present();
      console.error('Error retrieving files: ' + JSON.stringify(error));
    });
  }

  public openReportOptionsMenu(myEvent, entry: Entry, index: number){
    let optionList = [
      {
        'title': 'Delete',
        'iosIcon': 'ios-trash',
        'mdIcon': 'md-trash'
      },
      {
        'title': 'Share',
        'iosIcon': 'ios-paper-plane-outline',
        'mdIcon': 'md-paper-plane'
      }
    ];

    let data = {
      'menu': optionList
    };

    let popover = this.popOverCtrl.create(PopoverPage, data);

    popover.present({
      ev: myEvent
    });

    let toast = this.toastCtrl.create({
      message: '',
      duration: 5000,
      position: 'middle'
    });

    popover.onDidDismiss((data) => {
      if(data === null)
        return;
      if(data.options.localeCompare('Delete') === 0){
        this.displayDeleteConfirmation(entry, index);
      }
      else if(data.options.localeCompare('Share') === 0){
        // toast.setMessage('Share');
        // toast.present();
        this.shareManager.share("Agri Expense Report", "Share Test", entry.nativeURL, "");
      }
      else{
        return;
      }
    });

  }

  public displayDeleteConfirmation(fileEntry: Entry, index: number){
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this report',
      buttons: [
        {
          text: 'yes',
          handler: () => {
            this.deleteFile(fileEntry, index);
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Delete dialog closing...');
          }
        }
      ]
    });
    alert.present();
  }

  public openReport(fileEntry: Entry){
    this.shareManager.share("Agri Expense Report", "Share Test", fileEntry.nativeURL, "");
    // this.reportCreator.openReport(fileEntry);
  }

  public deleteFile(fileEntry: Entry, index: number){
    let toast = this.toastCtrl.create({
      message: '',
      duration: 5000,
      position: 'middle'
    });
    this.reportCreator.deleteFile(fileEntry).then((result) => {

      if(result === true){
        toast.setMessage('File successfully deleted');
        toast.present();
        this.fileList.splice(index, 1);
      }
      else {
        toast.setMessage('Error deleting this file');
        toast.present();
      }
    }).catch((error) => {
        toast.setMessage('Error deleting this file');
        toast.present();
    });
  }

  goToNewReportPage(){
    console.log('Navigating to new reports page');
    this.navCtrl.push(ReportsPage);
  }
}
