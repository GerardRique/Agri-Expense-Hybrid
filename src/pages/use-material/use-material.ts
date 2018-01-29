import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseManager } from '../../core/PurchaseManager';
import { MaterialUse } from '../../core/MaterialUse';
import { MaterialUseManager } from '../../core/MaterialUseManager';
import { App } from 'ionic-angular';

/**
 * Generated class for the UseMaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-use-material',
  templateUrl: 'use-material.html',
})
export class UseMaterialPage {

  private purchaseId: string;
  private cycleId: string;
  private materialId: string;

  private newMaterialUse: FormGroup;

  private selectedPurchase: Object;

  private quantityUsed: number;
  private costOfUse: number;

  private displayConfirmButton: boolean;

  private displayInsufficientStockMessage: boolean;

  rootNav: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private purchaseManager: PurchaseManager, private materialUseManager: MaterialUseManager, private app: App) {

    this.displayConfirmButton = false;
    this.displayInsufficientStockMessage = false;

    this.rootNav = this.app.getRootNav();

    this.selectedPurchase = new Object;

    this.costOfUse = 0;
    this.quantityUsed = 0;
  }

  ionViewDidEnter(){
    this.cycleId = this.navParams.get('cycleId');
    console.log('Cycle Id: ' + this.cycleId);
    this.purchaseId = this.navParams.get('purchaseId');
    console.log('Purchase Id: ' + this.purchaseId);


    this.purchaseManager.get(this.purchaseId).then((purchase) => {
      this.selectedPurchase = purchase;
      console.log(this.selectedPurchase);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UseMaterialPage');
  }

  quantityChange(){

    let currentQuantityRemaining = parseInt(this.selectedPurchase['quantityRemaining']);
    this.costOfUse = this.quantityUsed * this.selectedPurchase['cost'];
    if(this.quantityUsed > 0){
      if(this.quantityUsed > currentQuantityRemaining){
        this.displayInsufficientStockMessage = true;
        this.displayConfirmButton = false;
      }else {
        this.displayConfirmButton = true;
        this.displayInsufficientStockMessage = false;
      }
    }
    else {
      this.displayConfirmButton = false;
    }
  }

  useMaterial(){
    this.materialId = this.selectedPurchase['materialId'];
    let myDate = new Date();
    let dateString = myDate.toISOString();
    let materialUse = new MaterialUse(this.cycleId, this.materialId, this.purchaseId, this.quantityUsed, this.selectedPurchase['cost'], this.selectedPurchase['units'], dateString);
    this.materialUseManager.add(materialUse).then((result) => {
      if(result === true){
        console.log('Use successfully saved');
        this.selectedPurchase['quantityRemaining'] = this.selectedPurchase['quantityRemaining'] - this.quantityUsed;
        this.purchaseManager.edit(this.purchaseId, this.selectedPurchase).then((editResult) => {
          if(editResult === true){
            console.log('Purchase Successfully updated');
            //this.navCtrl.popToRoot();
            this.rootNav.popToRoot();
          }
        })
      }
      else console.log('Error saving use');
    })
    console.log(materialUse);
  }

}
