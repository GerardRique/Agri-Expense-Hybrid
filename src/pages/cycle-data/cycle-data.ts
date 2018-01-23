import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskListingPage } from '../task-listing/task-listing';
import { LabourerListingPage } from '../labourer-listing/labourer-listing';
import { MaterialManager } from '../../core/MaterialManager';
import { SelectPurchasePage } from '../select-purchase/select-purchase';
import { MaterialUseManager } from '../../core/MaterialUseManager';

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

  materialUseList: Array<Object>;

  //The material use map represents a one that maps material id's to a list of corresponding material use objects that have the same material id.
  materialUseMap: Map<string, Array<Object>>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public materialManager: MaterialManager, public materialUseManager: MaterialUseManager) {

    this.totalAmountSpent = 0.0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CycleDataPage');
  }

  ionViewDidEnter(){
    this.materialManager.getAll().then((materialList) => {
      console.log('Successfully retrieved ' + materialList.length + ' materials');
      this.materialList = materialList;
      this.materialUseMap = new Map<string, Array<Object>>();
      this.initializeMaterialUseTotals();

      this.cycleId = this.navParams.get('cycleId');
      console.log('Cycle ID: ' + this.cycleId);

      this.materialUseManager.getByCycleId(this.cycleId).then((list) => {
        this.materialUseList = list;
        console.log(this.materialUseList);

        for(let material of this.materialList){
          let total = this.getMaterialTotal(material);
          this.totalAmountSpent = this.totalAmountSpent + total;
          console.log(material);
        }
      });


    });
  }

  private initializeMaterialUseTotals(){
    for(let material of this.materialList){
      material['total'] = 0.0;
    }
  }

  private getMaterialTotal(material: Object): number{
    let total = 0;
    let list = Array<Object>();
    let materialId = JSON.stringify(material['id'])
    for(let item of this.materialUseList){
      let id = JSON.stringify(item['materialId']);

      console.log(id + ' ' + material['id']);
      if(id.localeCompare(materialId) === 0){
        list.push(item);
        total = total + item['totalCost'];
        console.log(item['totalCost']);
      }
    }
    this.materialUseMap.set(materialId, list);
    material['total'] = total;
    return total;
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
