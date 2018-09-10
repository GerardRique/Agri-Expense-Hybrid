import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Navbar, AlertController } from 'ionic-angular';
import { ListTemplate } from '../../core/ListTemplate';
import { Template } from '../../core/Template';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseHandler } from '../../core/PurchaseHandler';
import { DataManagerFactory } from '../../core/DataManagerFactory';
import { DataManager } from '../../core/DataManager';
import { MeasurableDataManager } from '../../core/MeasurableDataManager';
import { MeasurableDataManagerFactory } from '../../core/MeasurableDataManagerFactory';
import { MaterialManager } from '../../core/MaterialManager';
import { PurchaseManager } from '../../core/PurchaseManager';
import { Purchase } from '../../core/Purchase';
import { PlantingMaterial } from '../../core/Models/Plantingmaterial';
import { Firebase } from '@ionic-native/firebase';
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

  private unitsOfPurchase: string;

  private measurableDataManager: MeasurableDataManager;

  selectedMaterial: string;

  materialName: string;

  callback: any;

  @ViewChild(Navbar) navbar: Navbar;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private purchaseManager: PurchaseManager, private dataManagerFactory: DataManagerFactory, private materialManager: MaterialManager, private measurableDataManagerFactory: MeasurableDataManagerFactory, public toastCtrl: ToastController, public alertCtrl: AlertController, private firebase: Firebase) {

    materialManager.retrieveAll().then((list) => {
      this.materialList = list;
      this.materialListTemplate.activate();//We activate this template because this will be the first displayed when the page loads.
      this.materialListTemplate.setList(this.materialList);
    })

    this.selectedMaterial = "type of material";

    this.unitsOfPurchase = '';


    this.materialListTemplate = new ListTemplate('Material List', 'selectMaterialTypeTemplate');

    this.materialTypeTemplate = new ListTemplate('Select Type of material to be purchased', 'selectMaterialTypeTemplate');

    this.materialUnitsTemplate = new ListTemplate('Material Units', 'selectMaterialUnitsTemplate');

    this.submitTemplate = new Template('Enter quantity of product', '#selectQuantityTemplate');

    this.newPurchase = this.formBuilder.group({
      material: ['', Validators.required],
      materialImagePath: [''],
      materialId: [''],
      typeName: ['', Validators.required],
      typeID: ['', Validators.required],
      units: ['', Validators.required],
      quantity: ['', Validators.required],
      cost: ['', Validators.required],
      datePurchased: [new Date().toISOString(), Validators.required]
    });

  }

  ionViewWillEnter(){
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPurchasePage');

    this.navbar.backButtonClick = () => {
      if(this.submitTemplate.isActive() === true){
        this.submitTemplate.deactivate();
        this.materialUnitsTemplate.activate();
      }
      else if(this.materialUnitsTemplate.isActive() === true){
        this.materialUnitsTemplate.deactivate();
        this.materialTypeTemplate.activate();
      }
      else if(this.materialTypeTemplate.isActive() === true){
        this.materialTypeTemplate.deactivate();
        this.materialListTemplate.activate();
      }
      else if(this.materialListTemplate.isActive() === true){
        this.navCtrl.pop();
      }
    }
  }

  selectMaterial(material){
    this.materialListTemplate.deactivate();
    this.materialTypeTemplate.activate();
    this.newPurchase.controls['material'].setValue(material.name);
    this.selectedMaterial = material.name;
    this.newPurchase.controls['materialImagePath'].setValue(material.imagePath);
    this.newPurchase.controls['materialId'].setValue(material.id);


    this.measurableDataManager = this.materialManager.getManager(material.name);
    this.measurableDataManager.getAll().then((list) => {
      console.log('Successfully retrieved ' + list.length + ' materials');
      this.materialTypeTemplate.listData = list;
    });
    this.measurableDataManager.getUnitsList().then((units) => {
      this.materialUnitsTemplate.setList(units.slice());
    })
  }

  presentPromptForMaterialType(){
    let alert = this.alertCtrl.create({
      title: 'New ' + this.selectedMaterial,
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter new ' + this.selectedMaterial
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            if(data.name.localeCompare("") === 0){
              console.log("Invalid Name");
            }else {
              let path = "assets/img/open_box.png";
              let newMaterial = new PlantingMaterial(data.name, path);
              this.measurableDataManager.add(newMaterial);
              this.materialTypeTemplate.listData.push(newMaterial);
            }
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }

  goToSelectMaterialUnits(materialType){
    console.log(materialType);
    this.materialName = materialType.name;
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
    this.unitsOfPurchase = unit;
  }

  savePurchase(){

    let costPerUnit = this.newPurchase.get('cost').value / this.newPurchase.get('quantity').value;
    this.firebase.logEvent("create_purchase", {content_type: "function_call", item_id: "new_purchase"})
    let purchase = new Purchase(this.newPurchase.get('material').value,this.newPurchase.get('materialId').value, this.newPurchase.get('typeID').value, this.newPurchase.get('units').value, this.newPurchase.get('quantity').value, costPerUnit, this.newPurchase.get('datePurchased').value);

    let toast = this.toastCtrl.create({
      message: 'Purchase Successully saved',
      duration: 2000,
      position: 'middle'
    });

    this.purchaseManager.add(purchase).then((response) => {
      if(response === true){
        console.log('(TEST) Successfully served new purchase: ' + purchase.getId());
        this.callback();
        toast.present();
        this.navCtrl.popToRoot();
      } else{
        console.log('Error saving purchase');
      }
    }).catch((error) => {
      console.log('Error saving purchase: ' + JSON.stringify(error));
    });

  }

}
