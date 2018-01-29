import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HarvestManager } from '../../core/HarvestManager';
import { NewSalePage } from '../new-sale/new-sale';

/**
 * Generated class for the HarvestListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-harvest-listing',
  templateUrl: 'harvest-listing.html',
})
export class HarvestListingPage {

  harvestListing: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public harvestManager: HarvestManager){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HarvestListingPage');
  }

  ionViewDidEnter(){
    this.harvestManager.getAll().then((data) => {
      this.harvestListing = data;
      console.log(this.harvestListing);
    })
  }


  goToNewSalePage(harvest: Object){
    let data = {
      'harvestData': harvest
    }

    this.navCtrl.push(NewSalePage, data);
  }

}
