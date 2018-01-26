import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'
import { PurchaseListingPage } from '../purchase-listing/purchase-listing';
import { SaleListingPage } from '../sale-listing/sale-listing';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  cycleListingRoot = HomePage;
  purchaseListingRoot = PurchaseListingPage;
  saleListingRoot = SaleListingPage;
  myIndex: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
