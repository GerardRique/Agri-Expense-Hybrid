import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sale } from '../../core/Sale';
import { SaleManager } from '../../core/SaleManager';
import { HarvestManager } from '../../core/HarvestManager';

/**
 * Generated class for the NewSalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-sale',
  templateUrl: 'new-sale.html',
})
export class NewSalePage {

  selectedHarvest: Object;
  quantityOfUnitsSold: number;
  costPerUnitSold: number;
  totalMadeFromSale: number;
  displayConfirmButton: boolean;
  displayInsufficientHarvestMessage: boolean;
  dateSold: string;
  unitsSoldBy: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public saleManager: SaleManager, public harvestManager: HarvestManager) {
    this.selectedHarvest = this.navParams.get('harvestData');
    console.log(this.selectedHarvest);

    this.unitsSoldBy = this.selectedHarvest['unitsHarvested'];

    this.dateSold = new Date().toISOString();

    this.quantityOfUnitsSold = 0;

    this.costPerUnitSold = 0.0;

    this.totalMadeFromSale = 0.0;

    this.displayConfirmButton = false;

    this.displayInsufficientHarvestMessage = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewSalePage');
  }

  ionViewDidEnter(){
    
  }

  updateTotalMadeFromSale(){
    this.totalMadeFromSale = this.quantityOfUnitsSold * this.costPerUnitSold;
  }

  updateNumberOfUnitsSold(){

    let quantityRemaining = parseInt(this.selectedHarvest['quantityRemaining']);
    this.updateTotalMadeFromSale();

    if(this.quantityOfUnitsSold > 0){
      if(this.quantityOfUnitsSold > quantityRemaining){
        this.displayInsufficientHarvestMessage = true;
        this.displayConfirmButton = false;
      }
      else {
        this.displayConfirmButton = true;
        this.displayInsufficientHarvestMessage = false;
      }
    }
    else {
      this.displayConfirmButton = false;
    }

  }

  submitNewSale(){
    let mySale = new Sale(this.selectedHarvest['crop'], this.selectedHarvest['cropId'], this.selectedHarvest['id'], this.selectedHarvest['cycleId'], this.unitsSoldBy, this.quantityOfUnitsSold, this.costPerUnitSold, this.dateSold);
    let selectedHarvestId = this.selectedHarvest['id'];
    console.log(mySale);
    this.saleManager.add(mySale).then((result) => {
      if(result == true){
        console.log('Successfully saved sale: ' + mySale.getId());

        //Update quantity remaining for harvest
        this.selectedHarvest['quantityRemaining'] = this.selectedHarvest['quantityRemaining'] - this.quantityOfUnitsSold;
        this.harvestManager.edit(selectedHarvestId, this.selectedHarvest).then((result) => {
          if(result === true){
            console.log('Harvest quantity remaining successfully updated');
          }
          else {
            console.log('Error editing harvest quantity remaining');
          }
        }).catch((error) => {
          console.log('Error editing harvest quantity remaining');
        })
      }
      else {
        console.log('Error saving sale');
      }
    }).catch((error) => {
      console.log('Error saving sale: ' + JSON.stringify(error));
    });
    console.log(mySale);
  }

}
