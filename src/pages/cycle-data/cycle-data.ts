import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskListingPage } from '../task-listing/task-listing';
import { LabourerListingPage } from '../labourer-listing/labourer-listing';

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

  fertilizer: string;
  chemical: string;
  plantMaterial: string;
  soilAmmendment: string;
  labour: string;
  other: string;

  cycleId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if('cycleId' in this.navParams.data){
        this.cycleId = this.navParams.get('cycleId');
        console.log(this.cycleId);
    }

    else throw new Error('Data must contain attribute cycleId');

    this.totalAmountSpent = 0.0;

    this.totalAmountSpentMessage = "has been spent on";
    this.fertilizer = "fertilizers";
    this.chemical = "chemicals";
    this.plantMaterial = "planting materials";
    this.soilAmmendment = "soil ammendments";
    this.labour = "labour"
    this.other = "other materials";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CycleDataPage');
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

}
