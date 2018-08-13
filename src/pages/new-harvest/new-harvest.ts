import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Content } from 'ionic-angular';
import { HarvestManager } from '../../core/HarvestManager';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Harvest } from '../../core/Harvest';
import { Firebase } from '@ionic-native/firebase';

/**
 * Generated class for the NewHarvestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-harvest',
  templateUrl: 'new-harvest.html',
})
export class NewHarvestPage {

  selectedCycle: Object;

  private newHarvest: FormGroup;

  private selectedCycleId: string;

  private unitList: Array<string>;

  @ViewChild(Content) content: Content;

  callback: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public harvestManager: HarvestManager, public toastCtrl: ToastController, private firebase: Firebase) {

    this.harvestManager.getUnitsList().then((unitList) => {
      this.unitList =unitList;
      console.log(this.unitList);
    })

    this.selectedCycle = this.navParams.get('cycleData');
    this.callback = this.navParams.get('callback');
    console.log(this.selectedCycle);

    this.selectedCycleId = this.selectedCycle['id'];

    let selectedCropId: string;

    selectedCropId = this.selectedCycle['cropId'];

    let selectedCrop: string;
    selectedCrop = this.selectedCycle['crop'];

    this.newHarvest = this.formBuilder.group({
      cycleId: [this.selectedCycleId, Validators.required],
      cropId: [selectedCropId, Validators.required],
      crop: [selectedCrop, Validators.required],
      quantityHarvested: [0, Validators.required],
      unitsHarvested: ['', Validators.required],
      dateHarvested: [new Date().toISOString(), Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewHarvestPage');
  }

  submitNewHarvested(){

    this.firebase.logEvent("create_harvest", {content_type: "function_call", item_id: "new_harvest"});

    let toast = this.toastCtrl.create({
      message: 'Harvest successfully saved',
      duration: 2000,
      position: 'middle'
    })

    let myHarvest = new Harvest(this.newHarvest.get('cycleId').value, this.newHarvest.get('cropId').value, this.newHarvest.get('crop').value, this.newHarvest.get('quantityHarvested').value, this.newHarvest.get('unitsHarvested').value, this.newHarvest.get('dateHarvested').value);
    console.log(myHarvest);

    this.harvestManager.add(myHarvest).then((result) => {
      if(result === true){
        console.log('Successfully saved new harvest: ' + myHarvest.getId());
      }
      else console.log('Error saving harvest');

      toast.present();
      this.callback();
      this.navCtrl.pop();
    }).catch((error) => {
      console.log('Error saving harvest');
    });
  }

}
