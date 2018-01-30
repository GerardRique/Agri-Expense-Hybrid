import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, AlertController } from 'ionic-angular';
import { EditCyclePage } from '../edit-cycle/edit-cycle';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { PopoverPage } from './PopoverPage';
import { NewCyclePage } from '../new-cycle/new-cycle';
import { CycleDataPage } from '../cycle-data/cycle-data';
import { App } from 'ionic-angular';
import { CycleManager } from '../../core/CycleManager';
import { NewHarvestPage } from '../new-harvest/new-harvest';
import { Content } from 'ionic-angular/components/content/content';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  cycleListing: Array<any>;

  newNav: any;

  displayNoCyclesMadeMessage: boolean;

  @ViewChild(Content) content: Content;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public popoverCtrl: PopoverController, private app: App, private cycleManager: CycleManager) {
    this.displayNoCyclesMadeMessage = false;
    this.newNav = this.app.getRootNav();
  }

  //The ionViewWillEnter will run when the page is fully entered and is now the active page. The event will fire whether it was the first load or a cached page. 
  ionViewDidEnter(){


    this.cycleManager.getAll().then((list) => {
      this.cycleListing = list;
      console.log("Successfully retrieved " + this.cycleListing.length + " cycles");
      if(this.cycleListing.length === 0){
        this.displayNoCyclesMadeMessage = true;
      }
      else this.displayNoCyclesMadeMessage = false;
    })
  }

  ionViewWillEnter(){
    this.content.resize();
    console.log('Will enter page')
  }

  ionViewCanEnter(){
    console.log('Entered page');
  }

  public editCycle(cycle): void{
    this.navCtrl.push(EditCyclePage, cycle);
  }

  public newCycle(): void{
    this.newNav.push(NewCyclePage);
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
        'title': 'Close',
        'iosIcon': 'md-close',
        'mdIcon': 'md-close'
      },
      {
        'title': 'Harvest',
        'iosIcons': 'md-basket',
        'mdIcon': 'md-basket'
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
      console.log(data);
    })
  }

  public goToNewHarvestPage(cycle: Object){
    let data = {
      'cycleData': cycle
    };
    this.navCtrl.push(NewHarvestPage, data);
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
