import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, Content, AlertController, LoadingController} from 'ionic-angular';
import { HarvestListingPage } from '../harvest-listing/harvest-listing';
import { App } from 'ionic-angular';
import { SaleManager } from '../../core/SaleManager';
import { HarvestManager } from '../../core/HarvestManager';
import { Firebase } from '@ionic-native/firebase';

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

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private app: App,
              private saleManager: SaleManager,
              private harvestManager: HarvestManager,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private firebase: Firebase) {

    this.rootNav = this.app.getRootNav();

    this.displayEmptyListMessage = false;
  }

  ionViewDidEnter(){
    this.loadData();
    this.firebase.logEvent("sale_listing", {content_type: "page_view", item_id: "sale_listing_page"});
  }

  public loadData(){
    // Start the Spinner for loading content (will be dismissed when information returned successfully)
    const loadingSpinner = this.loadingCtrl.create({
      content: 'Loading Labourers',
      enableBackdropDismiss: false,
      showBackdrop: false
    });
    loadingSpinner.present();

    this.content.resize();
    this.saleManager.getAll().then((list) => {
      this.saleListing = list.sort((a: Object, b: Object) => {
        return Date.parse(b['dateSold']).valueOf() - Date.parse(a['dateSold']).valueOf();
      });
      this.displayEmptyListMessage = this.saleListing.length === 0;
      console.log("Successfully retrieved " + this.saleListing.length + " sales");
      this.getCropImagePaths().then(() => {
        loadingSpinner.dismiss();
      });
    });
  }

  public getCropImagePaths(): Promise<any>{
    let promises = [];
    for(let sale of this.saleListing){
      promises.push(this.saleManager.get(sale['cropId']).then((crop) => {
        sale['cropImagePath'] = crop['imagePath'];
      }));
    }
    return Promise.all(promises);
  }

  goToHarvestListingPage(){
    // Start the Spinner for loading content (will be dismissed when information returned successfully)
    const loadingSpinner = this.loadingCtrl.create({
      content: 'Loading Labourers',
      enableBackdropDismiss: false,
      showBackdrop: false
    });
    loadingSpinner.present();
    // Request harvests
    this.harvestManager.getAll().then((harvestList) => {
      loadingSpinner.dismiss();
      if(harvestList.length === 0){
        console.log('No harvest made');
        this.alertCtrl.create({
          title: 'No Harvests',
          subTitle: 'Make a harvest before you can make a sale.',
          buttons: ['Ok']
        }).present();
      } else{
        this.rootNav.push(HarvestListingPage, {
          callback: this.loadData.bind(this)
        });
      }
    })
  }

}
