import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PurchaseManager } from '../../core/PurchaseManager';
import { MaterialManager } from '../../core/MaterialManager';
import { UseMaterialPage } from '../use-material/use-material';

/**
 * Generated class for the SelectPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-purchase',
  templateUrl: 'select-purchase.html',
})
export class SelectPurchasePage {

  materialId: string;
  cycleId: string;
  avaialblePurchaseListing: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public purchaseManager: PurchaseManager, public materialManager: MaterialManager){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPurchasePage');
  }

  ionViewDidEnter(){

    this.materialId = this.navParams.get('materialId');
    this.cycleId = this.navParams.get('cycleId');
    console.log('Material ID: ' + this.materialId);
    console.log('Cycle ID: ' + this.cycleId);

    this.purchaseManager.getOfMaterialType(this.materialId).then((list) => {
      this.avaialblePurchaseListing = list;
      this.getData().then(() => {
      });
    })
  }

  getData(): Promise<void>{
    let promises = [];
    for(let purchase of this.avaialblePurchaseListing){
      promises.push(this.purchaseManager.get(purchase['typeId']).then((type) => {
        purchase['typeName'] = type['name'];
      }));
    }

    return Promise.all(promises).then(() => {
      console.log('Successfully retrieved ' + this.avaialblePurchaseListing.length + ' purchases');
      console.log(this.avaialblePurchaseListing);
    });
  }

  goToUseMaterialPage(purchaseId: string){
    console.log('Purchase Id: ' + purchaseId);
    let data = {
      'purchaseId': purchaseId,
      'cycleId': this.cycleId
    }
    this.navCtrl.push(UseMaterialPage, data);
  }

}
