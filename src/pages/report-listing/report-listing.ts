import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController, AlertController } from 'ionic-angular';
import { ReportCreator } from '../../core/ReportCreator';
import { File, FileSaver, Entry } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { PopoverPage } from '../../core/UIComponents/PopoverPage';
import { ReportsPage } from '../reports/reports';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportCreator: ReportCreator, private file: File, private toastCtrl: ToastController, public popOverCtrl: PopoverController, public alertCtrl: AlertController) {
    this.displayMessage = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportListingPage');
  }

  ionViewDidEnter(){
    let dataString = this.navParams.get('tableData');

    this.updateFileList();

    if(dataString != null){
      this.dataList = JSON.parse(dataString);
      //Create an excel spreadsheet with the data supplied;
      this.reportCreator.createExcelSpreadSheet(this.dataList).then((result) => {
        console.log('File successfully created');
        this.updateFileList();
      }).catch((error) => {
        console.log(JSON.stringify(error));
      });
    }
  }

  public updateFileList(){
    //After the report creator creates the report, a list of all reports in the application folder is retrived from device storage.
    this.file.listDir(this.file.externalRootDirectory, 'NewAgriExpense').then((entries) => {
      //The list of reports will be displayed to the user.
      this.fileList = entries;
    }).catch((error) => {
      console.log('Error retrieving files');
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
        toast.setMessage('Share');
        toast.present();
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
    this.reportCreator.openReport(fileEntry);
  }

  public deleteFile(fileEntry: Entry, index: number){
    let toast = this.toastCtrl.create({
      message: '',
      duration: 5000,
      position: 'middle'
    });
    //console.log('Deleting File: ' + fileEntry.name + ' from path: ' + fileEntry.fullPath);
    this.reportCreator.deleteReport(fileEntry.fullPath, fileEntry.name).then((result) => {
      
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
        toast.setMessage('Error deleting file myError: ' + JSON.stringify(error));
        toast.present();
    });
  }

  goToNewReportPage(){
    console.log('Navigating to new reports page');
    this.navCtrl.push(ReportsPage);
  }
}
