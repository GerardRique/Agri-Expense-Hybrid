import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CycleHandler } from '../../core/CycleHandler';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PlantMaterialManager } from '../../core/PlantMaterialManager';
/**
 * Generated class for the NewCyclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-cycle',
  templateUrl: 'new-cycle.html',
})
export class NewCyclePage {
  
  seeds = Array<Object>();
  landTypes = ['Acre', 'Bed', 'Hectare'];
  selectSeedTemplate = true;
  selectLandTypeTemplatePage = false;
  selectLandQuantityTemplatePage = false;

  private newCycle: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cycleHandler: CycleHandler, private formBuilder: FormBuilder, private plantMaterialManager: PlantMaterialManager) {

    this.plantMaterialManager.getAll().then((data) => {
      console.log(data);
      this.seeds = data;
    })
    this.newCycle = this.formBuilder.group({
      name: ['', Validators.required],
      crop: ['', Validators.required],
      cropId: ['', Validators.required],
      cropImagePath: ['', Validators.required],
      landUnit: ['', Validators.required],
      landQuantity: ['', Validators.required],
      datePlanted: [new Date().toISOString(), Validators.required],
      harvested: [0.0, Validators.required],
      ongoing: [true, Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCyclePage');
  }

  goToSelectLandTypeTemplate(seed){
    this.newCycle.controls['crop'].setValue(seed.name);
    this.newCycle.controls['name'].setValue(seed.name);
    this.newCycle.controls['cropId'].setValue(seed.id);
    this.newCycle.controls['cropImagePath'].setValue(seed.imagePath);
    this.selectSeedTemplate = false;
    this.selectLandTypeTemplatePage= true;
  }

  goToSelectLandQuantityPage(landType){
    this.newCycle.controls['landUnit'].setValue(landType);
    this.selectLandTypeTemplatePage = false;
    this.selectLandQuantityTemplatePage = true;
  }

  submit(){
    console.log(this.newCycle.value);
    this.cycleHandler.add(this.newCycle.value).then((response) => {
      console.log(response);
      this.navCtrl.pop();
    })
  }

}
