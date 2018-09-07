import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TaskListingPage} from '../task-listing/task-listing';
import {LabourerListingPage} from '../labourer-listing/labourer-listing';
import {MaterialManager} from '../../core/MaterialManager';
import {SelectPurchasePage} from '../select-purchase/select-purchase';
import {MaterialUseManager} from '../../core/MaterialUseManager';
import {ViewCycleUsePage} from '../view-cycle-use/view-cycle-use';
import {TaskManager} from '../../core/TaskManager';
import {HarvestManager} from '../../core/HarvestManager';
import {HarvestListingPage} from '../harvest-listing/harvest-listing';
import {SaleManager} from '../../core/SaleManager';
import {NewHarvestPage} from '../new-harvest/new-harvest';
import { App } from 'ionic-angular';

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

  totalAmountSpent: number;

  cycleId: string;

  selectedCycle: Object;

  materialList: Array<Object>;

  materialUseList: Array<Object>;

  taskList: Array<Object>;

  numHarvests: number;

  totalMadeFromSales: number;

  newNav: any;

  //The material use map represents a one that maps material id's to a list of corresponding material use objects that have the same material id.
  materialUseMap: Map<string, Array<Object>>;

  totalSpentOnLabour: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public materialManager: MaterialManager, public materialUseManager: MaterialUseManager, public taskManager: TaskManager, private harvestManager: HarvestManager, private saleManager: SaleManager, private app: App) {
    this.selectedCycle = {};
  }

  ionViewDidEnter(){

    this.newNav = this.app.getRootNav();

    this.totalAmountSpent = 0.0;

    this.totalSpentOnLabour = 0.0;

    this.totalMadeFromSales = 0.0;

    //Retrieve the selected cycle's unique id provided by the previos page.
    this.cycleId = this.navParams.get('cycleId');
    console.log('Cycle ID: ' + this.cycleId);
    this.materialManager.get(this.cycleId).then((cycle) => {
      this.selectedCycle = cycle;
    });
    this.harvestManager.getByCycleId(this.cycleId).then((harvestList) => {
      this.numHarvests = harvestList.length;
      console.log("Successfully retrieved " + harvestList.length + " harvests.");
    });


    this.calculateTotalMadeFromSales();



    //Retrieve list of materials from ionic storage using the material manager.
    this.materialManager.getAll().then((materialList) => {
      console.log('Successfully retrieved ' + materialList.length + ' materials');
      this.materialList = materialList;
      this.materialUseMap = new Map<string, Array<Object>>();
      this.initializeMaterialUseTotals();

      //Retrieve all the materials used on the selected crop cycle by using the materialUseManager class.
      this.materialUseManager.getByCycleId(this.cycleId).then((list) => {
        this.materialUseList = list;

        //the following loop traverses through each material and gets the total amount of money spent for each material to be displayed to the user. Each total is also added to get the total amount spent on the crop cycle.
        for(let material of this.materialList){
          this.totalAmountSpent += this.getMaterialTotal(material);
        }
      });
    });

    //Retrieve all the tasks associated with the selected crop cycle.
    this.taskManager.getByCycleId(this.cycleId).then((myTaskList) => {
      this.taskList = myTaskList;

      console.log('Successfully retrieved ' + this.taskList.length + ' tasks');

      for(let task of this.taskList){
        this.totalSpentOnLabour += task['quantity'] * task['salary'];
      }

      this.totalAmountSpent += this.totalSpentOnLabour;
    })
  }

  //When the page loads, the total amount spent on each material for the selected crop cycle will be set to 0. The is achieved by adding another attribute to the materialList associative array.
  private initializeMaterialUseTotals(){
    for(let material of this.materialList){
      material['total'] = 0.0;
    }
  }

  private calculateTotalMadeFromSales(){
    this.totalMadeFromSales = 0.0;
    this.saleManager.getByCycleId(this.cycleId).then((saleListing) => {
      for(let sale of saleListing){
        this.totalMadeFromSales += sale['costPerunit'] * sale['quantityOfUnitsSold'];
      }
    })
  }

  //The function below accepts a material object and calculates the total spent on the given material for the selected crop cycle.
  private getMaterialTotal(material: Object): number{
    let total = 0;
    let list = Array<Object>();

    //Get the id of the given material.
    const materialId = JSON.stringify(material['id']);

    //For every item in the material use list, if the material used matches the given material id, the cost is added to the total cost used for the material on the selected cycle.
    for(let item of this.materialUseList){
      const id = JSON.stringify(item['materialId']);

      if(id.localeCompare(materialId) === 0){
        list.push(item);
        total += item['totalCost'];
      }
    }
    this.materialUseMap.set(material['id'], list);
    material['total'] = total;
    return total;
  }

  //The following function navigates the user to the task listing page when the user selects the option to view all labourers assigned to the selected crop cycle.
  goToTaskListingPage(){
    const data = {
      'cycleId': this.cycleId
    };
    this.navCtrl.push(TaskListingPage, data);
  }

  goToLabourListingPage(){
    this.navCtrl.push(LabourerListingPage);
  }

  goToSelectPurchasePage(materialId: string,materialName: string){
    const data = {
      'materialName': materialName,
      'materialId': materialId,
      'cycleId': this.cycleId
    };
    this.navCtrl.push(SelectPurchasePage, data);
  }

  goToViewCycleUsePage(materialId: string, materialName: string){
    console.log(materialName);
    const materialUseList = this.materialUseMap.get(materialId);
    const materialUseListString = JSON.stringify(materialUseList);
    const data = {
      'materialName': materialName,
      'materialUseString': materialUseListString
    };
    this.navCtrl.push(ViewCycleUsePage, data);
  }

  goToHarvestListingPage(){
    const bundle = {
      "options": {
        "cycleId": this.cycleId,
        "displayMakeSaleButton": false
      }
    };
    this.navCtrl.push(HarvestListingPage, bundle);
  }

  public goToNewHarvestPage(cycle: Object){
    let data = {
      'cycleData': cycle,
      // callback: this.loadPageData.bind(this)
    };
    this.newNav.push(NewHarvestPage, data);
  }

}
