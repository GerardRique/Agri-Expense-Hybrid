import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataManagerFactory } from '../../core/DataManagerFactory';
import { MeasurableDataManager } from '../../core/MeasurableDataManager';
import { MaterialManager } from '../../core/MaterialManager';
import { PurchaseManager } from '../../core/PurchaseManager';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { RangeValidator } from  '../../validators/RangeValidator';

/**
 * Generated class for the EditPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-purchase',
  templateUrl: 'edit-purchase.html',
})
export class EditPurchasePage {

  materialList = ['Chemical', 'Fertilizer', 'Planting Material', 'Soil Amendment', 'Other'];

  private editedPurchase: FormGroup;

  measurableDataManager: MeasurableDataManager;

  materialListing: Array<Object>;

  selectedMaterial: string;

  materialTypeList: Array<Object>;

  materialUnitsList: Array<Object>;

  selectedMaterialType: string;

  selectedMaterialUnits: string;

  quantityPurchased: number;

  totalCostOfPurchase: number;

  selectedPurchase: Object;

  changedPurchase: boolean;

  valid: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private materialManager: MaterialManager, private purchaseManager: PurchaseManager, private toastCtrl: ToastController) {
    this.materialTypeList = new Array<Object>();

    this.materialListing = new Array<Object>();

    this.materialUnitsList = new Array<Object>();

    this.changedPurchase = false;

    this.editedPurchase = this.formBuilder.group({
      id: [this.navParams.get('id'), Validators.required],
      material: [this.navParams.get('material'), Validators.required],
      typeName: [this.navParams.get('typeName'), Validators.required],
      typeID: [this.navParams.get('typeID'), Validators.required],
      units: [this.navParams.get('units'), Validators.required],
      quantity: [this.navParams.get('quantity'), [Validators.required, RangeValidator]],
      cost: [this.navParams.get('cost'), [Validators.required, RangeValidator]],

    })

    this.materialManager.getAll().then((list) => {
      this.materialListing = list;
    })

    this.selectedPurchase = this.navParams.get('purchase');

    this.materialManager.get(this.selectedPurchase['materialId']).then((material) => {
      this.selectedMaterial = this.selectedPurchase['materialName'];
      this.initialize();

      this.quantityPurchased = this.selectedPurchase['quantityPurchased'];
      this.totalCostOfPurchase = this.selectedPurchase['cost'] * this.selectedPurchase['quantityPurchased'];

      this.selectedMaterialType = this.selectedPurchase['typeName'];
      console.log(this.selectedMaterialType);

      this.selectedMaterialUnits = this.selectedPurchase['units'];
    })
    // console.log(this.selectedPurchase);

    this.valid = true;
  }

  initialize(){
    this.selectedMaterialType = "";
    this.selectedMaterialUnits = "";
    console.log('User selected: ' + this.selectedMaterial);
    this.measurableDataManager = this.materialManager.getManager(this.selectedMaterial);
    this.measurableDataManager.getAll().then((list) => {
      this.materialTypeList = list;
    })

    this.measurableDataManager.getUnitsList().then((unitsList) => {
      this.materialUnitsList = unitsList;
      console.log(this.materialUnitsList);
    })
  }

  materialChange(){
    this.changedPurchase = true;
    this.selectedMaterialType = "";
    this.selectedMaterialUnits = "";
    console.log('User selected: ' + this.selectedMaterial);
    this.measurableDataManager = this.materialManager.getManager(this.selectedMaterial);
    this.measurableDataManager.getAll().then((list) => {
      this.materialTypeList = list;
    })

    this.measurableDataManager.getUnitsList().then((unitsList) => {
      this.materialUnitsList = unitsList;
      console.log(this.materialUnitsList);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPurchasePage');
  }

  findMaterial(materialName): Object{
    for(let material of this.materialListing){
      if(materialName.localeCompare(material['name']) === 0){
        return material;
      }
    }
    return null;
  }

  findMaterialType(typeName): Object{
    for(let type of this.materialTypeList){
      if(typeName.localeCompare(type['name']) === 0){
        return type;
      }
    }
    return null;
  }

  submit(){
    if(!this.changedPurchase){
      this.selectedPurchase['cost'] = this.totalCostOfPurchase / this.quantityPurchased;
      this.selectedPurchase['quantityPurchased'] = this.quantityPurchased;
      this.selectedPurchase['quantityRemaining'] = this.quantityPurchased;
      this.purchaseManager.edit(this.selectedPurchase['id'], this.selectedPurchase);
      this.navCtrl.pop();
    }
    else {

      let material = this.findMaterial(this.selectedMaterial);
      console.log(material);
      this.selectedPurchase['materialId'] = material['id'];
      this.selectedPurchase['materialImagePath'] = material['imagePath'];

      let materialType = this.findMaterialType(this.selectedMaterialType);
      this.selectedPurchase['typeName'] = materialType['name'];
      this.selectedPurchase['typeId'] = materialType['id'];
      this.selectedPurchase['units'] = this.selectedMaterialUnits;
      console.log(materialType);
      this.selectedPurchase['cost'] = this.totalCostOfPurchase / this.quantityPurchased;
      this.selectedPurchase['quantityPurchased'] = this.quantityPurchased;
      this.selectedPurchase['quantityRemaining'] = this.quantityPurchased;
      this.purchaseManager.edit(this.selectedPurchase['id'], this.selectedPurchase);
      this.navCtrl.pop();

    }

  }

  checkValidity(){
    if (this.quantityPurchased > 0 && this.totalCostOfPurchase > 0){
      this.valid = true;
    }else{
      this.valid = false;
    }
  }
}
