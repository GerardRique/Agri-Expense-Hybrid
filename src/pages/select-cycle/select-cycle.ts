import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewTaskPage } from '../../pages/new-task/new-task';
import { CycleManager } from '../../core/CyclesModule/CycleManager';
import { CycleOrderPage } from '../../core/UIComponents/CycleOrderPage';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';

/**
 * Generated class for the SelectCyclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-cycle',
  templateUrl: 'select-cycle.html',
})
export class SelectCyclePage {

  cycleListing: Array<Object>;
  selectedCyclesMap: Map<string, Object>
  showContinueButton: boolean;
  labourerId: string;
  displayEmptyListMessage: boolean;
  order: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cycleManager: CycleManager, public popoverCtrl: PopoverController) {
    this.cycleListing = new Array<Object>();
    this.displayEmptyListMessage = true;
    this.cycleManager.getAll().then((list) => {
      //this.cycleListing = list;
      //Traverse through the list of cycles retrieved from the cycle manager. If the cycle is active, it will be displayed in the cycle listing.
      for(let cycle of list){
        if(cycle['active'] === true){
          this.cycleListing.push(cycle);
          this.displayEmptyListMessage = false
        }
      }
    })

    this.selectedCyclesMap = new Map<string, Object>();
    this.labourerId = this.navParams.get('id');
    console.log(this.cycleListing.length);
  }

  ionViewDidLoad() {
    this.order = 'date';
    console.log('ionViewDidLoad SelectCyclePage');
  }

  addCycle(index: number, cycleId: string): void{
    if(this.selectedCyclesMap.has(cycleId)){
      this.selectedCyclesMap.delete(cycleId);
    }
    else {
      this.selectedCyclesMap.set(cycleId, this.cycleListing[index]);
    }

    if(this.selectedCyclesMap.size > 0){
      this.showContinueButton = true;
    } else this.showContinueButton = false;

  }

  goToNewTaskDataPage(){

    let cycleIds = Array.from(this.selectedCyclesMap.keys());
    let data = {
      'labourerId': this.labourerId,
      'cycles': JSON.stringify(cycleIds)
    };

    console.log(data);

    this.navCtrl.push(NewTaskPage, data);
  }

  public presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CycleOrderPage,{param1: this.order});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((data) => {
      if(data === null)
        return;
      if(data.localeCompare('date') === 0){
        this.order = data;
        this.dateSort();
      }
      else if(data.localeCompare('alphabetical') === 0){
        this.order = data;
        this.alphaSort();
      }
    })

  }

  public dateSort(){
    this.cycleListing.sort(function(a: Object,b: Object){
      return Date.parse(b['datePlanted']).valueOf() - Date.parse(a['datePlanted']).valueOf();
    });
  }

  public alphaSort(){
    this.cycleListing.sort(function(a: Object,b: Object){
      if(a['name'] < b['name']) return -1;
      if(a['name'] > b['name']) return 1;
      return 0;
    });
  }

}
