import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskListingPage } from '../task-listing/task-listing';
import { LabourerListingPage } from '../labourer-listing/labourer-listing';
import { MaterialManager } from '../../core/MaterialManager';
import { SelectPurchasePage } from '../select-purchase/select-purchase';

/**
 * Generated class for the CycleDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cycle-data',
  templateUrl: 'cycle-data.html',
})
export class CycleDataPage {

  totalAmountSpentMessage: string;
  totalAmountSpent: number

  cycleId: string;

  materialList: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public materialManager: MaterialManager) {

    if('cycleId' in this.navParams.data){
        this.cycleId = this.navParams.get('cycleId');
        console.log('Cycle ID: ' + this.cycleId);
    }

    else throw new Error('Data must contain attribute cycleId');

    this.totalAmountSpent = 0.0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CycleDataPage');
  }

  ionViewDidEnter(){
    this.materialManager.getAll().then((materialList) => {
      console.log('Successfully retrieved ' + materialList.length + ' materials');
      this.materialList = materialList;
    })
  }

  goToTaskListingPage(){
    let data = {
      'cycleId': this.cycleId
    };

    this.navCtrl.push(TaskListingPage, data);
  }

  goToLabourListingPage(){
    this.navCtrl.push(LabourerListingPage);
  }

  goToSelectPurchasePage(materialId: string){
    let data = {
      'materialId': materialId,
      'cycleId': this.cycleId
    };
    this.navCtrl.push(SelectPurchasePage, data);
  }

}
