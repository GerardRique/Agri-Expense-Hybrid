import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataManagerFactory } from '../../core/DataManagerFactory';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.editedPurchase = this.formBuilder.group({
      id: [this.navParams.get('id'), Validators.required],
      material: [this.navParams.get('material'), Validators.required],
      typeName: [this.navParams.get('typeName'), Validators.required],
      typeID: [this.navParams.get('typeID'), Validators.required],
      units: [this.navParams.get('units'), Validators.required],
      quantity: [this.navParams.get('quantity'), Validators.required],
      cost: [this.navParams.get('cost'), Validators.required],
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPurchasePage');
    console.log(this.navParams.data);
  }

}
