import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { HarvestManager } from '../../core/HarvestManager';
import { NewSalePage } from '../new-sale/new-sale';
import { CycleManager } from '../../core/CyclesModule/CycleManager';
import { NewHarvestPage } from '../new-harvest/new-harvest';
import { HarvestOrderPage } from '../../core/UIComponents/HarvestOrderPage';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';

/**
 * Generated class for the HarvestListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


/**
 * The Harvest listing page takes in an optional Object parameter that has the following attributes:
 *    Param                   Type        Details
 *
 *    cycleId                 string      Specifies the cycle associates with the harvest displayed. Once this paramter is supplied, only harvests from the given cycle will be listed.
 *
 *    displayMakeSaleButton   boolean     If this paratemer is supplied as false, a make sale button will not be displayed for each harvest. The button will be displayed otherwise.
 *
 *
 */

@IonicPage()
@Component({
  selector: 'page-harvest-listing',
  templateUrl: 'harvest-listing.html',
})
export class HarvestListingPage {

  harvestListing: Array<Object>;

  order: string;

  private cycleId: string;

  private displayMakeSaleButton: boolean;

  private receivedCycleId: boolean;

  private readonly NO_CYCLE_INDICATOR: string = "cycle_not_supplied";

  displayNoHarvestMessage: boolean;

  @ViewChild (Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public harvestManager: HarvestManager, private cycleManager: CycleManager,public popoverCtrl: PopoverController){

    this.displayNoHarvestMessage = true;

    this.harvestListing = new Array<Object>();

    let bundle = this.navParams.get('options');

    if(bundle != null){
      console.log("Found Bundle");
      if('cycleId' in bundle){
        console.log("Found Cycle Id");
        this.receivedCycleId = true;
        this.cycleId = bundle.cycleId;
      }
      else{
        this.cycleId = this.NO_CYCLE_INDICATOR;
        this.receivedCycleId = false;
      }

      if('displayMakeSaleButton' in bundle){
        console.log("Found display make sale button paramter");
        if(typeof bundle.displayMakeSaleButton === "boolean"){
          this.displayMakeSaleButton = bundle.displayMakeSaleButton;
        }
        else throw new Error("Invalid type for display make sale button parameter");
      }
      else this.displayMakeSaleButton = true;
    }
    else {
      this.receivedCycleId = false;
      this.displayMakeSaleButton = true;
      this.cycleId = this.NO_CYCLE_INDICATOR;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HarvestListingPage');
  }

  ionViewDidEnter(){
    this.order = 'date';
    this.harvestManager.getAll().then((data) => {
      this.harvestListing = data;
      let filteredList = null;
      if(this.cycleId.localeCompare(this.NO_CYCLE_INDICATOR) === 0){
        this.harvestListing = data.sort((a: Object, b: Object) => {
          return Date.parse(b['dateHarvested']).valueOf() - Date.parse(a['dateHarvested']).valueOf();
        });
      }
      else {
        this.harvestListing = data.filter(harvest => this.cycleId.localeCompare(harvest['cycleId']) === 0);
      }

      if(this.harvestListing.length > 0)
        this.displayNoHarvestMessage = false;
      else this.displayNoHarvestMessage = true;
    })
  }


  goToNewSalePage(harvest: Object){
    let data = {
      'harvestData': harvest,
      callback: this.navParams.get('callback')
    };

    this.navCtrl.push(NewSalePage, data);
  }

  public loadPageData(){
    this.content.resize();
  }

  goToNewHarvestPage(){
    this.cycleManager.get(this.cycleId).then((cycle) => {
      console.log(cycle);
      let data = {
        'cycleData': cycle,
        callback: this.loadPageData.bind(this)
      };
      this.navCtrl.push(NewHarvestPage, data);
    })
  }

  public presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(HarvestOrderPage,{param1: this.order});
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
    this.harvestListing.sort(function(a: Object,b: Object){
      return Date.parse(b['dateHarvested']).valueOf() - Date.parse(a['dateHarvested']).valueOf();
    });
  }

  public alphaSort(){
    this.harvestListing.sort(function(a: Object,b: Object){
      if(a['crop'] < b['crop']) return -1;
      if(a['crop'] > b['crop']) return 1;
      return 0;
    });
  }

}
