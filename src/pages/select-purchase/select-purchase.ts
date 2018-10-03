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

  materialName: string;
  materialId: string;
  cycleId: string;
  avaialblePurchaseListing: Array<Object>;

  displayNoPurchaseMessage: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public purchaseManager: PurchaseManager, public materialManager: MaterialManager){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPurchasePage');
  }

  ionViewDidEnter(){

    this.materialName = this.navParams.get('materialName');
    this.materialId = this.navParams.get('materialId');
    this.cycleId = this.navParams.get('cycleId');
    console.log('Material ID: ' + this.materialId);
    console.log('Cycle ID: ' + this.cycleId);

    this.displayNoPurchaseMessage = false;

    this.purchaseManager.getOfMaterialType(this.materialId).then((list) => {
      this.purchaseManager.get(this.materialId).then((materialData) => {
        console.log(materialData);
        //Determine if plant material was selected. If so, the purchases should be filtered to only display purchases that contain planting materials of the selected crop.
        if(MaterialManager.PLANT_MATERIAL.localeCompare(materialData['name']) === 0){
          console.log('Displaying plant material purchases.');
          console.log('Filtering by the selected cycle.');
          this.filterPlantMaterial(list).then((filteredList) => {

            this.avaialblePurchaseListing = filteredList;
            if(this.avaialblePurchaseListing.length === 0){
              this.displayNoPurchaseMessage = true;
            }
            this.getData().then(() => {
            });
          });
        }
        else {
          console.log('Plant material not selected. No filtering of purchases required');
          this.avaialblePurchaseListing = list;
          if(this.avaialblePurchaseListing.length === 0){
            this.displayNoPurchaseMessage = true;
          }
          this.getData().then(() => {

          })
        }
      })

    })
  }

  private filterPlantMaterial(list): Promise<Array<Object>>{

    let newList = [];

    return this.materialManager.get(this.cycleId).then((cycle) => {
      let cropId = cycle['cropId'];

      for(let purchase of list){
        console.log('Comparing: ' + cropId + ' and ' + purchase['typeId']);
        if(cropId.localeCompare(purchase['typeId']) ===0 ){
          newList.push(purchase);
        }
      }
      console.log(newList);
      return newList;
    })

  }

  getData(): Promise<void>{
    let promises = [];
    // for(let purchase of this.avaialblePurchaseListing){
    //   promises.push(this.purchaseManager.get(purchase['typeId']).then((type) => {
    //     purchase['typeName'] = type['name'];
    //   }));
    // }

    return Promise.all(promises).then(() => {
      console.log('Successfully retrieved ' + this.avaialblePurchaseListing.length + ' purchases');
    });
  }

  goToUseMaterialPage(purchaseId: string,purchaseName: string){
    console.log('Purchase Id: ' + purchaseId);
    let data = {
      'purchaseName': purchaseName,
      'purchaseId': purchaseId,
      'cycleId': this.cycleId
    }
    this.navCtrl.push(UseMaterialPage, data);
  }

}
