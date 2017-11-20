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

  materialList = ['Chemical', 'Fertilizer', 'Planting Material', 'Soil Amendment', 'Other'];
  chemicals = Array<Object>();
  fertilizers = Array<Object>();
  plantingMaterials = Array<Object>();
  soilAmendments = Array<Object>();

  chemicalUnitsList = Array<string>();
  fertilizerUnitsList = Array<string>();
  plantingMaterialUnitsList = Array<string>();
  soilAmendmentUnitsList = Array<string>();



  materialListTemplate: ListTemplate;
  materialTypeTemplate: ListTemplate;
  materialUnitsTemplate: ListTemplate;
  submitTemplate: Template;

  private newPurchase: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private purchaseHandler: PurchaseHandler, private plantMaterialManager: PlantMaterialManager, private chemicalManager: ChemicalsManager, private fertilizerManager: FertilizerManager, private soilAmendmentsManager: SoilAmendmentsManager) {

    plantMaterialManager.getAll().then((data) => {
      this.plantingMaterials = data.slice();
    })

    chemicalManager.getAll().then((data) => {
      this.chemicals = data.slice();
    });
    this.fertilizerManager.getAll().then((data) => {
      this.fertilizers = data.slice();
    });
    this.soilAmendmentsManager.getAll().then((data) => {
      this.soilAmendments = data.slice();
    })

    this.plantMaterialManager.getUnitsList().then((data) => {
      this.plantingMaterialUnitsList = data.slice();
    });

    this.chemicalManager.getUnitsList().then((data) => {
      this.chemicalUnitsList = data.slice();
    });

    this.fertilizerManager.getUnitsList().then((data) => {
      this.fertilizerUnitsList = data.slice();
    });

    this.soilAmendmentsManager.getUnitsList().then((data) => {
      this.soilAmendmentUnitsList = data.slice();
    })

    this.materialListTemplate = new ListTemplate('Material List', 'selectMaterialTypeTemplate');
    this.materialListTemplate.activate();//We activate this template because this will be the first displayed when the page loads.
    this.materialListTemplate.setList(this.materialList);

    this.materialTypeTemplate = new ListTemplate('Select Type of material to be purchased', 'selectMaterialTypeTemplate');

    this.materialUnitsTemplate = new ListTemplate('Material Units', 'selectMaterialUnitsTemplate');

    this.submitTemplate = new Template('Enter quantity of product', '#selectQuantityTemplate');

    this.newPurchase = this.formBuilder.group({
      material: ['', Validators.required],
      type: ['', Validators.required],
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
    if(material.localeCompare('Chemical') === 0){
      this.materialTypeTemplate.setList(this.chemicals);
      this.materialUnitsTemplate.setList(this.chemicalUnitsList);
      console.log(material);
    }
    else if(material.localeCompare('Fertilizer') === 0){
      this.materialTypeTemplate.setList(this.fertilizers);
      this.materialUnitsTemplate.setList(this.fertilizerUnitsList);
    }
    else if(material.localeCompare('Planting Material') === 0){
      this.materialTypeTemplate.setList(this.plantingMaterials);
      this.materialUnitsTemplate.setList(this.plantingMaterialUnitsList);
    }
    else if(material.localeCompare('Soil Amendment') === 0){
      this.materialTypeTemplate.setList(this.soilAmendments);
      this.materialUnitsTemplate.setList(this.soilAmendmentUnitsList);
    }
  }

  goToSelectMaterialUnits(materialType){
    console.log(materialType);
    this.materialTypeTemplate.deactivate();
    this.materialUnitsTemplate.activate();
    this.newPurchase.controls['type'].setValue(materialType);
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
