import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
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

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private saleManager: SaleManager) {

    this.rootNav = this.app.getRootNav();

    this.displayEmptyListMessage = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleListingPage');
  }

  ionViewDidEnter(){

    this.loadData();
    
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
      console.log(this.saleListing);
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
    this.rootNav.push(HarvestListingPage, {
      callback: this.loadData.bind(this)
    });
  }

}
