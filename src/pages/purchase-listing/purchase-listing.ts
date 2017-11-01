import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PurchaseHandler } from '../../core/PurchaseHandler';

/**
 * Generated class for the PurchaseListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-listing',
  templateUrl: 'purchase-listing.html',
})
export class PurchaseListingPage {

  purchaseListing: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private purchaseHandler: PurchaseHandler) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseListingPage');
  }

  ionViewDidEnter(){
    this.purchaseHandler.getAll().then((list) => {
      this.purchaseListing = list;
    })
  }

  onHold(){
    console.log("Held");
  }

}
