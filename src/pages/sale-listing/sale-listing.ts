import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private saleManager: SaleManager, private harvestManager: HarvestManager, private alertCtrl: AlertController, private firebase: Firebase) {

    this.rootNav = this.app.getRootNav();

    this.displayEmptyListMessage = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleListingPage');
  }

  ionViewDidEnter(){

    this.loadData();

    this.firebase.logEvent("sale_listing", {content_type: "page_view", item_id: "sale_listing_page"});
    
  }

  public loadData(){
    this.content.resize();

    this.saleManager.getAll().then((list) => {
      this.saleListing = list.sort((a: Object, b: Object) => {
        return Date.parse(b['dateSold']).valueOf() - Date.parse(a['dateSold']).valueOf();
      });
      if(this.saleListing.length === 0){
        this.displayEmptyListMessage = true;
      }else{
        this.displayEmptyListMessage = false;
      }
      console.log("Successfully retrieved " + this.saleListing.length + " sales");
      this.getCropImagePaths();
    });
  }

  public getCropImagePaths(): Promise<void>{
    let promises = [];
    for(let sale of this.saleListing){
      promises.push(this.saleManager.get(sale['cropId']).then((crop) => {
        sale['cropImagePath'] = crop['imagePath'];
      }));
    }

    return Promise.all(promises).then(() => {
      console.log('Retrieved Data');
    })
  }

  goToHarvestListingPage(){
    let noHarvestAlert = this.alertCtrl.create({
      title: 'No Harvests',
      subTitle: 'Make a harvest before you can make a sale.',
      buttons: ['Ok']
    });
    this.harvestManager.getAll().then((harvestList) => {
      if(harvestList.length === 0){
        console.log('No harvest made');
        noHarvestAlert.present();
      }
      else{
        this.rootNav.push(HarvestListingPage, {
          callback: this.loadData.bind(this)
        });
      }
    })
  }

}
