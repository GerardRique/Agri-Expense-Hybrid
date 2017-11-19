import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListTemplate } from '../../core/ListTemplate';
import { Template } from '../../core/Template';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseHandler } from '../../core/PurchaseHandler';
import { PlantMaterialManager } from '../../core/PlantMaterialManager';
import { ChemicalsManager } from '../../core/ChemicalsManager';
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
  chemicals = Array<string>();
  fertilizers = ['UREA 46-0-0', 'Techni-Grow (7.12.27 + TE)', 'Plant Prod (7.12.27)', 'Magic Grow (7.12.40 + TE HYDROPHONIC)'];
  plantingMaterials = Array<string>();
  soilAmendments = ['Calphos', 'Chicken manure', 'Compost', 'Cow manure', 'Gypsum', 'Horse Manure', 'Limestone', 'Molasses', 'Sharp sand', 'Sulphur'];

  chemicalUnitsList = ['grams (g)', 'Kilograms (Kg)', 'Litres (L)', 'millilitres (ml)', 'ounces (oz)'];
  fertilizerUnitsList = ['Bags', 'grams (g)', 'Kilograms (Kg)', 'pounds (lb)'];
  plantingMaterialUnitsList = ['Heades', 'Seed', 'Seedling', 'Slips', 'Stick', 'Tubes'];
  soilAmendmentUnitsList = ['Bag', 'Truck'];



  materialListTemplate: ListTemplate;
  materialTypeTemplate: ListTemplate;
  materialUnitsTemplate: ListTemplate;
  submitTemplate: Template;

  private newPurchase: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private purchaseHandler: PurchaseHandler, private plantMaterialManager: PlantMaterialManager, private chemicalManager: ChemicalsManager) {

    plantMaterialManager.getNameList().then((nameList) => {
      this.plantingMaterials = nameList.slice();
      console.log(this.plantingMaterials);
    })

    chemicalManager.getNameList().then((nameList) => {
      this.chemicals = nameList.slice();
      console.log(this.chemicals);
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
    this.materialListTemplate.deactivate();
    this.materialTypeTemplate.activate();
    this.newPurchase.controls['material'].setValue(material);
    if(material.localeCompare('Chemical') == 0){
      this.materialTypeTemplate.setList(this.chemicals);
      this.materialUnitsTemplate.setList(this.chemicalUnitsList);
      console.log(material);
    }
    else if(material.localeCompare('Fertilizer') == 0){
      this.materialTypeTemplate.setList(this.fertilizers);
      this.materialUnitsTemplate.setList(this.fertilizerUnitsList);
    }
    else if(material.localeCompare('Planting Material') == 0){
      this.materialTypeTemplate.setList(this.plantingMaterials);
      this.materialUnitsTemplate.setList(this.plantingMaterialUnitsList);
    }
    else if(material.localeCompare('Soil Amendment') == 0){
      this.materialTypeTemplate.setList(this.soilAmendments);
      this.materialUnitsTemplate.setList(this.soilAmendmentUnitsList);
    }
  }

  goToSelectMaterialUnits(materialType){
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
