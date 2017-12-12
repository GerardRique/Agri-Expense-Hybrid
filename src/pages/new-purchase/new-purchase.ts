import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListTemplate } from '../../core/ListTemplate';
import { Template } from '../../core/Template';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseHandler } from '../../core/PurchaseHandler';
import { PlantMaterialManager } from '../../core/PlantMaterialManager';
import { ChemicalsManager } from '../../core/ChemicalsManager';
import { FertilizerManager } from '../../core/FertilizerManager';
import { SoilAmendmentsManager } from '../../core/SoilAmendmentsManager';
import { DataManagerFactory } from '../../core/DataManagerFactory';
import { DataManager } from '../../core/DataManager';
import { MaterialManager } from '../../core/MaterialManager';
/**
 * Generated class for the NewPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-purchase',
  templateUrl: 'new-purchase.html',
})
export class NewPurchasePage {

  materialList = Array<Object>();
  
  materialListTemplate: ListTemplate;
  materialTypeTemplate: ListTemplate;
  materialUnitsTemplate: ListTemplate;
  submitTemplate: Template;

  private newPurchase: FormGroup;

  private dataManager: DataManager;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private purchaseHandler: PurchaseHandler, private dataManagerFactory: DataManagerFactory, private materialManager: MaterialManager) {

    materialManager.retrieveAll().then((list) => {
      this.materialList = list.slice();
      this.materialListTemplate.activate();//We activate this template because this will be the first displayed when the page loads.
      this.materialListTemplate.setList(this.materialList);
      console.log(this.materialList);
    })

    
    this.materialListTemplate = new ListTemplate('Material List', 'selectMaterialTypeTemplate');

    this.materialTypeTemplate = new ListTemplate('Select Type of material to be purchased', 'selectMaterialTypeTemplate');

    this.materialUnitsTemplate = new ListTemplate('Material Units', 'selectMaterialUnitsTemplate');

    this.submitTemplate = new Template('Enter quantity of product', '#selectQuantityTemplate');

    this.newPurchase = this.formBuilder.group({
      material: ['', Validators.required],
      typeName: ['', Validators.required],
      typeID: ['', Validators.required],
      units: ['', Validators.required],
      quantity: [0, Validators.required],
      cost: [0.0, Validators.required],
      datePurchased: [new Date().toISOString(), Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPurchasePage');
  }

  selectMaterial(material){
    console.log(material)
    this.materialListTemplate.deactivate();
    this.materialTypeTemplate.activate();
    this.newPurchase.controls['material'].setValue(material);
    this.dataManager = this.dataManagerFactory.getManager(material);
    this.dataManager.getAll().then((list) => {
      console.log(list);
      this.materialTypeTemplate.setList(list.slice());
    });
    this.dataManager.getUnitsList().then((units) => {
      this.materialUnitsTemplate.setList(units.slice());
    })
  }

  goToSelectMaterialUnits(materialType){
    console.log(materialType);
    this.materialTypeTemplate.deactivate();
    this.materialUnitsTemplate.activate();
    this.newPurchase.controls['typeName'].setValue(materialType.name);
    this.newPurchase.controls['typeID'].setValue(materialType.id);
  }

  goToSubmitTemplate(unit){
    this.materialUnitsTemplate.deactivate();
    this.newPurchase.controls['cost'].setValue
    this.submitTemplate.activate();
    this.newPurchase.controls['units'].setValue(unit);
  }

  savePurchase(){
    console.log(this.newPurchase.value);
    this.purchaseHandler.add(this.newPurchase.value).then((response) => {
      console.log(response);
    })
    this.navCtrl.pop();
  }

}
