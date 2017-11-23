import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, AlertController } from 'ionic-angular';
import { CycleHandler } from '../../core/CycleHandler';
import { EditCyclePage } from '../edit-cycle/edit-cycle';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('myNav') nav: Nav;
  cycleListing: Array<any>;

  constructor(private navCtrl: NavController, private cycleHandler: CycleHandler, private alertCtrl: AlertController) {
    
  }

  //The ionViewWillEnter will run when the page is fully entered and is now the active page. The event will fire whether it was the first load or a cached page. 
  ionViewDidEnter(){
    this.cycleHandler.getAll().then((list) => {
      this.cycleListing = list;
    })
  }

  public editCycle(cycle, cycleID): void{
    console.log("Editing Cycle: " + cycleID);
    this.navCtrl.push(EditCyclePage, cycle);
  }

  public deleteCycle(cycleId, index): void{
    console.log("Deleting cycle: " + cycleId);
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this cycle?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.cycleHandler.remove(cycleId).then((response) => {
              if(response === true){
                console.log("Successfully Deleted Cycle: "+ cycleId + " index: " + index);
                this.cycleListing.splice(index, 1);
              }
            }).catch((error) => {
              console.log("Error removing cycle: " + error);
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Dialog will be closed');
          }
        }
      ]
    });
    alert.present();
  }

}
