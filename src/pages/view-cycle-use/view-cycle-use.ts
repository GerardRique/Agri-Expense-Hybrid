import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MaterialUseManager } from '../../core/MaterialUseManager';
import { Purchase } from '../../core/Purchase';

/**
 * Generated class for the ViewCycleUsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-cycle-use',
  templateUrl: 'view-cycle-use.html',
})
export class ViewCycleUsePage {

  materialUseList: Array<Object>;

  materialName: string;

  displayNoMaterialUseMessage: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public materialUseManager: MaterialUseManager) {

    this.displayNoMaterialUseMessage = false;

    this.materialName = "Materials";
  }

  ionViewDidEnter(){
    let materialUseListString = this.navParams.get('materialUseString');

    this.materialName = this.navParams.get('materialName');

    this.materialUseList = JSON.parse(materialUseListString);
    if(this.materialUseList.length === 0){
      this.displayNoMaterialUseMessage = true;
    }
    console.log(this.materialUseList);
    this.getMaterialNames();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCycleUsePage');
  }

  getMaterialNames(){
    for(let materialUse of this.materialUseList){
      let purchaseId = materialUse['purchaseId'];
      this.materialUseManager.get(purchaseId).then((purchase)=> {
        //let currentPurchase = Purchase.deserialize(purchase);
        let typeId = purchase['typeId'];
        this.materialUseManager.get(typeId).then((data) => {
          materialUse['typeName'] = data['name'];
        })
      })
    }
  }

}
