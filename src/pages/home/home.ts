import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, AlertController, ToastController } from 'ionic-angular';
import { EditCyclePage } from '../edit-cycle/edit-cycle';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { PopoverPage } from './PopoverPage';
import { NewCyclePage } from '../new-cycle/new-cycle';
import { CycleDataPage } from '../cycle-data/cycle-data';
import { App } from 'ionic-angular';
import { CycleManager } from '../../core/CyclesModule/CycleManager';
import { NewHarvestPage } from '../new-harvest/new-harvest';
import { Content } from 'ionic-angular/components/content/content';
import { DateFilterPipe } from '../../pipes/date-filter/date-filter';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  cycleListing: Array<any>;

  newNav: any;

  displayNoCyclesMadeMessage: boolean;

  @ViewChild(Content) content: Content;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public popoverCtrl: PopoverController, private app: App, private cycleManager: CycleManager, private toastCtrl: ToastController) {
    this.displayNoCyclesMadeMessage = false;
    this.newNav = this.app.getRootNav();
  }

  //The ionViewWillEnter will run when the page is fully entered and is now the active page. The event will fire whether it was the first load or a cached page. 
  ionViewDidEnter(){

    console.log('IonViewDidEnter Home page');

    this.loadPageData();
  }

  public loadPageData(){
    this.content.resize();
    this.cycleManager.getAll().then((list) => {

      //Sort cycles by date as they are retrieved from storage. 
      this.cycleListing = list.sort((a: Object, b: Object) => {
        return Date.parse(b['datePlanted']).valueOf() - Date.parse(a['datePlanted']).valueOf()
      });

      console.log("Successfully retrieved " + this.cycleListing.length + " cycles");
      if(this.cycleListing.length === 0){
        this.displayNoCyclesMadeMessage = true;
      }
      else this.displayNoCyclesMadeMessage = false;
    })
  }

  ionViewWillEnter(){
    console.log('IonViewWillEnter Home page');
    
  }

  public editCycle(cycle): void{
    this.newNav.push(EditCyclePage, cycle);
  }

  public displayClosedCycleConfirmAlert(cycleId: string, index: number){

    //Check if the selected cycle is already closed.
    let status = this.cycleListing[index].active;
    if(status === false){
      //If the cycle is already closed, a message will be displayed indicating this and that the selected cycle cannot be closed.
      let toast = this.toastCtrl.create({
        message: 'This cycle is already closed',
        duration: 5000,
        position: 'middle'
      });
      //Display message.
      toast.present();
      return;
    }
    //If the selected cycle can be closed, an alert will be presented to the user asking them to confirm this operation.
    let alert = this.alertCtrl.create({
      title: 'Confirm Close Cycle',
      message: 'Are you sure you want to close this cycle?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            //If the user selects yes, the selected cycle will be set to closed. 
            this.closeCycle(cycleId, index);
          }
        },
        {
          //If the user selected no, the function will be ended. 
          text: 'No',
          handler: () => {
            console.log('Close cycle operation cancled by user...');
          }
        }
      ]
    });
    alert.present();
  }

  public closeCycle(cycleId: string, index: number){

    let toast = this.toastCtrl.create({
      message: 'Cycle Successfully Closed',
      duration: 5000,
      position: 'middle'
    });

    this.cycleManager.closeCycle(cycleId).then((result) => {
      if(result === true){
        this.cycleListing[index].active = false;
        toast.present();
      } else{
        toast.setMessage('Error closing Cycle');
        toast.present();
      }
    }).catch((error) => {
      toast.setMessage('Error closing Cycle');
      toast.present();
    });
  }

  public newCycle(): void{
    this.newNav.push(NewCyclePage, {
      callback: this.loadPageData.bind(this)
    });
  }

  public goToCycleDataPage(cycleId): void{
    let data = {
      'cycleId': cycleId
    };
    this.newNav.push(CycleDataPage, data);
  }

  public openCycleOptionsPopover(myEvent, cycle, index){
    let list = [
      {
        'title': 'Edit',
        'iosIcon': 'md-create',
        'mdIcon': 'md-create'
        
      },
      {
        'title': 'Delete',
        'iosIcon': 'ios-trash',
        'mdIcon': 'md-trash'
      },
      {
        'title': 'Harvest',
        'iosIcons': 'md-basket',
        'mdIcon': 'md-basket'
      },
      {
        'title': 'Close',
        'iosIcon': 'md-close',
        'mdIcon': 'md-close'
      }
    ];

    let data = {
      'menu': list
    };
    let popover = this.popoverCtrl.create(PopoverPage, data);

    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((data) => {
      if(data === null)
        return;
      if(data.options.localeCompare('Edit') === 0){
        this.editCycle(cycle);
      }
      else if(data.options.localeCompare('Delete') === 0){
        this.deleteCycle(cycle.id, index);
      }
      else if(data.options.localeCompare('Harvest') === 0){
        this.goToNewHarvestPage(cycle);   
      }
      else if(data.options.localeCompare('Close') === 0){
        console.log('Closing cycle: ' + cycle.name + ' ID: ' + cycle.id);
        this.displayClosedCycleConfirmAlert(cycle.id, index);
      }
    })
  }

  public goToNewHarvestPage(cycle: Object){
    let data = {
      'cycleData': cycle,
      callback: this.loadPageData.bind(this)
    };
    this.newNav.push(NewHarvestPage, data);
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
            this.cycleManager.remove(cycleId).then((response) => {
              if(response === true){
                console.log("Successfully Deleted Cycle: "+ cycleId);
                this.cycleListing.splice(index, 1);
                if(this.cycleListing.length === 0)
                  this.displayNoCyclesMadeMessage = true;
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
