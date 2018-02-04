import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HarvestListingPage } from '../harvest-listing/harvest-listing';
import { App } from 'ionic-angular';
import { SaleManager } from '../../core/SaleManager';

/**
 * Generated class for the SaleListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-listing',
  templateUrl: 'sale-listing.html',
})
export class SaleListingPage {

  rootNav: any;

  saleListing: Array<Object>;

  displayEmptyListMessage: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private saleManager: SaleManager) {

    this.rootNav = this.app.getRootNav();

    this.displayEmptyListMessage = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleListingPage');
  }

  ionViewDidEnter(){
    this.saleManager.getAll().then((list) => {
      this.saleListing = list;
      if(this.saleListing.length === 0){
        this.displayEmptyListMessage = true;
      }else{
        this.displayEmptyListMessage = false;
      }
      console.log("Successfully retrieved " + this.saleListing.length + " sales");
    })
  }

  goToHarvestListingPage(){
    this.rootNav.push(HarvestListingPage);
  }

}
